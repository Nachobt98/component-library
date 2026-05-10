import { ArrowLeft, ArrowRight, Save, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'

const variants = ['primary', 'secondary', 'outline', 'ghost', 'soft', 'danger', 'link']
const sizes = ['sm', 'md', 'lg', 'xl']
const radii = ['sm', 'md', 'lg', 'full']

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

function OptionGroup({ label, value, options, onChange, optional = false }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-white/35">{label}</p>
        {optional && value ? (
          <button
            className="rounded-full px-2 py-1 text-[11px] text-white/35 transition hover:bg-white/8 hover:text-white/65"
            onClick={() => onChange(undefined)}
            type="button"
          >
            Clear
          </button>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value === option

          return (
            <button
              key={option}
              className={cx(
                'rounded-xl px-3 py-2 text-xs capitalize transition',
                isSelected ? 'bg-white text-slate-950' : 'bg-white/8 text-white/60 hover:bg-white/12',
              )}
              onClick={() => onChange(optional && isSelected ? undefined : option)}
              type="button"
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function buildCode(controls) {
  const props = [`variant="${controls.variant}"`, `size="${controls.size}"`]

  if (controls.radius) props.push(`radius="${controls.radius}"`)
  if (controls.glow) props.push('glow')
  if (controls.loading) props.push('loading')
  if (controls.disabled) props.push('disabled')
  if (controls.fullWidth) props.push('fullWidth')

  const label = controls.loading ? 'Guardando' : 'Guardar cambios'

  return `<Button ${props.join(' ')}>\n  ${label}\n</Button>`
}

export function ButtonPlayground({ palette, controls, onControlsChange, onBack }) {
  const update = (partial) => onControlsChange({ ...controls, ...partial })
  const code = buildCode(controls)

  return (
    <section className="space-y-6">
      <button
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/70 transition hover:bg-white/12"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft className="h-4 w-4" /> Volver al mapa
      </button>

      <div className="rounded-3xl border border-white/10 bg-white/[0.065] p-5 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
              <Sparkles className="h-3.5 w-3.5" /> Core component
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white">Button</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
              Componente de acción con variante y tamaño obligatorios; radio, glow, loading, disabled, full width e icon slots opcionales.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">A11y ready</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">Customizable</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">No tone prop</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white">Preview interactiva</h3>
              <p className="mt-1 text-sm text-white/45">Cambia props y observa el resultado del componente real.</p>
            </div>
          </div>

          <div className="grid min-h-56 place-items-center rounded-3xl border border-white/10 bg-black/20 p-8">
            <Button
              disabled={controls.disabled}
              fullWidth={controls.fullWidth}
              glow={controls.glow}
              leftIcon={controls.withLeftIcon ? <Save className="h-4 w-4" /> : undefined}
              loading={controls.loading}
              palette={palette}
              radius={controls.radius}
              rightIcon={controls.withRightIcon ? <ArrowRight className="h-4 w-4" /> : undefined}
              size={controls.size}
              variant={controls.variant}
            >
              {controls.loading ? 'Guardando' : 'Guardar cambios'}
            </Button>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <h4 className="mb-3 text-sm font-semibold text-white">Variantes</h4>
              <div className="flex flex-wrap gap-3">
                {variants.map((variant) => (
                  <Button key={variant} palette={palette} radius="lg" size="md" variant={variant}>
                    {variant}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-white">Tamaños</h4>
              <div className="flex flex-wrap items-center gap-3">
                {sizes.map((size) => (
                  <Button key={size} palette={palette} radius="lg" size={size} variant="primary">
                    {size.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-white">Estados</h4>
              <div className="flex flex-wrap gap-3">
                <Button leftIcon={<Save className="h-4 w-4" />} palette={palette} variant="primary">Con icono</Button>
                <Button loading palette={palette} variant="primary">Loading</Button>
                <Button disabled palette={palette} variant="primary">Disabled</Button>
                <Button glow palette={palette} radius="lg" variant="primary">Glow</Button>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
            <h3 className="mb-4 text-base font-semibold text-white">Controles</h3>
            <div className="space-y-5">
              <OptionGroup label="Variant" onChange={(variant) => update({ variant })} options={variants} value={controls.variant} />
              <OptionGroup label="Size" onChange={(size) => update({ size })} options={sizes} value={controls.size} />
              <OptionGroup label="Radius" onChange={(radius) => update({ radius })} options={radii} optional value={controls.radius} />
              <div className="space-y-2">
                {[
                  ['glow', 'Glow'],
                  ['loading', 'Loading'],
                  ['disabled', 'Disabled'],
                  ['fullWidth', 'Full width'],
                  ['withLeftIcon', 'Left icon'],
                  ['withRightIcon', 'Right icon'],
                ].map(([key, label]) => (
                  <label key={key} className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/8 bg-white/[0.035] px-3 py-2 text-sm text-white/65">
                    {label}
                    <input checked={Boolean(controls[key])} onChange={(event) => update({ [key]: event.target.checked })} type="checkbox" />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-xl">
            <h3 className="mb-3 text-base font-semibold text-white">Código</h3>
            <pre className="overflow-auto rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-xs leading-5 text-white/70"><code>{code}</code></pre>
          </div>
        </aside>
      </div>
    </section>
  )
}
