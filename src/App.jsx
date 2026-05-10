import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BadgeCheck,
  Boxes,
  Brush,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  Component,
  Copy,
  Eye,
  Gauge,
  Layers3,
  Palette,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Wand2,
  Zap,
} from 'lucide-react'
import { Button } from './components/ui/Button'
import { ButtonPlayground } from './components/playgrounds/ButtonPlayground'

const palettes = {
  nocturne: {
    name: 'Nocturne Coral',
    mood: 'Elegante, tech, con acento cálido',
    bg: 'from-slate-950 via-slate-900 to-stone-950',
    surface: 'bg-white/8',
    panel: 'bg-white/[0.075]',
    border: 'border-white/12',
    primary: '#F9736B',
    secondary: '#8B5CF6',
    accent: '#14B8A6',
    soft: '#FFF1ED',
    dark: '#111827',
  },
  atlas: {
    name: 'Atlas Emerald',
    mood: 'Producto serio, calmado y premium',
    bg: 'from-emerald-950 via-slate-950 to-zinc-950',
    surface: 'bg-emerald-50/8',
    panel: 'bg-emerald-50/[0.08]',
    border: 'border-emerald-100/12',
    primary: '#10B981',
    secondary: '#38BDF8',
    accent: '#F59E0B',
    soft: '#ECFDF5',
    dark: '#052E2B',
  },
  ink: {
    name: 'Ink Violet',
    mood: 'Creativo, distintivo, menos SaaS genérico',
    bg: 'from-indigo-950 via-zinc-950 to-fuchsia-950',
    surface: 'bg-violet-50/8',
    panel: 'bg-violet-50/[0.075]',
    border: 'border-violet-100/12',
    primary: '#A78BFA',
    secondary: '#F472B6',
    accent: '#FDE68A',
    soft: '#F5F3FF',
    dark: '#1E1B4B',
  },
  arctic: {
    name: 'Arctic Blue',
    mood: 'Técnica, limpia y muy SaaS',
    bg: 'from-slate-950 via-blue-950 to-cyan-950',
    surface: 'bg-blue-50/8',
    panel: 'bg-blue-50/[0.075]',
    border: 'border-blue-100/12',
    primary: '#3B82F6',
    secondary: '#06B6D4',
    accent: '#A3E635',
    soft: '#EFF6FF',
    dark: '#0F172A',
  },
  graphite: {
    name: 'Graphite Amber',
    mood: 'Sobria, cálida y profesional',
    bg: 'from-zinc-950 via-stone-950 to-amber-950',
    surface: 'bg-amber-50/8',
    panel: 'bg-amber-50/[0.075]',
    border: 'border-amber-100/12',
    primary: '#F59E0B',
    secondary: '#64748B',
    accent: '#22C55E',
    soft: '#FFFBEB',
    dark: '#18181B',
  },
  rosewood: {
    name: 'Rosewood Mint',
    mood: 'Visual, atrevida y memorable',
    bg: 'from-stone-950 via-rose-950 to-teal-950',
    surface: 'bg-rose-50/8',
    panel: 'bg-rose-50/[0.075]',
    border: 'border-rose-100/12',
    primary: '#E11D48',
    secondary: '#14B8A6',
    accent: '#FACC15',
    soft: '#FFF1F2',
    dark: '#1C1917',
  },
}

const groups = ['Core', 'Forms', 'Data', 'Navigation', 'Feedback', 'Special']

const components = [
  { id: 'button', name: 'Button', group: 'Core', impact: 94, complexity: 'Baja', badge: 'base', desc: 'Variants: primary, secondary, outline, ghost, soft, danger y link. Tamaños, radios y estados configurables.', ready: true },
  { id: 'input', name: 'Input Field', group: 'Forms', impact: 90, complexity: 'Media', badge: 'a11y', desc: 'Label persistente, helper text, error state, icon slots y validación visual.' },
  { id: 'select', name: 'Select / Combobox', group: 'Forms', impact: 88, complexity: 'Alta', badge: 'headless', desc: 'Búsqueda, grupos, empty state, keyboard nav y tokens de altura.' },
  { id: 'alert-toast', name: 'Alert / Toast', group: 'Feedback', impact: 82, complexity: 'Media', badge: 'motion', desc: 'Stack animado con success, info, warning y danger.' },
  { id: 'card', name: 'Card', group: 'Core', impact: 91, complexity: 'Baja', badge: 'layout', desc: 'Media, header, metadata, actions, hover y densidad configurable.' },
  { id: 'table', name: 'Table Pro', group: 'Data', impact: 89, complexity: 'Alta', badge: 'data', desc: 'Sorting, density, sticky actions, empty state y skeleton loading.' },
  { id: 'tabs', name: 'Tabs', group: 'Navigation', impact: 78, complexity: 'Media', badge: 'nav', desc: 'Underline, pill, segmented, icon tabs y orientación vertical.' },
  { id: 'command-palette', name: 'Command Palette', group: 'Special', impact: 87, complexity: 'Alta', badge: 'wow', desc: 'Buscador global estilo IDE: acciones, atajos, grupos y navegación rápida.' },
  { id: 'stat-orb', name: 'Stat Orb', group: 'Special', impact: 74, complexity: 'Media', badge: 'visual', desc: 'Indicador circular con gradiente, progreso, delta y estado semántico.' },
  { id: 'bento', name: 'Bento Feature Grid', group: 'Special', impact: 86, complexity: 'Media', badge: 'bento', desc: 'Grid editorial para landing/docs: bloques asimétricos pero alineados.' },
  { id: 'timeline', name: 'Timeline Rail', group: 'Data', impact: 79, complexity: 'Media', badge: 'story', desc: 'Historial de eventos con estado, autor, fecha y acciones contextuales.' },
  { id: 'color-studio', name: 'Color Harmony Studio', group: 'Special', impact: 92, complexity: 'Alta', badge: 'unique', desc: 'Componente para visualizar tokens, contraste, roles y combinaciones cromáticas.' },
]

const tokens = [
  { label: 'Radius', value: '12 / 16 / 24', icon: CircleDot },
  { label: 'Spacing', value: '4pt · 8pt grid', icon: Layers3 },
  { label: 'Typography', value: 'Inter / 16px base', icon: Code2 },
  { label: 'Motion', value: '160-240ms', icon: Zap },
]

const badgeStyles = {
  base: 'bg-white/10 text-white',
  a11y: 'bg-emerald-400/15 text-emerald-200',
  headless: 'bg-sky-400/15 text-sky-200',
  motion: 'bg-fuchsia-400/15 text-fuchsia-200',
  layout: 'bg-amber-400/15 text-amber-200',
  data: 'bg-cyan-400/15 text-cyan-200',
  nav: 'bg-indigo-400/15 text-indigo-200',
  wow: 'bg-rose-400/15 text-rose-200',
  visual: 'bg-teal-400/15 text-teal-200',
  bento: 'bg-orange-400/15 text-orange-200',
  story: 'bg-lime-400/15 text-lime-200',
  unique: 'bg-violet-400/15 text-violet-200',
}

const initialButtonControls = {
  variant: 'primary',
  size: 'md',
  radius: 'lg',
  loading: false,
  disabled: false,
  fullWidth: false,
  withLeftIcon: false,
  withRightIcon: false,
}

function hexToRgb(hex) {
  const normalized = hex.replace('#', '')
  const value = Number.parseInt(normalized, 16)
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 }
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex)
  const channel = [r, g, b].map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * channel[0] + 0.7152 * channel[1] + 0.0722 * channel[2]
}

function contrast(a, b) {
  const l1 = luminance(a)
  const l2 = luminance(b)
  return ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2)
}

function cx(...items) {
  return items.filter(Boolean).join(' ')
}

function PaletteSwatch({ color, label }) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3">
      <div className="h-11 w-11 rounded-2xl shadow-lg ring-1 ring-white/20 transition-transform group-hover:scale-105" style={{ background: color }} />
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.22em] text-white/40">{label}</p>
        <p className="font-mono text-sm text-white/80">{color}</p>
      </div>
    </div>
  )
}

function ComponentPreview({ palette, density, radius }) {
  const round = radius === 'soft' ? 'rounded-2xl' : radius === 'pill' ? 'rounded-full' : 'rounded-md'
  const pad = density === 'compact' ? 'p-4' : density === 'cozy' ? 'p-5' : 'p-7'

  return (
    <div className={cx('relative overflow-hidden border', palette.border, palette.panel, round, pad)}>
      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full blur-3xl opacity-25" style={{ background: palette.primary }} />
      <div className="absolute -bottom-24 left-16 h-52 w-52 rounded-full blur-3xl opacity-20" style={{ background: palette.secondary }} />

      <div className="relative flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
              <Sparkles className="h-3.5 w-3.5" /> Live preview
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-white">Component proposal</h3>
            <p className="mt-1 max-w-xl text-sm leading-6 text-white/55">
              Sistema visual basado en tokens: color, radius, sombra, densidad y movimiento sin casarse con una única estética.
            </p>
          </div>
          <button className="rounded-full border border-white/10 bg-white/10 p-3 text-white/80 transition hover:bg-white/15" aria-label="Copy preview config">
            <Copy className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <motion.div layout className={cx('border', palette.border, 'bg-black/20', round, density === 'compact' ? 'p-4' : 'p-5')}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Button variants</p>
                <p className="text-xs text-white/45">Primary, secondary, outline, ghost, soft, danger, link</p>
              </div>
              <BadgeCheck className="h-5 w-5" style={{ color: palette.accent }} />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button palette={palette} radius={radius === 'pill' ? 'full' : 'lg'} variant="primary">Primary</Button>
              <Button palette={palette} radius={radius === 'pill' ? 'full' : 'lg'} variant="secondary">Secondary</Button>
              <Button palette={palette} radius={radius === 'pill' ? 'full' : 'lg'} variant="soft">Soft</Button>
              <Button palette={palette} radius={radius === 'pill' ? 'full' : 'lg'} variant="ghost">Ghost</Button>
              <Button palette={palette} radius={radius === 'pill' ? 'full' : 'lg'} variant="danger">Danger</Button>
            </div>
          </motion.div>

          <motion.div layout className={cx('border', palette.border, 'bg-white/[0.045]', round, density === 'compact' ? 'p-4' : 'p-5')}>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: `${palette.accent}22`, color: palette.accent }}>
                <Gauge className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Stat Orb</p>
                <p className="text-xs text-white/45">Componente especial</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-5">
              <div className="relative grid h-24 w-24 place-items-center rounded-full" style={{ background: `conic-gradient(${palette.primary} 0 78%, rgba(255,255,255,0.10) 78% 100%)` }}>
                <div className="grid h-20 w-20 place-items-center rounded-full bg-slate-950/90 text-xl font-bold text-white">78%</div>
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Adoption</p>
                <p className="mt-1 text-sm text-white/50">+16% respecto al sprint anterior</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className={cx('border', palette.border, 'bg-white/[0.045]', round, 'p-4')}>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-white">Color Harmony Studio</p>
              <p className="text-xs text-white/45">El raro útil: no solo enseña colores, enseña decisiones.</p>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">AA check</span>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {[
              ['Primary / Dark', palette.primary, palette.dark],
              ['Secondary / Dark', palette.secondary, palette.dark],
              ['Accent / Dark', palette.accent, palette.dark],
              ['Soft / Dark', palette.soft, palette.dark],
            ].map(([label, fg, bg]) => (
              <div key={label} className="rounded-2xl border border-white/10 p-3" style={{ background: bg }}>
                <p className="text-xs uppercase tracking-[0.18em]" style={{ color: fg }}>{label}</p>
                <p className="mt-2 text-sm font-semibold" style={{ color: fg }}>Contrast {contrast(fg, bg)}:1</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ComponentMap({ activeGroup, filtered, onOpenComponent, palette, query, setActiveGroup, setQuery }) {
  return (
    <div className={cx('rounded-3xl border p-4 backdrop-blur-xl', palette.border, palette.surface)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-white">Mapa de componentes propuestos</h2>
          <p className="mt-1 text-sm text-white/48">La gracia está en que todo sea bonito, sí, pero sobre todo componible.</p>
        </div>
        <div className="relative min-w-[260px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar componente..." className="w-full rounded-2xl border border-white/10 bg-white/[0.055] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {['All', ...groups].map((group) => (
          <button key={group} onClick={() => setActiveGroup(group)} className={cx('rounded-full px-4 py-2 text-sm transition', activeGroup === group ? 'text-slate-950' : 'bg-white/8 text-white/60 hover:bg-white/12')} style={activeGroup === group ? { background: palette.soft } : undefined}>{group}</button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.article layout key={item.id} initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: -8 }} transition={{ duration: 0.18 }} className="group rounded-3xl border border-white/10 bg-white/[0.045] p-4 transition hover:-translate-y-1 hover:bg-white/[0.075]">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: `${palette.primary}20`, color: palette.primary }}>
                  {item.group === 'Special' ? <Sparkles className="h-5 w-5" /> : item.group === 'Data' ? <Gauge className="h-5 w-5" /> : <Boxes className="h-5 w-5" />}
                </div>
                <span className={cx('rounded-full px-2.5 py-1 text-[11px] font-medium', badgeStyles[item.badge])}>{item.badge}</span>
              </div>
              <h3 className="text-base font-semibold text-white">{item.name}</h3>
              <p className="mt-2 min-h-[60px] text-sm leading-5 text-white/50">{item.desc}</p>
              <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                <div><p className="text-[11px] uppercase tracking-[0.18em] text-white/30">Impact</p><p className="text-sm font-semibold text-white">{item.impact}/100</p></div>
                <div><p className="text-[11px] uppercase tracking-[0.18em] text-white/30">Complexity</p><p className="text-sm font-semibold text-white">{item.complexity}</p></div>
                <button className="grid h-9 w-9 place-items-center rounded-full bg-white/8 text-white/55 transition group-hover:bg-white group-hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40" aria-label={`View ${item.name}`} disabled={!item.ready} onClick={() => item.ready && onOpenComponent(item.id)} type="button"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function App() {
  const [paletteKey, setPaletteKey] = useState('nocturne')
  const [activeGroup, setActiveGroup] = useState('Special')
  const [density, setDensity] = useState('cozy')
  const [radius, setRadius] = useState('soft')
  const [query, setQuery] = useState('')
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [buttonControls, setButtonControls] = useState(initialButtonControls)

  const palette = palettes[paletteKey]
  const filtered = useMemo(() => {
    return components.filter((item) => {
      const matchesGroup = activeGroup === 'All' || item.group === activeGroup
      const matchesQuery = `${item.name} ${item.desc} ${item.group}`.toLowerCase().includes(query.toLowerCase())
      return matchesGroup && matchesQuery
    })
  }, [activeGroup, query])

  const priority = useMemo(() => {
    const avg = Math.round(filtered.reduce((sum, item) => sum + item.impact, 0) / Math.max(filtered.length, 1))
    return Number.isNaN(avg) ? 0 : avg
  }, [filtered])

  return (
    <main className={cx('min-h-screen overflow-hidden bg-gradient-to-br p-4 text-white sm:p-6 lg:p-8', palette.bg)}>
      <div className="pointer-events-none fixed inset-0 opacity-50 [background:radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.10),transparent_24%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:auto,auto,56px_56px,56px_56px]" />

      <section className="relative mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/70 backdrop-blur">
              <Component className="h-4 w-4" /> React Component Library · Concept Dashboard
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Componentes customizables con estética seria, pero sin olor a plantilla corporativa de 2012.
            </motion.h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/58">
              Dashboard inicial para explorar propuestas, tokens visuales, paletas estratégicas y componentes especiales que pueden diferenciar tu librería sin sacrificar accesibilidad ni reutilización.
            </p>
          </div>
          <div className={cx('grid min-w-[280px] gap-3 rounded-3xl border p-4 backdrop-blur-xl', palette.border, palette.surface)}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/55">Readiness score</span>
              <span className="text-sm font-semibold" style={{ color: palette.accent }}>{priority}/100</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full" style={{ background: palette.primary }} initial={{ width: 0 }} animate={{ width: `${priority}%` }} />
            </div>
            <div className="flex items-center gap-2 text-xs text-white/45">
              <ShieldCheck className="h-4 w-4" /> Basado en tokens, variantes, Storybook y AA como mínimo razonable.
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-4">
            <div className={cx('rounded-3xl border p-4 backdrop-blur-xl', palette.border, palette.surface)}>
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                <Palette className="h-4 w-4" /> Paleta estratégica
              </div>
              <div className="grid gap-2">
                {Object.entries(palettes).map(([key, value]) => (
                  <button key={key} onClick={() => setPaletteKey(key)} className={cx('flex items-center justify-between rounded-2xl border p-3 text-left transition', paletteKey === key ? 'border-white/30 bg-white/14' : 'border-white/8 bg-white/[0.035] hover:bg-white/8')}>
                    <div>
                      <p className="text-sm font-medium text-white">{value.name}</p>
                      <p className="mt-1 text-xs text-white/45">{value.mood}</p>
                    </div>
                    <div className="flex -space-x-2">
                      {[value.primary, value.secondary, value.accent].map((color) => <span key={color} className="h-6 w-6 rounded-full ring-2 ring-slate-950" style={{ background: color }} />)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className={cx('rounded-3xl border p-4 backdrop-blur-xl', palette.border, palette.surface)}>
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                <Wand2 className="h-4 w-4" /> Controles de sistema
              </div>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/35">Density</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['compact', 'cozy', 'roomy'].map((item) => <button key={item} onClick={() => setDensity(item)} className={cx('rounded-xl px-3 py-2 text-xs capitalize transition', density === item ? 'bg-white text-slate-950' : 'bg-white/8 text-white/60 hover:bg-white/12')}>{item}</button>)}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/35">Radius</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['sharp', 'soft', 'pill'].map((item) => <button key={item} onClick={() => setRadius(item)} className={cx('rounded-xl px-3 py-2 text-xs capitalize transition', radius === item ? 'bg-white text-slate-950' : 'bg-white/8 text-white/60 hover:bg-white/12')}>{item}</button>)}
                  </div>
                </div>
              </div>
            </div>

            <div className={cx('rounded-3xl border p-4 backdrop-blur-xl', palette.border, palette.surface)}>
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                <Brush className="h-4 w-4" /> Tokens vivos
              </div>
              <div className="grid gap-3">
                {tokens.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: `${palette.primary}1f`, color: palette.primary }}><Icon className="h-4 w-4" /></div>
                    <div>
                      <p className="text-sm font-medium text-white">{label}</p>
                      <p className="text-xs text-white/45">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <PaletteSwatch color={palette.primary} label="Primary" />
              <PaletteSwatch color={palette.secondary} label="Secondary" />
              <PaletteSwatch color={palette.accent} label="Accent" />
            </div>

            {selectedComponent === 'button' ? (
              <ButtonPlayground controls={buttonControls} onBack={() => setSelectedComponent(null)} onControlsChange={setButtonControls} palette={palette} />
            ) : (
              <>
                <ComponentPreview palette={palette} density={density} radius={radius} />
                <ComponentMap activeGroup={activeGroup} filtered={filtered} onOpenComponent={setSelectedComponent} palette={palette} query={query} setActiveGroup={setActiveGroup} setQuery={setQuery} />

                <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
                  <div className={cx('rounded-3xl border p-5 backdrop-blur-xl', palette.border, palette.surface)}>
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-white">Roadmap visual inicial</h2>
                        <p className="mt-1 text-sm text-white/45">Orden lógico para no construir un castillo precioso sobre CSS de plastilina.</p>
                      </div>
                      <Play className="h-5 w-5" style={{ color: palette.accent }} />
                    </div>
                    <div className="space-y-4">
                      {[
                        ['01', 'Design tokens', 'Color roles, spacing, radius, typography, shadow, motion.'],
                        ['02', 'Foundations', 'Button, Input, Label, Textarea, Checkbox, Radio, Switch, Badge.'],
                        ['03', 'Composed UI', 'Card, Modal, Drawer, Table, Tabs, Toast, Tooltip, Dropdown.'],
                        ['04', 'Signature components', 'Command Palette, Color Harmony Studio, Stat Orb, Bento Grid.'],
                      ].map(([step, title, desc]) => (
                        <div key={step} className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.035] p-4">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl font-mono text-sm" style={{ background: `${palette.primary}24`, color: palette.primary }}>{step}</div>
                          <div><p className="font-medium text-white">{title}</p><p className="mt-1 text-sm text-white/45">{desc}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={cx('rounded-3xl border p-5 backdrop-blur-xl', palette.border, palette.surface)}>
                    <div className="mb-5 flex items-center gap-2">
                      <Eye className="h-5 w-5" style={{ color: palette.primary }} />
                      <h2 className="text-xl font-semibold text-white">Principios de esta estética</h2>
                    </div>
                    <div className="space-y-3">
                      {[
                        'Mucho neutro, poco acento: el color guía, no grita.',
                        'Gradientes contenidos: profundidad sí, feria de pueblo no.',
                        'Estados visibles: hover, focus, disabled, loading y error desde el día uno.',
                        'Componentes raros, pero útiles: diferenciación con propósito.',
                        'Customización por tokens y variantes, no por sobrescribir clases a martillazos.',
                      ].map((item) => (
                        <div key={item} className="flex gap-3 rounded-2xl bg-white/[0.035] p-3 text-sm text-white/58">
                          <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: palette.accent }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </section>
    </main>
  )
}
