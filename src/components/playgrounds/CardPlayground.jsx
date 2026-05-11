import { ArrowLeft, BadgeCheck, Boxes, ExternalLink, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { BooleanControlList, OptionGroup } from './PlaygroundControls'

const variants = ['solid', 'glass', 'outline', 'elevated']
const paddings = ['none', 'sm', 'md', 'lg']
const radii = ['sm', 'md', 'lg', 'xl', 'full']
const actionAlignments = ['start', 'center', 'end', 'between']

function buildCode(controls) {
  const props = [`variant="${controls.variant}"`, `padding="${controls.padding}"`]

  if (controls.radius) props.push(`radius="${controls.radius}"`)
  if (controls.hoverable) props.push('hoverable')
  if (controls.selected) props.push('selected')
  if (controls.disabled) props.push('disabled')
  if (controls.glow) props.push('glow')

  const header = controls.withHeader
    ? `\n  <Card.Header>\n    <div>\n      <Card.Title>Component status</Card.Title>\n      <Card.Description>Reusable card composed with semantic slots.</Card.Description>\n    </div>\n  </Card.Header>`
    : ''

  const footer = controls.withFooter
    ? `\n  <Card.Footer>\n    <Card.Actions align="${controls.actionAlign}">\n      <Button variant="secondary" size="md">Cancel</Button>\n      <Button variant="primary" size="md">Open</Button>\n    </Card.Actions>\n  </Card.Footer>`
    : ''

  return `<Card ${props.join(' ')}>${header}\n  <Card.Content>\n    Your content goes here.\n  </Card.Content>${footer}\n</Card>`
}

export function CardPlayground({ palette, controls, onControlsChange, onBack }) {
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

      <Card variant="glass" padding="md" radius="lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
              <Sparkles className="h-3.5 w-3.5" /> Core component
            </div>
            <Card.Title as="h2" className="text-3xl">Card</Card.Title>
            <Card.Description className="max-w-2xl">
              Contenedor de superficie para agrupar contenido. `children`, `variant` y `padding` se tratan como props obligatorias en el playground; `radius`, estados y composición son opcionales.
            </Card.Description>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">Composable</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">Slots</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">Surface primitive</span>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl">
          <div className="mb-5">
            <h3 className="text-xl font-semibold text-white">Preview interactiva</h3>
            <p className="mt-1 text-sm text-white/45">Cambia props y observa cómo se comporta la superficie real.</p>
          </div>

          <div className="grid min-h-72 place-items-center rounded-3xl border border-white/10 bg-black/20 p-8">
            <Card
              disabled={controls.disabled}
              glow={controls.glow}
              hoverable={controls.hoverable}
              padding={controls.padding}
              palette={palette}
              radius={controls.radius}
              selected={controls.selected}
              variant={controls.variant}
              className="w-full max-w-md"
            >
              {controls.withHeader ? (
                <Card.Header>
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: `${palette.primary}22`, color: palette.primary }}>
                      <Boxes className="h-5 w-5" />
                    </div>
                    <div>
                      <Card.Title>Component status</Card.Title>
                      <Card.Description>Reusable card composed with semantic slots.</Card.Description>
                    </div>
                  </div>
                  <BadgeCheck className="h-5 w-5" style={{ color: palette.accent }} />
                </Card.Header>
              ) : null}

              <Card.Content>
                <div className="space-y-3">
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 w-3/4 rounded-full" style={{ background: palette.primary }} />
                  </div>
                  <p>
                    A card should provide structure without becoming a prison. Header, content and footer are composable slots.
                  </p>
                </div>
              </Card.Content>

              {controls.withFooter ? (
                <Card.Footer>
                  <Card.Actions align={controls.actionAlign}>
                    <Button palette={palette} size="md" variant="secondary">Cancel</Button>
                    <Button palette={palette} size="md" variant="primary" rightIcon={<ExternalLink className="h-4 w-4" />}>Open</Button>
                  </Card.Actions>
                </Card.Footer>
              ) : null}
            </Card>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <h4 className="mb-3 text-sm font-semibold text-white">Variantes</h4>
              <div className="grid gap-3 md:grid-cols-2">
                {variants.map((variant) => (
                  <Card key={variant} padding="md" radius="lg" variant={variant}>
                    <Card.Title className="capitalize">{variant}</Card.Title>
                    <Card.Description>Surface style for {variant} cards.</Card.Description>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-white">Estados</h4>
              <div className="grid gap-3 md:grid-cols-2">
                <Card hoverable padding="md" radius="lg" variant="solid"><Card.Title>Hoverable</Card.Title></Card>
                <Card selected padding="md" radius="lg" variant="solid"><Card.Title>Selected</Card.Title></Card>
                <Card disabled padding="md" radius="lg" variant="solid"><Card.Title>Disabled</Card.Title></Card>
                <Card glow palette={palette} padding="md" radius="lg" variant="solid"><Card.Title>Glow</Card.Title></Card>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <Card variant="glass" padding="md" radius="lg">
            <h3 className="mb-4 text-base font-semibold text-white">Controles</h3>
            <div className="space-y-5">
              <OptionGroup label="Variant" onChange={(variant) => update({ variant })} options={variants} value={controls.variant} />
              <OptionGroup label="Padding" onChange={(padding) => update({ padding })} options={paddings} value={controls.padding} />
              <OptionGroup label="Radius" onChange={(radius) => update({ radius })} options={radii} optional value={controls.radius} />
              <OptionGroup label="Actions align" onChange={(actionAlign) => update({ actionAlign })} options={actionAlignments} value={controls.actionAlign} />
              <BooleanControlList
                controls={controls}
                items={[
                  ['hoverable', 'Hoverable'],
                  ['selected', 'Selected'],
                  ['disabled', 'Disabled'],
                  ['glow', 'Glow'],
                  ['withHeader', 'Header'],
                  ['withFooter', 'Footer/actions'],
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
