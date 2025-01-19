import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.API_END_POINT": JSON.stringify(env.API_END_POINT),
      "process.env.RECAPTCHA_SITE_KEY": JSON.stringify(env.RECAPTCHA_SITE_KEY),
    },
    plugins: [react()],
  };
});
