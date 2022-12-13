/* eslint-disable no-undef */
import {defineConfig} from 'vite'; // loadEnv;
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
	// {command, mode}
	// const env = loadEnv(mode, process.cwd());
	// process.env = { ...process.env, ...env };
	return {
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	};
});
