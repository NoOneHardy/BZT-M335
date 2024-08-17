export interface Set {
  configurations: {
    name: string
    value: string | number | null
    suffix?: string
  }[]
}
