// script.js
import {
  add_item,
  delete_item_by_id,
  get_item_title_by_id,
  get_items,
  update_item_title_by_id,
} from "./data.js";

console.log(
  "Adding item { id: 1, title: 'First Item' }:",
  add_item({ id: 1, title: "First Item" })
);
console.log(
  "Adding duplicate item with id 1:",
  add_item({ id: 1, title: "Duplicate Item" })
);
console.log("All items:", get_items());

console.log(
  "Updating title of item with id 1:",
  update_item_title_by_id(1, "Updated Title")
);
console.log(
  "Trying to update non-existing id 2:",
  update_item_title_by_id(2, "New Title")
);
console.log("All items after update:", get_items());

console.log("Getting title by id 1:", get_item_title_by_id(1));
console.log("Getting title by non-existing id 2:", get_item_title_by_id(2));

console.log("Deleting item with id 1:", delete_item_by_id(1));
console.log("Trying to delete non-existing id 2:", delete_item_by_id(2));
console.log("All items after delete:", get_items());
