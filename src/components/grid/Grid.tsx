import { Row } from './Row'

type Props = {
  guesses: string[]
  currentGuess: string
  winningGuess: string
  runningTotal: string
}

export const Grid = ({ guesses, currentGuess, runningTotal }: Props) => {
  const emptyRowsToDisplay = 4 - guesses.length

  return (
    <div className="pb-6">
      <Row
        key={currentGuess}
        guess={currentGuess}
        runningTotal={runningTotal}
      />
      {guesses.map((guess, i) => (
        <Row key={guess} guess={guess} />
      ))}
      {emptyRowsToDisplay > 0 &&
        Array.from(Array(emptyRowsToDisplay)).map((_, i) => (
          <Row key={i} guess={''} />
        ))}
    </div>
  )
}
