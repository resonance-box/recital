import { Recital, type IRecital, type RecitalOptions } from './recital'

export const createRecital = (options: Partial<RecitalOptions>): IRecital => {
  return new Recital(options)
}
