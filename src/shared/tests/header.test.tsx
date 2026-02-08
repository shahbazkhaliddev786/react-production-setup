import { render } from '@testing-library/react'
import Header from '../components/header'
import { describe, it, expect } from 'vitest'

describe('Header Component', () => {
    it('renders the header with the correct title', () => {
        const { getByText } = render(<Header />)
        expect(getByText('Header')).toBeDefined()
    })
    it('matches the snapshot', () => {
        const { container } = render(<Header />)
        expect(container).toMatchSnapshot()
    })
})
