/** True for obviously fake values (example.com, your-username, empty). */
export const isPlaceholder = (v) => !v || /example\.com|your-username|your\.email/i.test(v)

export const LEVELS = ['learning', 'beginner', 'intermediate', 'proficient', 'advanced']
export const levelIndex = (level) => Math.max(0, LEVELS.indexOf(level)) + 1
