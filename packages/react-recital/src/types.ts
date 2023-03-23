/**
 * `DeepReadonly` interface makes all properties of the given object recursively readonly.
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}
