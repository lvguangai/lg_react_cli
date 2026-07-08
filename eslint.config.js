import eslint from '@eslint/js'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptEslintParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'

export default [
	{
		ignores: ['dist/**', 'node_modules/**']
	},
	eslint.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: typescriptEslintParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module'
			},
			globals: {
				clearInterval: 'readonly',
				console: 'readonly',
				document: 'readonly',
				localStorage: 'readonly',
				setInterval: 'readonly',
				window: 'readonly',
				URL: 'readonly'
			}
		},
		plugins: {
			'@typescript-eslint': typescriptEslintPlugin,
			'prettier': prettierPlugin,
			'react-hooks': reactHooksPlugin,
			'react-refresh': reactRefreshPlugin
		},
		rules: {
			...typescriptEslintPlugin.configs.recommended.rules,
			...reactHooksPlugin.configs.recommended.rules,
			...prettierConfig.rules,
			'prettier/prettier': 'error',
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'@typescript-eslint/no-explicit-any': 'off'
		}
	}
]
