interface IHasId<T> {
  readonly id: T
}

/**
 * `IHasStringId` interface specifies that the id property should be a string.
 */
export interface IHasStringId extends IHasId<string> {}

/**
 * `DeepReadonly` interface makes all properties of the given object recursively readonly.
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}
