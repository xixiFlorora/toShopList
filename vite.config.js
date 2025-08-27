
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"


export default defineConfig({
plugins: [react()],
base: '/toShopList/', // ⚠️  "toShopList" 是我的 GitHub Repo 名稱
resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});