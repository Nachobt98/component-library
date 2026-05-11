import { ArrowLeft, AtSign, Eye, Lock, Search, Sparkles, User } from 'lucide-react'
import { Card } from '../ui/Card'
import { InputField } from '../ui/InputField'
import { BooleanControlList, OptionGroup } from './PlaygroundControls'

const sizes = ['sm', 'md', 'lg']
const radii = ['sm', 'md', 'lg', 'full']
const states = ['default', 'error', 'success']
const inputTypes = ['text', 'email', 'password', 'search']

function buildCode(controls) {
  const props = [
    'id="profile-email"',
    'name="email"',
    `type="${controls.type}"`,
    `label="${controls.label || 'Email'}"`,
    `size="${controls.size}"`,
  ]

  if (controls.radius) props.push(`radius="${controls.radius}"`)
  if (controls.required) props.push('required')
  if (controls.disabled) props.push('disabled')
  if (controls.withHelper) props.push('helperText="We will only use it for account notifications."')
  if (controls.state === 'error') props.push('error="Enter a valid email address."')
  if (controls.state === 'success') props.push('success="Looks good."')
  if (controls.withPrefix) props.push('prefix="@"')
  if (controls.withSuffix) props.push('suffix=".com"')
  if (controls.withLeftIcon) props.push('leftIcon={<AtSign />}')
  if (controls.withRightIcon) props.push('rightIcon={<Eye />}')

  return `<InputField\n  ${props.join('\n  ')}\n  placeholder="name@company.com"\n/>`
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
              Campo de formulario accesible con label obligatorio, tamaño explícito, estados semánticos, helper text, icon slots y affixes.
            </Card.Description>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">Label required</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">A11y</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">No inline CSS</span>
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
                disabled={controls.disabled}
                helperText={controls.withHelper ? 'We will only use it for account notifications.' : undefined}
                id="profile-email"
                label={controls.label || 'Email'}
                leftIcon={controls.withLeftIcon ? getIcon(controls.type) : undefined}
                name="email"
                optionalText={controls.optionalText ? 'Optional' : undefined}
                placeholder="name@company.com"
                prefix={controls.withPrefix ? '@' : undefined}
                radius={controls.radius}
                required={controls.required}
                rightIcon={controls.withRightIcon ? <Eye /> : undefined}
                size={controls.size}
                suffix={controls.withSuffix ? '.com' : undefined}
                type={controls.type}
                {...stateProps}
              />
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <h4 className="mb-3 text-sm font-semibold text-white">Estados</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <InputField id="input-default" label="Default" placeholder="Type something" size="md" radius="lg" />
                <InputField error="This field is required." id="input-error" label="Error" placeholder="Wrong value" size="md" radius="lg" />
                <InputField success="Available username." id="input-success" label="Success" placeholder="nacho" size="md" radius="lg" />
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-white">Slots</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField id="input-icons" label="With icons" leftIcon={<AtSign />} placeholder="name@company.com" rightIcon={<Eye />} size="md" radius="lg" />
                <InputField id="input-affixes" label="With affixes" placeholder="username" prefix="@" suffix=".com" size="md" radius="lg" />
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <Card variant="glass" padding="md" radius="lg">
            <h3 className="mb-4 text-base font-semibold text-white">Controles</h3>
            <div className="space-y-5">
              <OptionGroup label="Type" onChange={(type) => update({ type })} options={inputTypes} value={controls.type} />
              <OptionGroup label="Size" onChange={(size) => update({ size })} options={sizes} value={controls.size} />
              <OptionGroup label="Radius" onChange={(radius) => update({ radius })} options={radii} optional value={controls.radius} />
              <OptionGroup label="State" onChange={(state) => update({ state })} options={states} value={controls.state} />
              <BooleanControlList
                controls={controls}
                items={[
                  ['required', 'Required'],
                  ['disabled', 'Disabled'],
                  ['withHelper', 'Helper text'],
                  ['optionalText', 'Optional text'],
                  ['withLeftIcon', 'Left icon'],
                  ['withRightIcon', 'Right icon'],
                  ['withPrefix', 'Prefix'],
                  ['withSuffix', 'Suffix'],
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
