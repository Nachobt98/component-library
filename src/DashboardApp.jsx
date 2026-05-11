import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Boxes, ChevronRight, Component, Gauge, Palette, Search, Sparkles } from 'lucide-react'
import { ButtonPlayground } from './components/playgrounds/ButtonPlayground'
import { CardPlayground } from './components/playgrounds/CardPlayground'
import { InputFieldPlayground } from './components/playgrounds/InputFieldPlayground'
import { Card } from './components/ui/Card'

const palettes = {
  nocturne: {
    name: 'Nocturne Coral',
    mood: 'Elegante, tech, con acento cálido',
    bg: 'from-slate-950 via-slate-900 to-stone-950',
    primary: '#F9736B',
    secondary: '#8B5CF6',
    accent: '#14B8A6',
  },
  atlas: {
    name: 'Atlas Emerald',
    mood: 'Producto serio, calmado y premium',
    bg: 'from-emerald-950 via-slate-950 to-zinc-950',
    primary: '#10B981',
    secondary: '#38BDF8',
    accent: '#F59E0B',
  },
  ink: {
    name: 'Ink Violet',
    mood: 'Creativo, distintivo, menos SaaS genérico',
    bg: 'from-indigo-950 via-zinc-950 to-fuchsia-950',
    primary: '#A78BFA',
    secondary: '#F472B6',
    accent: '#FDE68A',
  },
  arctic: {
    name: 'Arctic Blue',
    mood: 'Técnica, limpia y muy SaaS',
    bg: 'from-slate-950 via-blue-950 to-cyan-950',
    primary: '#3B82F6',
    secondary: '#06B6D4',
    accent: '#A3E635',
  },
  graphite: {
    name: 'Graphite Amber',
    mood: 'Sobria, cálida y profesional',
    bg: 'from-zinc-950 via-stone-950 to-amber-950',
    primary: '#F59E0B',
    secondary: '#64748B',
    accent: '#22C55E',
  },
  rosewood: {
    name: 'Rosewood Mint',
    mood: 'Visual, atrevida y memorable',
    bg: 'from-stone-950 via-rose-950 to-teal-950',
    primary: '#E11D48',
    secondary: '#14B8A6',
    accent: '#FACC15',
  },
}

const groups = ['Core', 'Forms', 'Data', 'Navigation', 'Feedback', 'Special']

const components = [
  { id: 'button', name: 'Button', group: 'Core', impact: 94, complexity: 'Baja', badge: 'base', ready: true, desc: 'Variants: primary, secondary, outline, ghost, soft, danger y link. Tamaños, radios y estados configurables.' },
  { id: 'card', name: 'Card', group: 'Core', impact: 91, complexity: 'Baja', badge: 'layout', ready: true, desc: 'Surface composable con variant y padding obligatorios; radius, estados y slots opcionales.' },
  { id: 'input', name: 'Input Field', group: 'Forms', impact: 90, complexity: 'Media', badge: 'a11y', ready: true, desc: 'Label obligatorio, helper text, error/success state, icon slots y validación visual.' },
  { id: 'select', name: 'Select / Combobox', group: 'Forms', impact: 88, complexity: 'Alta', badge: 'headless', desc: 'Búsqueda, grupos, empty state, keyboard nav y tokens de altura.' },
  { id: 'alert-toast', name: 'Alert / Toast', group: 'Feedback', impact: 82, complexity: 'Media', badge: 'motion', desc: 'Stack animado con success, info, warning y danger.' },
  { id: 'table', name: 'Table Pro', group: 'Data', impact: 89, complexity: 'Alta', badge: 'data', desc: 'Sorting, density, sticky actions, empty state y skeleton loading.' },
  { id: 'tabs', name: 'Tabs', group: 'Navigation', impact: 78, complexity: 'Media', badge: 'nav', desc: 'Underline, pill, segmented, icon tabs y orientación vertical.' },
  { id: 'command-palette', name: 'Command Palette', group: 'Special', impact: 87, complexity: 'Alta', badge: 'wow', desc: 'Buscador global estilo IDE: acciones, atajos, grupos y navegación rápida.' },
  { id: 'stat-orb', name: 'Stat Orb', group: 'Special', impact: 74, complexity: 'Media', badge: 'visual', desc: 'Indicador circular con gradiente, progreso, delta y estado semántico.' },
]

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

const initialCardControls = {
  variant: 'solid',
  padding: 'md',
  radius: 'lg',
  actionAlign: 'end',
  hoverable: false,
  selected: false,
  disabled: false,
  glow: false,
  withHeader: true,
  withFooter: true,
}

const initialInputControls = {
  type: 'email',
  label: 'Email',
  size: 'md',
  radius: 'lg',
  state: 'default',
  required: true,
  disabled: false,
  withHelper: true,
  optionalText: false,
  withLeftIcon: true,
  withRightIcon: false,
  withPrefix: false,
  withSuffix: false,
}

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Swatch({ color, label }) {
  return (
    <Card variant="solid" padding="sm" radius="lg" className="flex items-center gap-3">
      <div className="h-11 w-11 rounded-2xl ring-1 ring-white/20" style={{ background: color }} />
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-white/40">{label}</p>
        <p className="font-mono text-sm text-white/80">{color}</p>
      </div>
    </Card>
  )
}

function ComponentMap({ activeGroup, filtered, onOpenComponent, palette, query, setActiveGroup, setQuery }) {
  return (
    <Card variant="glass" padding="md" radius="lg">
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
          <button key={group} onClick={() => setActiveGroup(group)} className={cx('rounded-full px-4 py-2 text-sm transition', activeGroup === group ? 'text-slate-950' : 'bg-white/8 text-white/60 hover:bg-white/12')} style={activeGroup === group ? { background: '#FFF1ED' } : undefined} type="button">{group}</button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.article layout key={item.id} initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: -8 }} transition={{ duration: 0.18 }}>
              <Card variant="solid" padding="md" radius="lg" hoverable>
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: `${palette.primary}20`, color: palette.primary }}>
                    {item.group === 'Data' ? <Gauge className="h-5 w-5" /> : item.group === 'Special' ? <Sparkles className="h-5 w-5" /> : <Boxes className="h-5 w-5" />}
                  </div>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/70">{item.badge}</span>
                </div>
                <Card.Title>{item.name}</Card.Title>
                <Card.Description className="min-h-[60px]">{item.desc}</Card.Description>
                <Card.Footer>
                  <div className="flex items-center justify-between">
                    <div><p className="text-[11px] uppercase tracking-[0.18em] text-white/30">Impact</p><p className="text-sm font-semibold text-white">{item.impact}/100</p></div>
                    <div><p className="text-[11px] uppercase tracking-[0.18em] text-white/30">Complexity</p><p className="text-sm font-semibold text-white">{item.complexity}</p></div>
                    <button className="grid h-9 w-9 place-items-center rounded-full bg-white/8 text-white/55 transition hover:bg-white hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40" aria-label={`View ${item.name}`} disabled={!item.ready} onClick={() => item.ready && onOpenComponent(item.id)} type="button"><ChevronRight className="h-4 w-4" /></button>
                  </div>
                </Card.Footer>
              </Card>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  )
}

export default function DashboardApp() {
  const [paletteKey, setPaletteKey] = useState('nocturne')
  const [activeGroup, setActiveGroup] = useState('Special')
  const [query, setQuery] = useState('')
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [buttonControls, setButtonControls] = useState(initialButtonControls)
  const [cardControls, setCardControls] = useState(initialCardControls)
  const [inputControls, setInputControls] = useState(initialInputControls)

  const palette = palettes[paletteKey]
  const filtered = useMemo(() => {
    return components.filter((item) => {
      const matchesGroup = activeGroup === 'All' || item.group === activeGroup
      const matchesQuery = `${item.name} ${item.desc} ${item.group}`.toLowerCase().includes(query.toLowerCase())
      return matchesGroup && matchesQuery
    })
  }, [activeGroup, query])

  return (
    <main className={cx('min-h-screen overflow-hidden bg-gradient-to-br p-4 text-white sm:p-6 lg:p-8', palette.bg, `palette-${paletteKey}`)}>
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
              Dashboard inicial para explorar propuestas, tokens visuales, paletas estratégicas y componentes especiales.
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-4">
            <Card variant="glass" padding="md" radius="lg">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                <Palette className="h-4 w-4" /> Paleta estratégica
              </div>
              <div className="grid gap-2">
                {Object.entries(palettes).map(([key, value]) => (
                  <button key={key} onClick={() => setPaletteKey(key)} className={cx('flex items-center justify-between rounded-2xl border p-3 text-left transition', paletteKey === key ? 'border-white/30 bg-white/14' : 'border-white/8 bg-white/[0.035] hover:bg-white/8')} type="button">
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
            </Card>
          </aside>

          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Swatch color={palette.primary} label="Primary" />
              <Swatch color={palette.secondary} label="Secondary" />
              <Swatch color={palette.accent} label="Accent" />
            </div>

            {selectedComponent === 'button' ? (
              <ButtonPlayground controls={buttonControls} onBack={() => setSelectedComponent(null)} onControlsChange={setButtonControls} palette={palette} />
            ) : selectedComponent === 'card' ? (
              <CardPlayground controls={cardControls} onBack={() => setSelectedComponent(null)} onControlsChange={setCardControls} palette={palette} />
            ) : selectedComponent === 'input' ? (
              <InputFieldPlayground controls={inputControls} onBack={() => setSelectedComponent(null)} onControlsChange={setInputControls} />
            ) : (
              <ComponentMap activeGroup={activeGroup} filtered={filtered} onOpenComponent={setSelectedComponent} palette={palette} query={query} setActiveGroup={setActiveGroup} setQuery={setQuery} />
            )}
          </section>
        </div>
      </section>
    </main>
  )
}
