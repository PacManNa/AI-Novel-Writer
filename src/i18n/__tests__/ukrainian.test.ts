import { describe, expect, it } from 'vitest'
import { localize, resolveLocale, translate } from '../core'

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

  it('translates legacy two-language UI copy into Ukrainian', () => {
    expect(localize('uk-UA', '设置', 'Settings')).toBe('Налаштування')
    expect(localize('uk-UA', '项目管理', 'Project management')).toBe('Керування проєктом')
    expect(localize('uk-UA', '新建项目', 'New project')).toBe('Новий проєкт')
    expect(localize('uk-UA', '最近项目', 'Recent projects')).toBe('Нещодавні проєкти')
    expect(localize('uk-UA', '不存在的中文', 'Unknown text')).toBe('Unknown text')
  })
})
