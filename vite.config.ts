/// <reference types="vitest" />
import { defineConfig, loadEnv, type ServerOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

type Mode = 'development' | 'production' | 'testing'

interface AppEnv {
    PORT: string
    BACKEND_URL: string
    VITE_ENVIRONMENT: Mode
}

const validateEnv = (env: Record<string, string>) => {
    const requiredVars: (keyof AppEnv)[] = ['PORT', 'BACKEND_URL', 'VITE_ENVIRONMENT']

    for (const key of requiredVars) {
        if (!env[key]) {
            throw new Error(`Missing required environment variable: ${key}`)
        }
    }

    const typedEnv = env as unknown as AppEnv
    if (!['development', 'testing', 'production'].includes(typedEnv.VITE_ENVIRONMENT)) {
        throw new Error(`Invalid VITE_ENVIRONMENT value: ${typedEnv.VITE_ENVIRONMENT}. Must be 'development', 'testing', or 'production'.`)
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
        open: true,
        proxy: {
            '/api': {
                target: env.BACKEND_URL || 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
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
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/setup-tests.ts',
            include: ['src/**/*.{test.ts,spec.ts}', 'src/**/*.{test.tsx,spec.tsx}'],
            coverage: {
                reporter: ['json', 'html'],
                include: ['src/**/*.{ts,tsx}', 'src/**/*.{test,spec}.{ts,tsx}'],
                exclude: ['coverage', 'dist', 'build', 'src/super-tests.ts', 'src/**/*.{test,spec}.{ts,tsx}'],
                thresholds: {
                    statements: 80,
                    branches: 80,
                    functions: 80,
                    lines: 80
                }
            }
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
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
                },
                external: [/.*\.(test|spec)\.(ts|tsx)$/]
            },

            // 4. Vite uses esbuild for CSS by default; 'true' enables it
            cssMinify: true
        }
    }
})
