export type Pager = {
  limit: number
  page: number
}
export type Addon = {
  loading: boolean
}
export const defaultPager: Pager = {
  limit: 10,
  page: 0
}
export const defaultAddon: Addon = {
  loading: false
}