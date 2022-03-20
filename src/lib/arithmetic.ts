import { NUMBERS, OPERATORS } from '../constants/numbers'
import { evaluate, round } from 'mathjs'
import isequal from 'lodash.isequal'

export const isIntegerUnder10 = (char: string) => {
  const int = parseInt(char)
  return int >= 1 && int <= 9
}

export const getRandomIntegersUnder10 = (count: number) =>
  getRandomSubset(NUMBERS, count)
export const getRandomOperators = (count: number) =>
  getRandomSubset(OPERATORS, count)

export function getRandomSubset<Type>(
  list: Array<Type>,
  count: number
): Array<Type> {
  return Array.from(Array(count)).map(
    (_) => list[Math.floor(Math.random() * count)]
  )
}

export const getTotal = (guess: string): number => round(evaluate(guess), 2)

export const getNumber = (): {
  total: number
  guess: string
  integers: number[]
  operators: string[]
} => {
  let total = -1,
    guess = '',
    integers = [1],
    operators = ['']
  while (total <= 0 || !Number.isInteger(total)) {
    guess = String(integers[0])
    integers = getRandomIntegersUnder10(5)
    operators = getRandomOperators(4)
    for (let i = 1; i < integers.length; i++) {
      guess += operators[i - 1]
      guess += integers[i]
    }
    total = getTotal(guess)
  }

  return { total, guess, operators, integers }
}

const getIntegersFromGuess = (guess: string): number[] => {
  const integers = [0]
  for (let i = 0; i < guess.length; i += 2) {
    if (!isIntegerUnder10(guess[i])) {
      throw new Error('invalid guess passed')
    } else {
      integers.push(parseInt(guess[i]))
    }
  }
  return integers.slice(1)
}

export const compareGuesses = (
  guess1: string,
  guess2: string
): { sameIntegers: boolean; sameTotal: boolean } => {
  return {
    sameIntegers: isequal(
      getIntegersFromGuess(guess1).sort(),
      getIntegersFromGuess(guess2).sort()
    ),
    sameTotal: isequal(getTotal(guess1), getTotal(guess2)),
  }
}
