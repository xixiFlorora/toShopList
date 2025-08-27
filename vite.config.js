import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
plugins: [react()],
base: '/toShopList/', // ⚠️ 請將 "my-app" 改為你的 GitHub Repo 名稱
});