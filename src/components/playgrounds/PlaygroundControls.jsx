function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function OptionGroup({ label, value, options, onChange, optional = false }) {
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

export function BooleanControlList({ controls, items, onChange }) {
  return (
    <div className="space-y-2">
      {items.map(([key, label]) => (
        <label key={key} className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/8 bg-white/[0.035] px-3 py-2 text-sm text-white/65">
          {label}
          <input checked={Boolean(controls[key])} onChange={(event) => onChange({ [key]: event.target.checked })} type="checkbox" />
        </label>
      ))}
    </div>
  )
}
