import { render } from '@testing-library/react'
import Footer from '../components/footer'
import { describe, it, expect } from 'vitest'

describe('Footer Component', () => {
    it('renders the footer with the correct title', () => {
        const { getByText } = render(<Footer />)
        expect(getByText('footer')).toBeDefined()
    })
    it('matches the snapshot', () => {
        const { container } = render(<Footer />)
        expect(container).toMatchSnapshot()
    })
})
