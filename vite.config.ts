import { defineConfig, loadEnv, type ServerOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

type Mode = 'development' | 'production'

interface AppEnv {
    PORT: string
    VITE_ENVIRONMENT: Mode
}

const validateEnv = (env: Record<string, string>) => {
    const requiredVars: (keyof AppEnv)[] = ['PORT', 'VITE_ENVIRONMENT']

    for (const key of requiredVars) {
        if (!env[key]) {
            throw new Error(`Missing required environment variable: ${key}`)
        }
    }

    const typedEnv = env as unknown as AppEnv
    if (!['development', 'production'].includes(typedEnv.VITE_ENVIRONMENT)) {
        throw new Error(`Invalid VITE_ENVIRONMENT value: ${typedEnv.VITE_ENVIRONMENT}. Must be 'development' or 'production'.`)
    }
}

const normalizeport = (port: string): number => {
    const parsedPort = parseInt(port, 10)
    if (isNaN(parsedPort)) {
        throw new Error(`Invalid port number: ${port}`)
    }
    return parsedPort
}

export default defineConfig(({ mode }) => {
    const envMode = mode as Mode
    const env = loadEnv(envMode, process.cwd(), '')

    validateEnv(env)

    const port = normalizeport(env.PORT)

    const config: ServerOptions = {
        port,
        open: true
    }

    return {
        plugins: [
            react({
                babel: {
                    plugins: [['babel-plugin-react-compiler']]
                }
            }),
            tailwindcss()
        ],
        server: config,
        preview: config,
        build: {
            // 1. Explicitly use 'terser' for advanced uglification/minifying
            minify: 'terser',

            // 2. Uglify options to remove console logs, debuggers, and mangle names
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                },
                mangle: true // This is the "uglifying" part (obfuscates names)
            },

            // 3. Keep your custom chunking strategy
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return 'vendor'
                        }
                    }
                }
            },

            // 4. Vite uses esbuild for CSS by default; 'true' enables it
            cssMinify: true
        }
    }
})
