import { create, type StateCreator } from 'zustand'
import { ipc } from '../services/ipc-client'
import { localize, resolveLocale, translate, type MessageKey, type MessageParams } from '../i18n/core'
import { SUPPORTED_LOCALES, type Locale } from '../i18n/types'
import type { GlobalConfig } from '../shared/ipc-channels'

export interface LocaleDependencies {
  loadConfig: () => Promise<Partial<GlobalConfig>>
  saveLocale: (locale: Locale) => Promise<void>
  systemLocale: () => string | undefined
  setDocumentLanguage: (locale: Locale) => void
}

export interface LocaleState {
  locale: Locale
  initialized: boolean
  init: () => Promise<void>
  setLocale: (locale: Locale) => Promise<void>
  toggleLocale: () => Promise<void>
  t: (key: MessageKey, params?: MessageParams) => string
  text: (zhCNText: string, enUSText: string, params?: MessageParams) => string
}

export function createLocaleState(dependencies: LocaleDependencies): StateCreator<LocaleState> {
  return (set, get) => ({
    locale: resolveLocale(dependencies.systemLocale()),
    initialized: false,
    async init() {
      const config = await dependencies.loadConfig()
      const locale = config.locale ?? resolveLocale(dependencies.systemLocale())
      dependencies.setDocumentLanguage(locale)
      set({ locale, initialized: true })
    },
    async setLocale(locale) {
      set({ locale })
      dependencies.setDocumentLanguage(locale)
      await dependencies.saveLocale(locale)
    },
    async toggleLocale() {
      const currentIndex = SUPPORTED_LOCALES.indexOf(get().locale)
      const nextLocale = SUPPORTED_LOCALES[(currentIndex + 1) % SUPPORTED_LOCALES.length]
      await get().setLocale(nextLocale)
    },
    t(key, params) {
      return translate(get().locale, key, params)
    },
    text(zhCNText, enUSText, params) {
      return localize(get().locale, zhCNText, enUSText, params)
    },
  })
}

const browserDependencies: LocaleDependencies = {
  loadConfig: () => ipc.invoke('config:get'),
  async saveLocale(locale) {
    const result = await ipc.invoke('config:set', { locale })
    if (!result.success) throw new Error(result.error ?? 'Failed to persist locale')
  },
  systemLocale: () => globalThis.navigator?.language,
  setDocumentLanguage(locale) {
    if (globalThis.document) globalThis.document.documentElement.lang = locale
  },
}

export const useLocaleStore = create<LocaleState>(createLocaleState(browserDependencies))
