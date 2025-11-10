const dateParser = require("../utils/dateParser");

const events = [];
let eventIdCounter = 1;

function createEvent(eventData) {
  const { title, startTime, endTime, timezone } = eventData;

  const parsedStartTime = dateParser.parseDateTime(startTime, timezone);
  const parsedEndTime = endTime
    ? dateParser.parseDateTime(endTime, timezone)
    : null;

  if (parsedEndTime && parsedEndTime <= parsedStartTime) {
    throw new Error("End time must be after start time");
  }

  const event = {
    id: eventIdCounter++,
    title,
    startTime: parsedStartTime.toISOString(),
    endTime: parsedEndTime ? parsedEndTime.toISOString() : null,
    timezone,
    createdAt: new Date().toISOString(),
  };

  events.push(event);

  return event;
}

function getUpcomingEvents(dateString, timezone) {
  const referenceDate = dateParser.parseDate(dateString, timezone);

  const upcoming = events.filter((event) => {
    const eventDate = new Date(event.startTime);
    return eventDate >= referenceDate;
  });

  return upcoming;
}

function getEventsByDateRange(startDate, endDate, timezone) {
  const start = dateParser.parseDate(startDate, timezone);
  const end = dateParser.parseDate(endDate, timezone);

  return events.filter((event) => {
    const eventDate = new Date(event.startTime);
    return eventDate >= start && eventDate <= end;
  });
}

module.exports = {
  createEvent,
  getUpcomingEvents,
  getEventsByDateRange,
};
