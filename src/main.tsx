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

2. Versions, lint-staged, eslint, commitlint, husky, prettier, stylelint.
3. Screaming/Feature Architecture - The art of folder structure. This architecture is scalable and maintainable. It is based on the principle of separation of concerns. Each feature is a folder that contains all the files related to that feature. This way, we can easily find and modify the code related to a specific feature without affecting other features.
   Application will be robust and readable codebase for developers.

*/
