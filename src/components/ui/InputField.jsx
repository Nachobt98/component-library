import PropTypes from 'prop-types'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import './InputField.css'

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function InputField({
  id,
  label,
  ariaLabel,
  name,
  type = 'text',
  value,
  defaultValue,
  placeholder,
  onChange,
  variant = 'filled',
  size = 'md',
  radius,
  disabled = false,
  required = false,
  optionalText,
  helperText,
  error,
  success,
  icon,
  iconPosition = 'left',
  className,
  inputClassName,
  ...props
}) {
  const fieldId = id ?? name
  const hasError = Boolean(error)
  const hasSuccess = Boolean(success) && !hasError
  const message = error || success || helperText
  const messageId = message && fieldId ? `${fieldId}-message` : undefined
  const shouldShowLeftIcon = icon && iconPosition === 'left'
  const shouldShowRightIcon = icon && iconPosition === 'right'

  return (
    <div className={cx('cl-input-field', className)}>
      {label ? (
        <div className="cl-input-field__label-row">
          <label className="cl-input-field__label" htmlFor={fieldId}>
            {label} {required ? <span className="cl-input-field__required">*</span> : null}
          </label>
          {!required && optionalText ? <span className="cl-input-field__optional">{optionalText}</span> : null}
        </div>
      ) : null}

      <div
        className={cx(
          'cl-input-field__control',
          `cl-input-field__control--${variant}`,
          `cl-input-field__control--${size}`,
          radius && `cl-input-field__control--radius-${radius}`,
          disabled && 'cl-input-field__control--disabled',
          hasError && 'cl-input-field__control--invalid',
          hasSuccess && 'cl-input-field__control--success',
        )}
      >
        {shouldShowLeftIcon ? <span className="cl-input-field__icon">{icon}</span> : null}
        <input
          aria-describedby={messageId}
          aria-invalid={hasError || undefined}
          aria-label={!label ? ariaLabel ?? placeholder : undefined}
          className={cx('cl-input-field__input', `cl-input-field__input--${size}`, inputClassName)}
          defaultValue={defaultValue}
          disabled={disabled}
          id={fieldId}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
          {...props}
        />
        {shouldShowRightIcon ? <span className="cl-input-field__icon">{icon}</span> : null}
      </div>

      {message ? (
        <p
          className={cx(
            'cl-input-field__message-row',
            hasError && 'cl-input-field__message-row--error',
            hasSuccess && 'cl-input-field__message-row--success',
          )}
          id={messageId}
        >
          {hasError ? <AlertCircle aria-hidden="true" className="cl-input-field__message-icon" /> : null}
          {hasSuccess ? <CheckCircle2 aria-hidden="true" className="cl-input-field__message-icon" /> : null}
          <span>{message}</span>
        </p>
      ) : null}
    </div>
  )
}

InputField.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  error: PropTypes.node,
  helperText: PropTypes.node,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  id: PropTypes.string,
  inputClassName: PropTypes.string,
  label: PropTypes.node,
  name: PropTypes.string,
  onChange: PropTypes.func,
  optionalText: PropTypes.node,
  placeholder: PropTypes.string,
  radius: PropTypes.oneOf(['sm', 'md', 'lg', 'full']),
  required: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  success: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf(['filled', 'standard']),
}
