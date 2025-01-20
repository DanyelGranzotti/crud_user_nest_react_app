import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.API_END_POINT": JSON.stringify(
        env.API_END_POINT ||
          process.env.API_END_POINT ||
          "http://localhost:3000"
      ),
      "process.env.RECAPTCHA_SITE_KEY": JSON.stringify(
        env.RECAPTCHA_SITE_KEY ||
          process.env.RECAPTCHA_SITE_KEY ||
          "6LdLuLwqAAAAAHcNk3NC8oHfIwbPIEvJksH_XSMy"
      ),
      "process.env.REACT_APP_ENCRYPTION_KEY": JSON.stringify(
        env.REACT_APP_ENCRYPTION_KEY || process.env.REACT_APP_ENCRYPTION_KEY
      ),
    },
    plugins: [react()],
  };
});
