import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)

/*
1. We can change api versions in backend. But we need to change
   version in frontend as well. Just "npm version major" in frontend 
   it will automatically update the version in package.json 
   and also create a git tag with the same version.
*/
