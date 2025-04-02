
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Added explicit error handling for configuration
  try {
    return {
      server: {
        host: "::",
        port: 8080,
      },
      plugins: [
        react(),
        mode === 'development' &&
        componentTagger(),
      ].filter(Boolean),
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
      optimizeDeps: {
        esbuildOptions: {
          // This helps with potential BOM characters in config files
          charset: 'utf8',
        }
      }
    };
  } catch (error) {
    console.error("Error in vite config:", error);
    // Return a minimal config if there's an error
    return {
      plugins: [react()],
    };
  }
});
