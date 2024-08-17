import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/den-bulaev-cube-game.netlify.app",
  plugins: [react()],

  server: {
    host: "localhost", // Change 'localhost'
    port: 3000, // Change the port number from 5173 to 3000 or any port you prefer
  },
});
