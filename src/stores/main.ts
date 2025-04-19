import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { random } from '@/utils.ts'
import type { Inventory, InventoryItem } from '@/types.ts'

const DEFAULT_INVENTORY_ROWS = 5
const DEFAULT_INVENTORY_COLUMNS = 5
const DEFAULT_ITEM_QUANTITY = 3

export const useMainStore = defineStore('main', () => {
  const inventory = useLocalStorage('inventory', createInventory())

  function createInventory() {
    const inventoryCapacity = DEFAULT_INVENTORY_ROWS * DEFAULT_INVENTORY_COLUMNS
    const MAX_NUMBER_OF_ITEMS_CREATED =
      DEFAULT_ITEM_QUANTITY > inventoryCapacity ? inventoryCapacity : DEFAULT_ITEM_QUANTITY
    const items = Array.from({ length: inventoryCapacity }, (_, i) => {
      if (i < MAX_NUMBER_OF_ITEMS_CREATED) {
        return createItem(i + 1)
      }
      return createItem(i + 1, true)
    })
    const initialInventory: Inventory = {
      rows: DEFAULT_INVENTORY_ROWS,
      columns: DEFAULT_INVENTORY_COLUMNS,
      items,
    }
    return initialInventory
  }

  function createItem(id: number, empty = false): InventoryItem {
    return {
      id,
      image: empty ? '' : `/test-task--rlt-inventory/img/item-${random(1, 3)}.png`,
      quantity: empty ? 0 : random(1, 9),
      empty: empty ? true : undefined,
    }
  }

  function resetInventory() {
    inventory.value = createInventory()
  }

  function addRandomItem() {
    const emptyItemIndex = inventory.value.items.findIndex((item) => item.empty)
    if (emptyItemIndex !== -1) {
      inventory.value.items[emptyItemIndex] = createItem(inventory.value.items[emptyItemIndex].id)
    }
  }

  return {
    inventory,
    resetInventory,
    addRandomItem,
  }
})
