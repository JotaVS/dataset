const express = require("express");
const { logAndSendError } = require("../utils/errorLogger");
const eventService = require("./services/eventService");

const app = express();
app.use(express.json());

app.post("/api/events", (req, res) => {
  try {
    const { title, startTime, endTime, timezone } = req.body;

    const event = eventService.createEvent({
      title,
      startTime,
      endTime,
      timezone,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Event creation error:", error);

    logAndSendError(error, __dirname);

    res.status(400).json({ error: "Failed to create event" });
  }
});

app.get("/api/events/upcoming", (req, res) => {
  try {
    const { date, timezone } = req.query;

    const events = eventService.getUpcomingEvents(date, timezone);

    res.json({
      date,
      timezone,
      events,
    });
  } catch (error) {
    console.error("Get events error:", error);

    logAndSendError(error, __dirname);

    res.status(400).json({ error: "Failed to retrieve events" });
  }
});

const PORT = 3009;
app.listen(PORT, () => {
  console.log(`Scheduling API running on port ${PORT}`);
  console.log(`Try POST: http://localhost:${PORT}/api/events`);
  console.log(
    `Body: { "title": "Meeting", "startTime": "2024-Jan-01 10:00", "timezone": "America/New_York" }`
  );
});
