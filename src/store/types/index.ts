export type CommonAction<T, P = never> = {
    type: T,
    payload?: P,
}