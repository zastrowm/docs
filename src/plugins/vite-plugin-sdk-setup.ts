/**
 * Vite plugin that automatically runs `npm run sdk:clone` and `npm run sdk:generate`
 * if the SDK build artifacts are not present, simplifying the getting-started experience.
 */
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import type { Plugin } from 'vite'

const SDK_PATHS = ['.build/sdk-typescript', '.build/sdk-python']

function areSdksPresent(): boolean {
  return SDK_PATHS.every((p) => existsSync(p))
}

function run(command: string): void {
  console.log(`[sdk-setup] Running: ${command}`)
  execSync(command, { stdio: 'inherit' })
}

export default function sdkSetupPlugin(): Plugin {
  return {
    name: 'vite-plugin-sdk-setup',
    enforce: 'pre',
    async buildStart() {
      if (areSdksPresent()) return

      console.log('[sdk-setup] SDK build artifacts not found — running sdk:clone and sdk:generate...')
      run('npm run sdk:clone')
      run('npm run sdk:generate')
      console.log('[sdk-setup] SDK setup complete.')
    },
  }
}
