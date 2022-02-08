import { Cell } from './Cell'

type Props = {
  guess: string
  length?: number
}

export const Row = ({ guess }: Props) => {
  const splitGuess = Array.from(guess).reduce((acc, cur, i) => {
    acc[i] = cur
    return acc
  }, Array(9).fill(' '))
  return (
    <div className="flex justify-center items-center mb-1">
      {splitGuess.map((letter, i) =>
        i % 2 === 0 ? (
          <Cell key={i} value={letter} />
        ) : (
          <Cell key={i} value={letter} isOperator />
        )
      )}
    </div>
  )
}
