export interface TemplateSet {
  configurations: {
    name: string,
    value: string | number | null
    suffix: string
  }[]
}
