export interface InventoryItem {
  id: number
  image: string
  quantity: number
  empty?: boolean
}

export type Inventory = {
  rows: number
  columns: number
  items: Array<InventoryItem>
}
