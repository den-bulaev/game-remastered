import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  if (mode === "production") {
    return {
      plugins: [react()],
    };
  }

  return {
    // base: modify base url,
    plugins: [react()],

    server: {
      host: "localhost",
      port: 3000,
    },
  };
});
