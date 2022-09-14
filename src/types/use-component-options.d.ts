export type UseComponentOptions<T, P> = {
  handleProps: handleProps <T, P>
}
interface handleProps <T, P> {
  (props: T, globalSwitchProps: P): T
}