import PropTypes from 'prop-types'
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

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  glow: PropTypes.bool,
  leftIcon: PropTypes.node,
  loading: PropTypes.bool,
  palette: PropTypes.object,
  radius: PropTypes.oneOf(['sm', 'md', 'lg', 'full']),
  rightIcon: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'soft', 'danger', 'link']),
}
