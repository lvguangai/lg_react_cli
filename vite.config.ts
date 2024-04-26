import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		postcss: {
			// 关键代码
			plugins: [
				autoprefixer({
					// 自动添加前缀
					overrideBrowserslist: [
						'last 1 version', // 最后一个版本
						'> 1%', // 全球超过1%的人使用的浏览器
						'ie >= 8' // Internet Explorer 11及以上版本
					],
					grid: true
				})
			]
		}
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)) // 配置'@'指向'/src'目录
		}
	}
})
