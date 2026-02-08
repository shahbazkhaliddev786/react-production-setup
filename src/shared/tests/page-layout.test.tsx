import { render } from '@testing-library/react'
import PageLayout from '../layouts/page-layout'
import { describe, it, expect } from 'vitest'

describe('PageLayout Component', () => {
    it('renders the page layout without errors', () => {
        const { getByText } = render(<PageLayout />)
        expect(getByText('page-layout')).toBeDefined()
    })
    it('matches the snapshot', () => {
        const { container } = render(<PageLayout />)
        expect(container).toMatchSnapshot()
    })
})
