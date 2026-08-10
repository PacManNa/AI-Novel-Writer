import { describe, expect, it } from 'vitest'
import { resolveLocale, translate } from '../core'

describe('Ukrainian localization', () => {
  it('resolves Ukrainian OS locales to uk-UA', () => {
    expect(resolveLocale('uk-UA')).toBe('uk-UA')
    expect(resolveLocale('uk')).toBe('uk-UA')
  })

  it('translates core interface messages into Ukrainian', () => {
    expect(translate('uk-UA', 'common.settings')).toBe('Налаштування')
    expect(translate('uk-UA', 'project.current', { name: 'Моя книга' })).toBe('Поточний проєкт: Моя книга')
    expect(translate('uk-UA', 'language.ukrainian')).toBe('Українська')
  })
})
