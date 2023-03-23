import { Recital, type IRecital, type RecitalOptions } from './recital'

export const createRecital = (options?: RecitalOptions): IRecital => {
  return new Recital(options)
}
