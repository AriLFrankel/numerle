import { StatusObj } from './statuses'

export const shareStatus = (statuses: StatusObj[], total: number) => {
  navigator.clipboard.writeText(
    'Numerle ' +
      total +
      ' ' +
      statuses.length +
      '/6\n\n' +
      generateEmojiGrid(statuses)
  )
}

export const generateEmojiGrid = (statuses: StatusObj[]) => {
  return statuses
    .map((status) =>
      Array.from(Array(10))
        .map((_, i) => status[i])
        .slice(1)
        .map((status) => {
          switch (status) {
            case 'present':
              return '🟨'
            case 'correct':
              return '🟩'
            case 'absent':
              return '⬛'
            default:
              return '⬜'
          }
        })
        .join('')
    )
    .join('\n')
}
