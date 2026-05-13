import PropTypes from 'prop-types'
import { ArrowLeft, Download, MoreHorizontal, Plus, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { DataTable } from '../ui/DataTable'
import { BooleanControlList, OptionGroup } from './PlaygroundControls'

const densities = ['compact', 'normal', 'comfortable']
const radii = ['sm', 'md', 'lg']

const rows = [
  { id: 'CMP-101', name: 'Button', owner: 'Core team', status: 'ready', usage: 94, updated: '2026-05-08' },
  { id: 'CMP-102', name: 'Card', owner: 'Core team', status: 'ready', usage: 91, updated: '2026-05-09' },
  { id: 'CMP-103', name: 'Input Field', owner: 'Forms team', status: 'ready', usage: 88, updated: '2026-05-11' },
  { id: 'CMP-104', name: 'Select', owner: 'Forms team', status: 'planned', usage: 76, updated: '2026-05-12' },
  { id: 'CMP-105', name: 'DataTable', owner: 'Data team', status: 'draft', usage: 82, updated: '2026-05-13' },
  { id: 'CMP-106', name: 'Tabs', owner: 'Navigation', status: 'planned', usage: 70, updated: '2026-05-14' },
  { id: 'CMP-107', name: 'Command Palette', owner: 'Special', status: 'draft', usage: 67, updated: '2026-05-15' },
]

function StatusBadge({ value }) {
  const tone = value === 'ready' ? 'success' : value === 'draft' ? 'warning' : 'danger'
  return <span className={`cl-data-table__badge cl-data-table__badge--${tone}`}>{value}</span>
}

StatusBadge.propTypes = {
  value: PropTypes.string.isRequired,
}

const columns = [
  { key: 'name', header: 'Component', accessor: 'name' },
  { key: 'owner', header: 'Owner', accessor: 'owner' },
  { key: 'status', header: 'Status', accessor: 'status', cell: (_row, value) => <StatusBadge value={value} /> },
  { key: 'usage', header: 'Usage', accessor: 'usage', align: 'right', cell: (_row, value) => `${value}%` },
  { key: 'updated', header: 'Updated', accessor: 'updated' },
  { key: 'actions', header: '', accessor: 'id', sortable: false, searchable: false, align: 'right', cell: () => <button aria-label="Row actions" className="cl-data-table__page-button" type="button"><MoreHorizontal size={16} /></button> },
]

function buildCode(controls) {
  const props = ['columns={columns}', 'data={rows}', 'rowKey="id"']
  if (controls.searchable) props.push('searchable')
  if (controls.sortable) props.push('sortable')
  if (controls.selectable) props.push('selectable')
  if (controls.paginated) props.push('paginated')
  if (controls.loading) props.push('loading')
  props.push(`density="${controls.density}"`)
  props.push(`radius="${controls.radius}"`)
  props.push('pageSize={5}')

  return `<DataTable\n  ${props.join('\n  ')}\n  title="Component inventory"\n  description="Sortable, searchable and selectable table."\n/>`
}

export function DataTablePlayground({ controls, onControlsChange, onBack }) {
  const update = (partial) => onControlsChange({ ...controls, ...partial })
  const code = buildCode(controls)

  return (
    <section className="space-y-6">
      <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/70 transition hover:bg-white/12" onClick={onBack} type="button">
        <ArrowLeft className="h-4 w-4" /> Volver al mapa
      </button>

      <Card variant="glass" padding="md" radius="lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70"><Sparkles className="h-3.5 w-3.5" /> Data component</div>
            <Card.Title as="h2" className="text-3xl">DataTable</Card.Title>
            <Card.Description className="max-w-2xl">Tabla básica con búsqueda, ordenación, selección, paginación, densidades, empty state y loading skeleton.</Card.Description>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">Search</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">Sort</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">Pagination</span>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl">
          <div className="mb-5">
            <h3 className="text-xl font-semibold text-white">Preview interactiva</h3>
            <p className="mt-1 text-sm text-white/45">Prueba búsqueda, ordenación, selección y paginación en el componente real.</p>
          </div>
          <DataTable
            actions={<><Button leftIcon={<Plus />} size="sm" variant="primary">Add</Button><Button leftIcon={<Download />} size="sm" variant="secondary">Export</Button></>}
            columns={columns}
            data={rows}
            density={controls.density}
            description="Sortable, searchable and selectable table."
            loading={controls.loading}
            pageSize={5}
            paginated={controls.paginated}
            radius={controls.radius}
            rowKey="id"
            searchable={controls.searchable}
            selectable={controls.selectable}
            sortable={controls.sortable}
            title="Component inventory"
          />
        </div>

        <aside className="space-y-4">
          <Card variant="glass" padding="md" radius="lg">
            <h3 className="mb-4 text-base font-semibold text-white">Controles</h3>
            <div className="space-y-5">
              <OptionGroup label="Density" onChange={(density) => update({ density })} options={densities} value={controls.density} />
              <OptionGroup label="Radius" onChange={(radius) => update({ radius })} options={radii} value={controls.radius} />
              <BooleanControlList
                controls={controls}
                items={[
                  ['searchable', 'Searchable'],
                  ['sortable', 'Sortable'],
                  ['selectable', 'Selectable'],
                  ['paginated', 'Paginated'],
                  ['loading', 'Loading'],
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

DataTablePlayground.propTypes = {
  controls: PropTypes.shape({
    density: PropTypes.oneOf(densities).isRequired,
    loading: PropTypes.bool.isRequired,
    paginated: PropTypes.bool.isRequired,
    radius: PropTypes.oneOf(radii).isRequired,
    searchable: PropTypes.bool.isRequired,
    selectable: PropTypes.bool.isRequired,
    sortable: PropTypes.bool.isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onControlsChange: PropTypes.func.isRequired,
}
