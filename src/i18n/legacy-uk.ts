/**
 * Ukrainian translations for the legacy two-argument text(Chinese, English) API.
 *
 * The application is gradually migrating these call sites to typed message keys.
 * Keeping this compatibility layer lets the Ukrainian locale work during that
 * migration without changing creative prompts or persisted project data.
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
  'New novel project': 'Новий проєкт роману',
  'Enter a title and save location; configure the rest inside the project.': 'Введіть назву та місце збереження; решту налаштувань можна виконати в проєкті.',
  'Title': 'Назва',
  'e.g. The Glass Observatory': 'наприклад: Скляна обсерваторія',
  'Save location': 'Місце збереження',
  'Choose a project folder': 'Виберіть папку проєкту',
  'Choose': 'Вибрати',
  'Cancel': 'Скасувати',
  'Creating...': 'Створення…',
  'Create project': 'Створити проєкт',
  'Appearance': 'Вигляд',
  'Generation models': 'Моделі генерації',
  'Embedding model': 'Модель ембедингів',
  'Network proxy': 'Мережевий проксі',
  'Editor': 'Редактор',
  'Prompt templates': 'Шаблони промптів',
  'About': 'Про програму',
  'Themes and interface skins can be changed independently': 'Тему та стиль інтерфейсу можна змінювати незалежно один від одного.',
  'Models used for writing, rewriting, and summarization': 'Моделі для написання, переписування та створення резюме.',
  'Embedding model used for knowledge retrieval': 'Модель ембедингів для пошуку в базі знань.',
  'HTTP / SOCKS5 proxy for restricted APIs': 'HTTP / SOCKS5-проксі для доступу до обмежених API.',
  'Fonts and other editor preferences': 'Шрифти та інші налаштування редактора.',
  'Customize guidance for each AI writing stage': 'Налаштування інструкцій для кожного етапу AI-генерації.',
  'Version, positioning, and local deployment': 'Версія, призначення та локальне розгортання.',
  'generation models configured': 'моделей генерації налаштовано',
  'embedding models configured': 'моделей ембедингів налаштовано',
  'Add generation models': 'Додати моделі генерації',
  'Add embedding models': 'Додати моделі ембедингів',
  'Free embedding model recommendation': 'Рекомендована безкоштовна модель ембедингів',
  'Free model registration': 'Реєстрація для безкоштовної моделі',
  'No generation models configured': 'Моделі генерації ще не налаштовані',
  'No embedding models configured': 'Моделі ембедингів ще не налаштовані',
  'Unable to open provider page': 'Не вдалося відкрити сторінку провайдера',
  'Unable to open link': 'Не вдалося відкрити посилання',
} as const

const dynamicLegacyRules: Array<[RegExp, (match: RegExpMatchArray) => string]> = [
  [/^(\d+) generation models configured$/, match => `${match[1]} ${legacyUk['generation models configured']}`],
  [/^(\d+) embedding models configured$/, match => `${match[1]} ${legacyUk['embedding models configured']}`],
  [/^Add (.+)$/, match => `Додати ${legacyUk[match[1] as keyof typeof legacyUk] ?? match[1]}`],
  [/^No (.+) configured$/, match => `${legacyUk[match[1] + ' configured' as keyof typeof legacyUk] ?? `Немає налаштованих: ${match[1]}`}`],
  [/^Add first (.+)$/, match => `Додати перші ${match[1]}`],
]

export function translateLegacyUk(enText: string): string | undefined {
  const direct = legacyUk[enText as keyof typeof legacyUk]
  if (direct) return direct

  for (const [pattern, translate] of dynamicLegacyRules) {
    const match = enText.match(pattern)
    if (match) return translate(match)
  }

  return undefined
}

export type LegacyUkKey = keyof typeof legacyUk
