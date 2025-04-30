// data.js
let data = [];

export function get_items() {
  return data;
}

export function add_item(new_item) {
  if (data.findIndex((i) => i.id === new_item.id) === -1) {
    data.push(new_item);
    return true;
  }
  return false;
}

export function update_item_title_by_id(id, new_title) {
  const item = data.find((i) => i.id === id);
  if (item) {
    item.title = new_title;
    return true;
  }
  return false;
}

export function delete_item_by_id(id) {
  const index = data.findIndex((i) => i.id === id);
  if (index !== -1) {
    data.splice(index, 1);
    return true;
  }
  return false;
}

export function get_item_title_by_id(id) {
  return data.find((i) => i.id === id)?.title;
}
