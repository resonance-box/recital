import { type FC } from 'react'
import { useTest } from './Provider'

export const Consumer: FC = () => {
  const test = useTest()
  return <div>{test}</div>
}
