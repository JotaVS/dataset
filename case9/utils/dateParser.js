function parseDateTime(dateTimeString, timezone) {
  const parts = dateTimeString.split(" ");

  if (parts.length !== 2) {
    throw new Error("Invalid datetime format. Expected: YYYY-MM-DD HH:MM");
  }

  const [datePart, timePart] = parts;
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  const date = new Date(year, month - 1, day, hours, minutes);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date values");
  }

  return date;
}

function parseDate(dateString, timezone) {
  if (!dateString) {
    return new Date();
  }

  const parts = dateString.split("-");

  if (parts.length !== 3) {
    throw new Error("Invalid date format. Expected: YYYY-MM-DD");
  }

  const [year, month, day] = parts.map(Number);

  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date values");
  }

  return date;
}

function formatDateTime(date, timezone) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

module.exports = {
  parseDateTime,
  parseDate,
  formatDateTime,
};
