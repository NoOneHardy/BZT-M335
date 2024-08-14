export interface Machine {
  id: string
  name: string,
  configurations: {
    name: string
    suffix: string
    type: 'text' | 'number'
  }[]
}
