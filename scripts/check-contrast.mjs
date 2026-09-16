// Minimum-brightness check for the dark UI.
//
// The app is read at night on a phone, and grey-on-near-black is the first thing
// that goes illegible. This enforces a floor rather than relying on taste: every
// text colour used in `src/` must clear WCAG AA (4.5:1) against the lightest
// surface in the dark chrome, and we aim for AAA (7:1) on body text.
//
// The floor is the rule; the light-mode toggle is not a substitute for it.
//
// Run: npm run contrast  (also runs as part of npm run build)

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'
import colors from 'tailwindcss/colors.js'
import config from '../tailwind.config.js'

// Lightest surface the dark chrome ever paints: bg-white/5 over #0b0b1a.
// Anything legible on this is legible on the page background too.
const SURFACE = '#161629'
const AA = 4.5
const AAA = 7

const srgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
const lum = h => {
  const c = srgb(h).map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (['.jsx', '.js'].includes(extname(p))) out.push(p)
  }
  return out
}

// Flat custom tokens from tailwind.config.js (e.g. `dim`) plus the palette scales.
const custom = Object.fromEntries(
  Object.entries(config.theme?.extend?.colors ?? {}).filter(([, v]) => typeof v === 'string')
)
const PALETTE = 'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose'
const CLASS = new RegExp(
  `\\btext-(?:(${PALETTE})-(\\d{2,3})|(${Object.keys(custom).join('|') || '\\0'}))\\b`, 'g')

const seen = new Map()
for (const file of walk(new URL('../src', import.meta.url).pathname)) {
  const src = readFileSync(file, 'utf8')
  src.split('\n').forEach((line, i) => {
    for (const m of line.matchAll(CLASS)) {
      const hex = m[3] ? custom[m[3]] : colors[m[1]]?.[m[2]]
      if (typeof hex !== 'string') continue
      const key = m[3] ?? `${m[1]}-${m[2]}`
      if (!seen.has(key)) seen.set(key, { hex, r: ratio(hex, SURFACE), hits: [] })
      seen.get(key).hits.push(`${file.split('/src/')[1]}:${i + 1}`)
    }
  })
}

const fails = [...seen.entries()].filter(([, v]) => v.r < AA).sort((a, b) => a[1].r - b[1].r)
const dim = [...seen.entries()].filter(([, v]) => v.r >= AA && v.r < AAA).sort((a, b) => a[1].r - b[1].r)

if (dim.length) {
  console.log(`contrast: ${dim.length} colour(s) between AA and AAA on ${SURFACE} — acceptable, keep off long body text:`)
  for (const [k, v] of dim) console.log(`  ${k.padEnd(13)} ${v.hex}  ${v.r.toFixed(2)}:1  (${v.hits.length} uses)`)
}

if (fails.length) {
  console.error(`\ncontrast: ${fails.length} colour(s) below AA ${AA}:1 on ${SURFACE}:`)
  for (const [k, v] of fails) {
    console.error(`  ${k.padEnd(13)} ${v.hex}  ${v.r.toFixed(2)}:1`)
    for (const h of v.hits.slice(0, 8)) console.error(`      ${h}`)
    if (v.hits.length > 8) console.error(`      ...and ${v.hits.length - 8} more`)
  }
  console.error('\nPick a lighter shade. `text-dim` is the dimmest grey this app allows.')
  process.exit(1)
}

console.log(`contrast: ${seen.size} text colours checked, all >= AA on ${SURFACE}`)
