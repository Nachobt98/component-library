import { ArrowLeft, AtSign, Eye, Lock, Search, Sparkles, User } from 'lucide-react'
import { Card } from '../ui/Card'
import { InputField } from '../ui/InputField'
import { BooleanControlList, OptionGroup } from './PlaygroundControls'

const variants = ['filled', 'standard']
const sizes = ['sm', 'md', 'lg']
const radii = ['sm', 'md', 'lg', 'full']
const states = ['default', 'error', 'success']
const inputTypes = ['text', 'email', 'password', 'search']
const iconPositions = ['left', 'right']

function buildCode(controls) {
  const props = [
    'id="profile-email"',
    'name="email"',
    `type="${controls.type}"`,
    `variant="${controls.variant}"`,
    `size="${controls.size}"`,
  ]

  if (controls.withLabel) props.push(`label="${controls.label || 'Email'}"`)
  if (!controls.withLabel) props.push('ariaLabel="Email"')
  if (controls.radius && controls.variant !== 'standard') props.push(`radius="${controls.radius}"`)
  if (controls.required) props.push('required')
  if (controls.disabled) props.push('disabled')
  if (controls.withHelper) props.push('helperText="We will only use it for account notifications."')
  if (controls.state === 'error') props.push('error="Enter a valid email address."')
  if (controls.state === 'success') props.push('success="Looks good."')
  if (controls.withIcon) props.push(`icon={<${getIconComponentName(controls.type)} />}`)
  if (controls.withIcon) props.push(`iconPosition="${controls.iconPosition}"`)

  return `<InputField\n  ${props.join('\n  ')}\n  placeholder="name@company.com"\n/>`
}

function getIconComponentName(type) {
  const names = {
    text: 'User',
    email: 'AtSign',
    password: 'Lock',
    search: 'Search',
  }

  return names[type]
}

function getIcon(type) {
  const icons = {
    text: <User />,
    email: <AtSign />,
    password: <Lock />,
    search: <Search />,
  }

  return icons[type]
}

export function InputFieldPlayground({ controls, onControlsChange, onBack }) {
  const update = (partial) => onControlsChange({ ...controls, ...partial })
  const code = buildCode(controls)
  const stateProps = {
    error: controls.state === 'error' ? 'Enter a valid email address.' : undefined,
    success: controls.state === 'success' ? 'Looks good.' : undefined,
  }

  return (
    <section className="space-y-6">
      <button
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/70 transition hover:bg-white/12"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft className="h-4 w-4" /> Volver al mapa
      </button>

      <Card variant="glass" padding="md" radius="lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
              <Sparkles className="h-3.5 w-3.5" /> Forms component
            </div>
            <Card.Title as="h2" className="text-3xl">Input Field</Card.Title>
            <Card.Description className="max-w-2xl">
              Campo de formulario accesible con label opcional, variante filled/standard, icono único posicionable y estados semánticos.
            </Card.Description>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">Optional label</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">A11y</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">No affixes</span>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl">
          <div className="mb-5">
            <h3 className="text-xl font-semibold text-white">Preview interactiva</h3>
            <p className="mt-1 text-sm text-white/45">Cambia props y comprueba estados reales del input.</p>
          </div>

          <div className="grid min-h-72 place-items-center rounded-3xl border border-white/10 bg-black/20 p-8">
            <div className="w-full max-w-md">
              <InputField
                ariaLabel="Email"
                disabled={controls.disabled}
                helperText={controls.withHelper ? 'We will only use it for account notifications.' : undefined}
                icon={controls.withIcon ? getIcon(controls.type) : undefined}
                iconPosition={controls.iconPosition}
                id="profile-email"
                label={controls.withLabel ? controls.label || 'Email' : undefined}
                name="email"
                optionalText={controls.optionalText ? 'Optional' : undefined}
                placeholder="name@company.com"
                radius={controls.variant === 'standard' ? undefined : controls.radius}
                required={controls.required}
                size={controls.size}
                type={controls.type}
                variant={controls.variant}
                {...stateProps}
              />
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <h4 className="mb-3 text-sm font-semibold text-white">Variantes</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField id="input-filled" label="Filled" placeholder="Full container field" size="md" radius="lg" variant="filled" />
                <InputField id="input-standard" label="Standard" placeholder="Underline field" size="md" variant="standard" />
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-white">Estados</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <InputField id="input-default" label="Default" placeholder="Type something" size="md" radius="lg" />
                <InputField error="This field is required." id="input-error" label="Error" placeholder="Wrong value" size="md" radius="lg" />
                <InputField success="Available username." id="input-success" label="Success" placeholder="nacho" size="md" radius="lg" />
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-white">Icono único</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField icon={<AtSign />} iconPosition="left" id="input-icon-left" label="Left icon" placeholder="name@company.com" size="md" radius="lg" />
                <InputField icon={<Eye />} iconPosition="right" id="input-icon-right" label="Right icon" placeholder="Password" size="md" radius="lg" type="password" />
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <Card variant="glass" padding="md" radius="lg">
            <h3 className="mb-4 text-base font-semibold text-white">Controles</h3>
            <div className="space-y-5">
              <OptionGroup label="Variant" onChange={(variant) => update({ variant })} options={variants} value={controls.variant} />
              <OptionGroup label="Type" onChange={(type) => update({ type })} options={inputTypes} value={controls.type} />
              <OptionGroup label="Size" onChange={(size) => update({ size })} options={sizes} value={controls.size} />
              {controls.variant !== 'standard' ? <OptionGroup label="Radius" onChange={(radius) => update({ radius })} options={radii} optional value={controls.radius} /> : null}
              <OptionGroup label="State" onChange={(state) => update({ state })} options={states} value={controls.state} />
              {controls.withIcon ? <OptionGroup label="Icon position" onChange={(iconPosition) => update({ iconPosition })} options={iconPositions} value={controls.iconPosition} /> : null}
              <BooleanControlList
                controls={controls}
                items={[
                  ['withLabel', 'Label'],
                  ['required', 'Required'],
                  ['disabled', 'Disabled'],
                  ['withHelper', 'Helper text'],
                  ['optionalText', 'Optional text'],
                  ['withIcon', 'Icon'],
                ]}
                onChange={update}
              />
            </div>
          </Card>

          <Card variant="outline" padding="md" radius="lg">
            <h3 className="mb-3 text-base font-semibold text-white">Código</h3>
            <pre className="overflow-auto rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-xs leading-5 text-white/70"><code>{code}</code></pre>
          </Card>
        </aside>
      </div>
    </section>
  )
}
