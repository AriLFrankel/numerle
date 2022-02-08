import classnames from 'classnames'

type Props = {
  value?: string
  isOperator?: boolean
  isInfoModal?: boolean
}

export const Cell = ({
  value,
  isOperator = false,
  isInfoModal = false,
}: Props) => {
  const classes = classnames(
    `w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded`,
    {
      [`w-8 h-8 border-solid border-2 flex items-center justify-center mx-0.5 text-sm font-bold rounded`]:
        isOperator,
    }
  )

  return (
    <>
      <div className={classes}>{value}</div>
    </>
  )
}
