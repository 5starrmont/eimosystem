
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Added explicit error handling for configuration
  try {
    // Try to normalize the package.json path if needed
    const packageJsonPath = path.resolve(__dirname, 'package.json');
    
    return {
      server: {
        host: "::",
        port: 8080,
      },
      plugins: [
        react(),
        mode === 'development' &&
        componentTagger(),
        // Add a custom plugin to handle potential file encoding issues
        {
          name: 'handle-encoding-issues',
          enforce: 'pre',
          transform(code, id) {
            // Remove BOM characters from any loaded file if present
            if (code.charCodeAt(0) === 0xFEFF) {
              return { code: code.slice(1), map: null };
            }
            return null;
          }
        }
      ].filter(Boolean),
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
      optimizeDeps: {
        esbuildOptions: {
          charset: 'utf8',
          // Additional options to handle potential encoding issues
          legalComments: 'none',
          logLevel: 'warning',
          logLimit: 0,
        }
      },
      // Add better JSON handling
      json: {
        stringify: true,
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
