import { Loader2 } from 'lucide-react'

const sizeStyles = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
  xl: 'h-14 px-6 text-base',
}

const radiusStyles = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: 'rounded-full',
}

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

function getVariantStyles(variant, palette) {
  const primary = palette?.primary ?? '#F9736B'
  const secondary = palette?.secondary ?? '#8B5CF6'

  const styles = {
    primary: {
      className: 'border-transparent text-white shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:hover:translate-y-0',
      style: {
        background: primary,
        boxShadow: `0 18px 40px ${primary}35`,
      },
    },
    secondary: {
      className: 'border-white/12 bg-white/10 text-white hover:bg-white/15 active:bg-white/12',
      style: {},
    },
    outline: {
      className: 'border-white/18 bg-transparent text-white hover:bg-white/10 active:bg-white/12',
      style: {},
    },
    ghost: {
      className: 'border-transparent bg-transparent text-white/75 hover:bg-white/10 hover:text-white active:bg-white/12',
      style: {},
    },
    soft: {
      className: 'border-transparent text-white hover:-translate-y-0.5 active:translate-y-0 disabled:hover:translate-y-0',
      style: {
        background: `${secondary}26`,
        boxShadow: `inset 0 0 0 1px ${secondary}30`,
      },
    },
    danger: {
      className: 'border-rose-400/20 bg-rose-500/15 text-rose-100 hover:bg-rose-500/22 active:bg-rose-500/25',
      style: {},
    },
    link: {
      className: 'h-auto border-transparent bg-transparent px-0 text-white underline-offset-4 hover:underline',
      style: { color: primary },
    },
  }

  return styles[variant] ?? styles.primary
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  radius = 'lg',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  palette,
  className,
  type = 'button',
  ...props
}) {
  const variantStyles = getVariantStyles(variant, palette)
  const isDisabled = disabled || loading

  return (
    <button
      className={cx(
        'inline-flex items-center justify-center gap-2 border font-semibold transition duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
        'disabled:pointer-events-none disabled:opacity-50',
        sizeStyles[size],
        radiusStyles[radius],
        fullWidth && 'w-full',
        variantStyles.className,
        className,
      )}
      style={variantStyles.style}
      disabled={isDisabled}
      type={type}
      {...props}
    >
      {loading ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : leftIcon}
      <span>{children}</span>
      {!loading && rightIcon}
    </button>
  )
}
