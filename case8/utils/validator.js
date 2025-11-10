function validateItem(item) {
  if (!item) {
    throw new Error("Item cannot be null or undefined");
  }

  if (!item.id) {
    return false;
  }

  return true;
}

function validateRecord(record) {
  if (!record || typeof record !== "object") {
    throw new Error("Record must be an object");
  }

  return true;
}

module.exports = {
  validateItem,
  validateRecord,
};
