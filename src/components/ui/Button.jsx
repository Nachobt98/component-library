import { Loader2 } from 'lucide-react'
import './Button.css'

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  radius,
  glow = false,
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
  void palette
  const isDisabled = disabled || loading

  return (
    <button
      className={cx(
        'cl-button',
        `cl-button--${variant}`,
        `cl-button--${size}`,
        radius && `cl-button--radius-${radius}`,
        fullWidth && 'cl-button--full-width',
        glow && 'cl-button--glow',
        className,
      )}
      disabled={isDisabled}
      type={type}
      {...props}
    >
      {loading ? <Loader2 aria-hidden="true" className="cl-button__icon cl-button__spinner" /> : leftIcon}
      <span>{children}</span>
      {!loading && rightIcon}
    </button>
  )
}
