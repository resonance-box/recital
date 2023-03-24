import { RecitalImpl, type Recital, type RecitalOptions } from './recital'

export const createRecital = (options?: RecitalOptions): Recital => {
  return new RecitalImpl(options)
}
