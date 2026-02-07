const config = {
    linters: {
        '**/*.{js,jsx}': ['npm run lint:eslint', 'npm run format:check'],
        '**/*.{css,scss}': ['npm run lint:stylelint', 'npm run format:check'],
        '**/*.{md,mdx,json, html, yaml, yml}': ['npm run format:check']
    }
}
export default config
