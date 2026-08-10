import { enUS, type MessageKey } from './messages/en-US'
import { zhCN } from './messages/zh-CN'
import { ukUA } from './messages/uk-UA'
import { legacyUk } from './legacy-uk'
import type { Locale, MessageParams } from './types'

type Catalog = Record<string, string>

export const messages: Record<Locale, Catalog> = {
  'uk-UA': ukUA,
  'en-US': enUS,
  'zh-CN': zhCN,
}

export function resolveLocale(input?: string | null): Locale {
  const normalized = input?.toLowerCase() ?? ''
  if (normalized.startsWith('uk')) return 'uk-UA'
  if (normalized.startsWith('zh')) return 'zh-CN'
  return 'en-US'
}

export function createTranslator(catalogs: Record<Locale, Catalog>) {
  return (locale: Locale, key: string, params: MessageParams = {}): string => {
    const template = catalogs[locale][key] ?? catalogs['en-US'][key] ?? key
    return template.replace(/\{(\w+)\}/g, (_, name: string) => String(params[name] ?? `{${name}}`))
  }
}

const translateMessage = createTranslator(messages)

function interpolate(template: string, params: MessageParams = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, name: string) => String(params[name] ?? `{${name}}`))
}

export function localize(
  locale: Locale,
  zhCNText: string,
  enUSText: string,
  params?: MessageParams,
): string {
  const template = locale === 'zh-CN'
    ? zhCNText
    : locale === 'uk-UA'
      ? legacyUk[enUSText as keyof typeof legacyUk] ?? enUSText
      : enUSText

  return interpolate(template, params)
}

export function translate(locale: Locale, key: MessageKey, params?: MessageParams): string {
  return translateMessage(locale, key, params)
}

export type { Locale, MessageKey, MessageParams }
