const variantStyles = {
  solid: 'border-white/10 bg-white/[0.06]',
  glass: 'border-white/15 bg-white/[0.09] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]',
  outline: 'border-white/20 bg-transparent',
  elevated: 'border-white/14 bg-slate-950/70 shadow-[0_24px_80px_rgba(0,0,0,0.45)]',
}

const paddingStyles = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
}

const radiusStyles = {
  sm: 'rounded-xl',
  md: 'rounded-2xl',
  lg: 'rounded-3xl',
  xl: 'rounded-[2rem]',
  full: 'rounded-[2.5rem]',
}

const actionAlignStyles = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
}

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

function getGlowStyle(palette, glow) {
  if (!glow) return undefined

  const primary = palette?.primary ?? '#F9736B'

  return {
    boxShadow: `0 24px 70px ${primary}26`,
  }
}

function Root({
  as: Element = 'div',
  children,
  variant = 'solid',
  padding = 'md',
  radius,
  hoverable = false,
  selected = false,
  disabled = false,
  glow = false,
  palette,
  className,
  ...props
}) {
  return (
    <Element
      className={cx(
        'relative overflow-hidden border text-white',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
        variantStyles[variant],
        paddingStyles[padding],
        radiusStyles[radius],
        hoverable && 'cursor-pointer transition duration-200 ease-out hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.10]',
        selected && 'ring-2 ring-white/45',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
      style={getGlowStyle(palette, glow)}
      {...props}
    >
      {children}
    </Element>
  )
}

function Header({ children, className, ...props }) {
  return (
    <div className={cx('mb-4 flex items-start justify-between gap-4', className)} {...props}>
      {children}
    </div>
  )
}

function Title({ as: Element = 'h3', children, className, ...props }) {
  return (
    <Element className={cx('text-lg font-semibold tracking-tight text-white', className)} {...props}>
      {children}
    </Element>
  )
}

function Description({ children, className, ...props }) {
  return (
    <p className={cx('mt-1 text-sm leading-6 text-white/50', className)} {...props}>
      {children}
    </p>
  )
}

function Content({ children, className, ...props }) {
  return (
    <div className={cx('text-sm text-white/65', className)} {...props}>
      {children}
    </div>
  )
}

function Footer({ children, className, ...props }) {
  return (
    <div className={cx('mt-5 border-t border-white/10 pt-4', className)} {...props}>
      {children}
    </div>
  )
}

function Actions({ children, align = 'end', className, ...props }) {
  return (
    <div className={cx('flex flex-wrap items-center gap-3', actionAlignStyles[align], className)} {...props}>
      {children}
    </div>
  )
}

export const Card = Object.assign(Root, {
  Root,
  Header,
  Title,
  Description,
  Content,
  Footer,
  Actions,
})
