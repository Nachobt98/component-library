import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App dashboard', () => {
  it('renders the component library dashboard heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /componentes customizables con estética seria/i,
      }),
    ).toBeInTheDocument()
  })

  it('filters component cards by query', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'All' }))
    await user.type(screen.getByPlaceholderText(/buscar componente/i), 'Button')

    expect(screen.getByRole('heading', { name: 'Button' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Card' })).not.toBeInTheDocument()
  })

  it('changes palette when selecting Atlas Emerald', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /Atlas Emerald/i }))

    expect(screen.getByText('#10B981')).toBeInTheDocument()
  })
})
