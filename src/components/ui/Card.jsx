import './Card.css'

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
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
  void palette

  return (
    <Element
      className={cx(
        'cl-card',
        `cl-card--${variant}`,
        `cl-card--padding-${padding}`,
        radius && `cl-card--radius-${radius}`,
        hoverable && 'cl-card--hoverable',
        selected && 'cl-card--selected',
        disabled && 'cl-card--disabled',
        glow && 'cl-card--glow',
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  )
}

function Header({ children, className, ...props }) {
  return (
    <div className={cx('cl-card__header', className)} {...props}>
      {children}
    </div>
  )
}

function Title({ as: Element = 'h3', children, className, ...props }) {
  return (
    <Element className={cx('cl-card__title', className)} {...props}>
      {children}
    </Element>
  )
}

function Description({ children, className, ...props }) {
  return (
    <p className={cx('cl-card__description', className)} {...props}>
      {children}
    </p>
  )
}

function Content({ children, className, ...props }) {
  return (
    <div className={cx('cl-card__content', className)} {...props}>
      {children}
    </div>
  )
}

function Footer({ children, className, ...props }) {
  return (
    <div className={cx('cl-card__footer', className)} {...props}>
      {children}
    </div>
  )
}

function Actions({ children, align = 'end', className, ...props }) {
  return (
    <div className={cx('cl-card__actions', `cl-card__actions--${align}`, className)} {...props}>
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
