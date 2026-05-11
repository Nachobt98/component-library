import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import DashboardApp from './DashboardApp'

describe('Dashboard app', () => {
  it('renders the component library dashboard heading', () => {
    render(<DashboardApp />)

    expect(
      screen.getByRole('heading', {
        name: /componentes customizables con estética seria/i,
      }),
    ).toBeInTheDocument()
  })

  it('filters component cards by query', async () => {
    const user = userEvent.setup()
    render(<DashboardApp />)

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
    render(<DashboardApp />)

    await user.click(screen.getByRole('button', { name: /Atlas Emerald/i }))

    expect(screen.getByText('#10B981')).toBeInTheDocument()
  })

  it('opens the Button playground from the component map', async () => {
    const user = userEvent.setup()
    render(<DashboardApp />)

    await user.click(screen.getByRole('button', { name: 'All' }))
    await user.click(screen.getByRole('button', { name: 'View Button' }))

    expect(screen.getByRole('heading', { name: 'Button' })).toBeInTheDocument()
    expect(screen.getByText(/Preview interactiva/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Volver al mapa/i })).toBeInTheDocument()
  })

  it('opens the Card playground from the component map', async () => {
    const user = userEvent.setup()
    render(<DashboardApp />)

    await user.click(screen.getByRole('button', { name: 'All' }))
    await user.click(screen.getByRole('button', { name: 'View Card' }))

    expect(screen.getByRole('heading', { name: 'Card' })).toBeInTheDocument()
    expect(screen.getByText(/Preview interactiva/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Volver al mapa/i })).toBeInTheDocument()
  })

  it('opens the Input Field playground from the component map', async () => {
    const user = userEvent.setup()
    render(<DashboardApp />)

    await user.click(screen.getByRole('button', { name: 'All' }))
    await user.click(screen.getByRole('button', { name: 'View Input Field' }))

    expect(screen.getByRole('heading', { name: 'Input Field' })).toBeInTheDocument()
    expect(screen.getByText(/Preview interactiva/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
  })

  it('updates Card playground controls', async () => {
    const user = userEvent.setup()
    render(<DashboardApp />)

    await user.click(screen.getByRole('button', { name: 'All' }))
    await user.click(screen.getByRole('button', { name: 'View Card' }))

    const elevatedButtons = screen.getAllByRole('button', { name: 'elevated' })
    await user.click(elevatedButtons[elevatedButtons.length - 1])
    await user.click(screen.getByLabelText('Glow'))

    const generatedCode = screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === 'code' &&
        content.includes('variant="elevated"') &&
        content.includes('glow')
      )
    })

    expect(generatedCode).toBeInTheDocument()
  })

  it('updates Input Field playground controls', async () => {
    const user = userEvent.setup()
    render(<DashboardApp />)

    await user.click(screen.getByRole('button', { name: 'All' }))
    await user.click(screen.getByRole('button', { name: 'View Input Field' }))

    await user.click(screen.getByRole('button', { name: 'password' }))
    await user.click(screen.getByRole('button', { name: 'error' }))
    await user.click(screen.getByLabelText('Right icon'))

    const generatedCode = screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === 'code' &&
        content.includes('type="password"') &&
        content.includes('error="Enter a valid email address."') &&
        content.includes('rightIcon={<Eye />}')
      )
    })

    expect(generatedCode).toBeInTheDocument()
  })
})
