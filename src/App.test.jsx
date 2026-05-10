import { render, screen, waitFor } from '@testing-library/react'
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

    const searchInput = screen.getByPlaceholderText(/buscar componente/i)
    await user.clear(searchInput)
    await user.type(searchInput, 'Button')

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Button' })).toBeInTheDocument()
      expect(screen.queryByRole('heading', { name: 'Card' })).not.toBeInTheDocument()
    })
  })

  it('changes palette when selecting Atlas Emerald', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /Atlas Emerald/i }))

    expect(screen.getByText('#10B981')).toBeInTheDocument()
  })

  it('shows the new Arctic Blue palette', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /Arctic Blue/i }))

    expect(screen.getByText('#3B82F6')).toBeInTheDocument()
  })

  it('opens the Button playground from the component map', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'All' }))
    await user.click(screen.getByRole('button', { name: 'View Button' }))

    expect(screen.getByRole('heading', { name: 'Button' })).toBeInTheDocument()
    expect(screen.getByText(/Preview interactiva/i)).toBeInTheDocument()
    expect(screen.getByText(/Variant/i)).toBeInTheDocument()
  })

  it('updates Button playground controls', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'All' }))
    await user.click(screen.getByRole('button', { name: 'View Button' }))
    await user.click(screen.getByRole('button', { name: 'danger' }))
    await user.click(screen.getByLabelText('Loading'))

    expect(screen.getByText(/variant="danger"/i)).toBeInTheDocument()
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })
})
