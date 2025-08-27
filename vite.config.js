import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"


export default defineConfig({
plugins: [react(), tailwindcss()],
base: '/toShopList/', // ⚠️  "toShopList" 是我的 GitHub Repo 名稱
});