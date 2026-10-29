import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Лимит размера бандла в КБ.
// Для демонстрации сбойного сценария стоит 1.0 КБ. Для реального проекта: 50.
const SIZE_LIMIT_KB = 1.0;

function bundleSizeGuard(limitKb) {
  return {
    name: 'jffect-bundle-size-guard',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'chunk') continue;
        const sizeKb = Buffer.byteLength(chunk.code, 'utf8') / 1024;
        const status = sizeKb > limitKb ? 'ПРЕВЫШЕН' : 'OK';
        console.log(`\n[Jffect] ${fileName}: ${sizeKb.toFixed(2)} КБ / лимит ${limitKb.toFixed(2)} КБ — ${status}`);
        if (sizeKb > limitKb) {
          console.error(
            `\n\x1b[31m[Jffect] ОШИБКА СБОРКИ: размер бандла (${sizeKb.toFixed(2)} КБ) ` +
              `превышает допустимый лимит ${limitKb.toFixed(2)} КБ.\x1b[0m`
          );
          console.error('[Jffect] Сборка прервана (process.exit(1)).\n');
          process.exit(1);
        }
      }
    },
  };
}

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: true,
    lib: {
      entry: resolve(import.meta.dirname, 'src/core.js'),
      name: 'Jffect',
      formats: ['es'],
      fileName: () => 'jffect.js',
    },
  },
  plugins: [bundleSizeGuard(SIZE_LIMIT_KB)],
});
