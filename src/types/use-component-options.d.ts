export type UseComponentOptions<T, P> = {
  handleProps: handleProps <T, P>
}
export interface handleProps <T, P> {
  (props: T, globalSwitchProps: P): T
}