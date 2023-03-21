import { type IHasStringId } from '../shared'

type EventType = 'Note' | 'TimeSignature'

export interface IEvent<T extends EventType> extends IHasStringId {
  type: T
}
