import PropTypes from 'prop-types'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, ChevronUp, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { InputField } from './InputField'
import './DataTable.css'

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

function getValue(row, column) {
  return typeof column.accessor === 'function' ? column.accessor(row) : row[column.accessor]
}

function getRowKey(row, rowKey) {
  return String(typeof rowKey === 'function' ? rowKey(row) : row[rowKey])
}

function getAriaSort(direction) {
  if (direction === 'asc') return 'ascending'
  if (direction === 'desc') return 'descending'
  return 'none'
}

function sortRows(rows, columns, sortState) {
  if (!sortState.key || !sortState.direction) return rows
  const column = columns.find((item) => item.key === sortState.key)
  if (!column) return rows

  const sorted = [...rows].sort((firstRow, secondRow) => {
    if (column.sortFn) return column.sortFn(firstRow, secondRow)

    const first = String(getValue(firstRow, column) ?? '').toLowerCase()
    const second = String(getValue(secondRow, column) ?? '').toLowerCase()
    return first.localeCompare(second, undefined, { numeric: true })
  })

  return sortState.direction === 'desc' ? sorted.reverse() : sorted
}

function filterRows(rows, columns, query) {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return rows

  return rows.filter((row) => columns.some((column) => {
    if (column.searchable === false) return false
    return String(getValue(row, column) ?? '').toLowerCase().includes(normalizedQuery)
  }))
}

function getSelectedRows(data, rowKey, selectedKeys) {
  return data.filter((row) => selectedKeys.includes(getRowKey(row, rowKey)))
}

function SortIcon({ direction }) {
  if (direction === 'asc') return <ChevronUp aria-hidden="true" className="cl-data-table__sort-icon" />
  if (direction === 'desc') return <ChevronDown aria-hidden="true" className="cl-data-table__sort-icon" />
  return <ChevronsUpDown aria-hidden="true" className="cl-data-table__sort-icon" />
}

SortIcon.propTypes = {
  direction: PropTypes.oneOf(['asc', 'desc']),
}

function LoadingRows({ columns, density, selectable }) {
  return Array.from({ length: 5 }).map((_, rowIndex) => (
    <tr className="cl-data-table__row" key={`loading-${rowIndex}`}>
      {selectable ? <td className={cx('cl-data-table__cell cl-data-table__selection-cell', `cl-data-table__cell--${density}`)}><span className="cl-data-table__skeleton-line" /></td> : null}
      {columns.map((column) => (
        <td className={cx('cl-data-table__cell', `cl-data-table__cell--${density}`, column.sticky && `cl-data-table__cell--sticky-${column.sticky}`)} key={column.key}>
          <div className="cl-data-table__skeleton-line" />
        </td>
      ))}
    </tr>
  ))
}

LoadingRows.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  density: PropTypes.oneOf(['compact', 'normal', 'comfortable']).isRequired,
  selectable: PropTypes.bool.isRequired,
}

export function DataTable({
  title,
  description,
  columns,
  data,
  rowKey = 'id',
  searchable = true,
  searchPlaceholder = 'Search...',
  sortable = true,
  selectable = false,
  paginated = true,
  pageSize = 5,
  density = 'normal',
  radius = 'lg',
  loading = false,
  emptyTitle = 'No results found',
  emptyDescription = 'Try changing the search query or filters.',
  filteredEmptyTitle = 'No matching results',
  filteredEmptyDescription = 'Try a different search term or clear the current query.',
  actions,
  onRowClick,
  onSelectionChange,
  className,
}) {
  const [query, setQuery] = useState('')
  const [sortState, setSortState] = useState({ key: undefined, direction: undefined })
  const [page, setPage] = useState(1)
  const [selectedKeys, setSelectedKeys] = useState([])

  const filteredRows = useMemo(() => filterRows(data, columns, query), [columns, data, query])
  const processedRows = useMemo(() => sortRows(filteredRows, columns, sortState), [columns, filteredRows, sortState])
  const totalPages = paginated ? Math.max(1, Math.ceil(processedRows.length / pageSize)) : 1
  const safePage = Math.min(page, totalPages)
  const visibleRows = paginated ? processedRows.slice((safePage - 1) * pageSize, safePage * pageSize) : processedRows
  const visibleKeys = visibleRows.map((row) => getRowKey(row, rowKey))
  const allVisibleSelected = visibleKeys.length > 0 && visibleKeys.every((key) => selectedKeys.includes(key))
  const hasActiveSearch = query.trim().length > 0
  const isFilteredEmpty = hasActiveSearch && data.length > 0 && processedRows.length === 0
  const currentEmptyTitle = isFilteredEmpty ? filteredEmptyTitle : emptyTitle
  const currentEmptyDescription = isFilteredEmpty ? filteredEmptyDescription : emptyDescription

  function updateSelection(nextKeys) {
    setSelectedKeys(nextKeys)
    onSelectionChange?.(nextKeys, getSelectedRows(data, rowKey, nextKeys))
  }

  function handleSort(column) {
    if (!sortable || column.sortable === false) return
    setSortState((current) => {
      if (current.key !== column.key) return { key: column.key, direction: 'asc' }
      if (current.direction === 'asc') return { key: column.key, direction: 'desc' }
      return { key: undefined, direction: undefined }
    })
  }

  function handleRowClick(row, event) {
    if (!onRowClick) return
    if (event.target.closest('button, a, input, select, textarea')) return
    onRowClick(row)
  }

  function toggleRow(key) {
    const nextKeys = selectedKeys.includes(key) ? selectedKeys.filter((item) => item !== key) : [...selectedKeys, key]
    updateSelection(nextKeys)
  }

  function toggleVisibleRows() {
    if (allVisibleSelected) {
      updateSelection(selectedKeys.filter((key) => !visibleKeys.includes(key)))
      return
    }

    updateSelection(Array.from(new Set([...selectedKeys, ...visibleKeys])))
  }

  function updateQuery(value) {
    setQuery(value)
    setPage(1)
  }

  return (
    <section className={cx('cl-data-table', className)}>
      {(title || description || searchable || actions) ? (
        <div className="cl-data-table__toolbar">
          <div className="cl-data-table__title-group">
            {title ? <h3 className="cl-data-table__title">{title}</h3> : null}
            {description ? <p className="cl-data-table__description">{description}</p> : null}
          </div>
          <div className="cl-data-table__actions">
            {searchable ? <InputField ariaLabel={searchPlaceholder} className="cl-data-table__search" icon={<Search />} name="table-search" onChange={(event) => updateQuery(event.target.value)} placeholder={searchPlaceholder} radius="lg" size="sm" value={query} /> : null}
            {actions}
          </div>
        </div>
      ) : null}

      <div className={cx('cl-data-table__viewport', `cl-data-table__viewport--radius-${radius}`)}>
        <table className="cl-data-table__table">
          <thead className="cl-data-table__head">
            <tr>
              {selectable ? <th className="cl-data-table__header-cell cl-data-table__selection-cell cl-data-table__header-cell--sticky-left" scope="col"><input aria-label="Select visible rows" checked={allVisibleSelected} className="cl-data-table__checkbox" onChange={toggleVisibleRows} type="checkbox" /></th> : null}
              {columns.map((column) => {
                const direction = sortState.key === column.key ? sortState.direction : undefined
                const isSortable = sortable && column.sortable !== false
                return (
                  <th
                    aria-sort={isSortable ? getAriaSort(direction) : undefined}
                    className={cx(
                      'cl-data-table__header-cell',
                      column.align && `cl-data-table__header-cell--align-${column.align}`,
                      column.sticky && `cl-data-table__header-cell--sticky-${column.sticky}`,
                    )}
                    key={column.key}
                    scope="col"
                  >
                    {isSortable ? <button className="cl-data-table__sort-button" onClick={() => handleSort(column)} type="button">{column.header}<SortIcon direction={direction} /></button> : column.header}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? <LoadingRows columns={columns} density={density} selectable={selectable} /> : null}
            {!loading && visibleRows.map((row) => {
              const key = getRowKey(row, rowKey)
              const isSelected = selectedKeys.includes(key)
              return (
                <tr className={cx('cl-data-table__row', isSelected && 'cl-data-table__row--selected', onRowClick && 'cl-data-table__row--clickable')} key={key} onClick={(event) => handleRowClick(row, event)}>
                  {selectable ? <td className={cx('cl-data-table__cell cl-data-table__selection-cell cl-data-table__cell--sticky-left', `cl-data-table__cell--${density}`)}><input aria-label={`Select row ${key}`} checked={isSelected} className="cl-data-table__checkbox" onChange={() => toggleRow(key)} type="checkbox" /></td> : null}
                  {columns.map((column) => {
                    const value = getValue(row, column)
                    return (
                      <td
                        className={cx(
                          'cl-data-table__cell',
                          `cl-data-table__cell--${density}`,
                          column.align && `cl-data-table__cell--align-${column.align}`,
                          column.sticky && `cl-data-table__cell--sticky-${column.sticky}`,
                        )}
                        key={`${key}-${column.key}`}
                      >
                        {column.cell ? column.cell(row, value) : value}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            {!loading && visibleRows.length === 0 ? <tr><td colSpan={columns.length + (selectable ? 1 : 0)}><div className="cl-data-table__empty"><div><p className="cl-data-table__empty-title">{currentEmptyTitle}</p><p className="cl-data-table__empty-description">{currentEmptyDescription}</p></div></div></td></tr> : null}
          </tbody>
        </table>
      </div>

      <div className="cl-data-table__footer">
        <span>{processedRows.length} result{processedRows.length === 1 ? '' : 's'} · {selectedKeys.length} selected</span>
        {paginated ? <div className="cl-data-table__pagination"><button aria-label="Previous page" className="cl-data-table__page-button" disabled={safePage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button"><ChevronLeft aria-hidden="true" size={16} /></button>{Array.from({ length: totalPages }).map((_, index) => <button aria-label={`Page ${index + 1}`} className={cx('cl-data-table__page-button', safePage === index + 1 && 'cl-data-table__page-button--active')} key={index + 1} onClick={() => setPage(index + 1)} type="button">{index + 1}</button>)}<button aria-label="Next page" className="cl-data-table__page-button" disabled={safePage === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} type="button"><ChevronRight aria-hidden="true" size={16} /></button></div> : null}
      </div>
    </section>
  )
}

const columnShape = PropTypes.shape({
  accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  cell: PropTypes.func,
  header: PropTypes.node.isRequired,
  key: PropTypes.string.isRequired,
  searchable: PropTypes.bool,
  sortable: PropTypes.bool,
  sortFn: PropTypes.func,
  sticky: PropTypes.oneOf(['left', 'right']),
})

DataTable.propTypes = {
  actions: PropTypes.node,
  className: PropTypes.string,
  columns: PropTypes.arrayOf(columnShape).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  density: PropTypes.oneOf(['compact', 'normal', 'comfortable']),
  description: PropTypes.node,
  emptyDescription: PropTypes.node,
  emptyTitle: PropTypes.node,
  filteredEmptyDescription: PropTypes.node,
  filteredEmptyTitle: PropTypes.node,
  loading: PropTypes.bool,
  onRowClick: PropTypes.func,
  onSelectionChange: PropTypes.func,
  pageSize: PropTypes.number,
  paginated: PropTypes.bool,
  radius: PropTypes.oneOf(['sm', 'md', 'lg']),
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  searchable: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  selectable: PropTypes.bool,
  sortable: PropTypes.bool,
  title: PropTypes.node,
}
