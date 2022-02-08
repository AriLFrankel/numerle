import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Cell } from '../grid/Cell'
import { XCircleIcon } from '@heroicons/react/outline'
import { Key } from '../keyboard/Key'
import { StatusObj, getStatuses } from '../../lib/statuses'
import { KeyValue } from '../../lib/keyboard'
type Props = {
  isOpen: boolean
  handleClose: () => void
  prevStatuses: StatusObj
}

const infoTOTAL = 10
const infoGUESS = '5+6-4/2+1'

const infoCopy = [
  {
    guess: '1+2+3+4*1',
    statuses: getStatuses(['1+2+3+4*1'], infoGUESS, {}),
    message:
      'There is one 2 and one 4 in the solution. There is at least one 1, but not two of them. There are no 3s',
  },
  {
    guess: '9/3-1+4*2',
    statuses: getStatuses(['9/3-1+4*2'], infoGUESS, {}),
    message:
      'There is one 2, one 1 and one 4 in the solution. There are no 9s nor 3s',
  },
  {
    guess: '4*2+1+6-5',
    statuses: getStatuses(['4*2+1+6-5'], infoGUESS, {}),
    message:
      'There is one 4, one 2, one 1, one 6 and one 5. This is one of the winning solutions',
  },
  {
    guess: '5*6/2-4-1',
    statuses: getStatuses(['5*6/2-4-1'], infoGUESS, {}),
    message: 'This is also a winning solution',
  },
]

const SampleRow = ({ guess }: { guess: string }) => (
  <div className="flex justify-center items-center mb-1 mt-4">
    {Array.from(guess).map((char, i) => (
      <Cell
        key={`${guess}${char}${i}}`}
        value={char}
        isOperator={['+', '-', '/', '*'].includes(char)}
      />
    ))}
  </div>
)

const MiniKeyboard = ({ statuses }: { statuses: StatusObj }) => {
  const onClick = () => {}
  return (
    <div className="flex justify-center items-center">
      {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((char, i) => (
        <Key
          value={char as KeyValue}
          status={statuses[char]}
          onClick={onClick}
          key={char + statuses[char] + i}
        />
      ))}
    </div>
  )
}

export const InfoModal = ({ isOpen, handleClose, prevStatuses }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className="absolute right-4 top-4">
                <XCircleIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => handleClose()}
                />
              </div>
              <div>
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    How to play
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      A NUMERLE is a combination of integers that can be
                      combined to arrive at the TOTAL. Guess the NUMERLE in 6
                      tries. After each guess, the color of the keys will change
                      to show how close your guess was to the right combination
                      of numbers.
                    </p>
                    <h4>Total: {infoTOTAL}</h4>
                    {infoCopy.map(({ guess, message, statuses }, i) => (
                      <>
                        <SampleRow key={`${guess}${i}`} guess={guess} />
                        <p
                          key={`text-${message}`}
                          className="text-sm text-gray-500"
                        >
                          {message}
                        </p>
                        <MiniKeyboard
                          key={`keyboard-${message}`}
                          statuses={statuses}
                        />
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
