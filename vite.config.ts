import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// export default defineConfig({
//   // base: "/den-bulaev-cube-game.netlify.app",
//   plugins: [react()],

//   server: {
//     host: "localhost",
//     port: 3000,
//   },
// });

export default defineConfig(({ mode }) => {
  if (mode === "production") {
    return {
      // base: "/",
      plugins: [react()],
    };
  }

  return {
    base: "/den-bulaev-cube-game.netlify.app",
    plugins: [react()],

    server: {
      host: "localhost",
      port: 3000,
    },
  };
});
