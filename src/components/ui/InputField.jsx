import { AlertCircle, CheckCircle2 } from 'lucide-react'
import './InputField.css'

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function InputField({
  id,
  label,
  name,
  type = 'text',
  value,
  defaultValue,
  placeholder,
  onChange,
  size = 'md',
  radius,
  disabled = false,
  required = false,
  optionalText,
  helperText,
  error,
  success,
  leftIcon,
  rightIcon,
  prefix,
  suffix,
  className,
  inputClassName,
  ...props
}) {
  const fieldId = id ?? name
  const hasError = Boolean(error)
  const hasSuccess = Boolean(success) && !hasError
  const message = error || success || helperText
  const messageId = message && fieldId ? `${fieldId}-message` : undefined

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
          `cl-input-field__control--${size}`,
          radius && `cl-input-field__control--radius-${radius}`,
          disabled && 'cl-input-field__control--disabled',
          hasError && 'cl-input-field__control--invalid',
          hasSuccess && 'cl-input-field__control--success',
        )}
      >
        {leftIcon ? <span className="cl-input-field__icon">{leftIcon}</span> : null}
        {prefix ? <span className="cl-input-field__affix">{prefix}</span> : null}
        <input
          aria-describedby={messageId}
          aria-invalid={hasError || undefined}
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
        {suffix ? <span className="cl-input-field__affix">{suffix}</span> : null}
        {rightIcon ? <span className="cl-input-field__icon">{rightIcon}</span> : null}
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
