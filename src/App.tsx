import { InformationCircleIcon, RefreshIcon } from '@heroicons/react/outline'
import { ChartBarIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { WinModal } from './components/modals/WinModal'
import { StatsModal } from './components/modals/StatsModal'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  isIntegerUnder10,
  getNumber,
  compareGuesses,
  getTotal,
} from './lib/arithmetic'
import { getStatuses, StatusObj } from './lib/statuses'

function App() {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isIncompleteGuess, setIsIncompleteGuess] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isIncorrectTotalOpen, setIsIncorrectTotalOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(() => [])
  const [prevStatuses, setPrevStatuses] = useState<StatusObj>(() => ({}))
  const [shareStatuses, setShareStatuses] = useState<StatusObj[]>(() => [])
  const [runningTotal, setRunningTotal] = useState<string>(() => '0')

  const [stats, setStats] = useState(() => loadStats())

  const [GUESS, setGUESS] = useState(String)
  const [TOTAL, setTOTAL] = useState(Number)

  const setupGame = () => {
    const { guess, total } = getNumber()
    setTOTAL(total)
    setGUESS(guess)
  }

  useEffect(setupGame, [])

  const onChar = (value: string) => {
    const shouldBeInteger = currentGuess.length % 2 === 0
    const newCurrentGuess = `${currentGuess}${value}`
    const valid = shouldBeInteger
      ? isIntegerUnder10(value)
      : !isIntegerUnder10(value)
    if (valid && currentGuess.length !== 9) {
      if (shouldBeInteger) {
        setRunningTotal(String(getTotal(newCurrentGuess)))
      }
      setCurrentGuess(newCurrentGuess)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (currentGuess.length !== 9) {
      setIsIncompleteGuess(true)
      return setTimeout(setIsIncompleteGuess.bind(false), 2000)
    }
    const { sameTotal, sameIntegers } = compareGuesses(currentGuess, GUESS)

    if (!sameTotal) {
      setIsIncorrectTotalOpen(true)
      return setTimeout(() => {
        setIsIncorrectTotalOpen(false)
      }, 2000)
    }
    if (guesses.length === 4) {
      setIsGameLost(true)
      setStats(addStatsForCompletedGame(stats, guesses.length))
      return setTimeout(() => {
        setIsGameLost(false)
      }, 3000)
    }
    const nextStatuses = getStatuses([currentGuess], GUESS, prevStatuses)
    setPrevStatuses(nextStatuses)
    setShareStatuses((shareStatuses) => [...shareStatuses, nextStatuses])

    if (sameIntegers) {
      setStats(addStatsForCompletedGame(stats, guesses.length))
      return setIsWinModalOpen(true)
    }
    setGuesses([currentGuess, ...guesses])
    setRunningTotal('0')
    setCurrentGuess('')
  }

  const resetGame = () => {
    setGuesses([])
    setCurrentGuess('')
    setPrevStatuses({})
    setShareStatuses([])
    setRunningTotal('0')
    setupGame()
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Alert message="Incomplete Guess" isOpen={isIncompleteGuess} />
      <Alert message="Incorrect Total" isOpen={isIncorrectTotalOpen} />
      <Alert
        message={`You lost, one possible solution was: ${GUESS}`}
        isOpen={isGameLost}
      />
      <Alert
        message="Game copied to clipboard"
        isOpen={shareComplete}
        variant="success"
      />
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">Numerle</h1>
        <h2 className="text-xl grow font-bold">Total: {TOTAL}</h2>
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsStatsModalOpen(true)}
        />
        <RefreshIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => resetGame()}
        />
      </div>
      <Grid
        winningGuess={GUESS}
        guesses={guesses}
        currentGuess={currentGuess}
        runningTotal={runningTotal}
      />
      <Keyboard
        winningGuess={GUESS}
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        prevStatuses={prevStatuses}
      />
      <WinModal
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        handleShare={() => {
          setIsWinModalOpen(false)
          setShareComplete(true)
          return setTimeout(() => {
            setShareComplete(false)
          }, 2000)
        }}
        shareStatuses={shareStatuses}
        total={TOTAL}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
        prevStatuses={prevStatuses}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        gameStats={stats}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsAboutModalOpen(true)}
      >
        About this game
      </button>
    </div>
  )
}

export default App
