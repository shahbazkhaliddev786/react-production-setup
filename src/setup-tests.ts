import { expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom'

// This is the "bridge" that makes toBeInTheDocument work in Vitest
expect.extend(matchers)
