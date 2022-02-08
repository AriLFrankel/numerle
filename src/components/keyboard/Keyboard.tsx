import { KeyValue } from '../../lib/keyboard'
import { getStatuses, StatusObj } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
  winningGuess: string
  prevStatuses: StatusObj
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  winningGuess,
  prevStatuses,
}: Props) => {
  const charStatuses = getStatuses(
    guesses.slice(0, 1),
    winningGuess,
    prevStatuses
  )

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = e.key
        if (
          (key.length === 1 && key >= '1' && key <= '9') ||
          ['*', '/', '+', '-'].indexOf(key) >= 0
        ) {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <>
      <div className="flex justify-center">
        <Key value="1" onClick={onClick} status={charStatuses['1']} />
        <Key value="2" onClick={onClick} status={charStatuses['2']} />
        <Key value="3" onClick={onClick} status={charStatuses['3']} />
        <Key value="4" onClick={onClick} status={charStatuses['4']} />
        <Key value="5" onClick={onClick} status={charStatuses['5']} />
        <Key value="6" onClick={onClick} status={charStatuses['6']} />
        <Key value="7" onClick={onClick} status={charStatuses['7']} />
        <Key value="8" onClick={onClick} status={charStatuses['8']} />
        <Key value="9" onClick={onClick} status={charStatuses['9']} />
      </div>
      <div className="flex justify-center">
        <Key value="DELETE" onClick={onClick}>
          Delete
        </Key>
        <Key value="*" onClick={onClick} status="operator" />
        <Key value="/" onClick={onClick} status="operator" />
        <Key value="+" onClick={onClick} status="operator" />
        <Key value="-" onClick={onClick} status="operator" />
        <Key value="ENTER" onClick={onClick}>
          Enter
        </Key>
      </div>
    </>
  )
}
