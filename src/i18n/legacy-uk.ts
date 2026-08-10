/**
 * Ukrainian translations for the legacy two-argument text(Chinese, English) API.
 *
 * The application is gradually migrating these call sites to typed message keys.
 * Keeping this small compatibility layer lets the Ukrainian locale work during
 * that migration without changing creative prompts or persisted project data.
 */
export const legacyUk = {
  'Project': 'Проєкт',
  'Knowledge': 'База знань',
  'Characters': 'Персонажі',
  'Project management': 'Керування проєктом',
  'Current project': 'Поточний проєкт',
  'New project': 'Новий проєкт',
  'Open project...': 'Відкрити проєкт…',
  'Close current project': 'Закрити поточний проєкт',
  'Recent projects': 'Нещодавні проєкти',
  'No other recent projects': 'Інших нещодавніх проєктів немає',
  'Settings': 'Налаштування',
  'Close project': 'Закрити проєкт',
  'Discard and close': 'Відкинути зміни й закрити',
  'Close the current project?': 'Закрити поточний проєкт?',
} as const

export type LegacyUkKey = keyof typeof legacyUk
