export const SUPPORTED_LOCALES = ['uk-UA', 'en-US', 'zh-CN'] as const

export type Locale = typeof SUPPORTED_LOCALES[number]
export type MessageParams = Record<string, string | number>
