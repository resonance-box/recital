import { basename, resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import packageJson from './package.json'

const getPackageName = () => {
  return basename(packageJson.name)
}

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, (char) => char[1].toUpperCase())
  } catch (err) {
    throw new Error('Name property in package.json is missing.')
  }
}

module.exports = defineConfig({
  plugins: [dts({ insertTypesEntry: true })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: getPackageNameCamelCase(),
      formats: ['es'],
      fileName: getPackageName(),
    },
    rollupOptions: {
      external: ['sf2-synth-audio-worklet'],
    },
  },
})
