export type CharStatus = 'absent' | 'present' | 'operator' | '' | 'correct'
export type StatusObj = {
  [key: string]: CharStatus
}
export type CharValue =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '*'
  | '/'
  | '+'
  | '-'
const getCounts = (str: string) => {
  const counts = {} as { [key: string]: number }
  for (let i = 1; i < 10; i++) {
    counts[String(i)] = 0
  }
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    const num = parseInt(char)
    if (num > 0 && num < 10) {
      counts[char] = (counts[char] || 0) + 1
    }
  }
  return counts
}

export const getStatuses = (
  guesses: string[],
  solution: string,
  prevStatuses: StatusObj
): StatusObj => {
  const charObj: StatusObj = { ...prevStatuses }
  const solutionCounts = getCounts(solution)

  guesses.forEach((guess) => {
    const guessCounts = getCounts(guess)
    Array.from(guess).forEach((letter, i) => {
      if (i % 2 === 1) {
        charObj[letter] = 'operator'
        return
      }
      if (solutionCounts[letter] === 0) {
        // handles the absent case
        charObj[letter] = 'absent'
      } else if (solutionCounts[letter] === guessCounts[letter]) {
        charObj[letter] = 'correct'
      } else {
        charObj[letter] = 'present'
      }
      // if (!solution.includes(letter)) {
      //   // make status absent
      //   return (charObj[letter] = 'absent')
      // }

      // if (solutionCounts[parseInt(solution[i])]) {
      //   //make status correct
      //   return (charObj[letter] = 'present')
      // }

      // if (charObj[letter] !== 'present') {
      //   //make status present
      //   return (charObj[letter] = 'present')
      // }
    })
  })

  return charObj
}
