function calculateAverage(values) {
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
}

function calculateVariance(values, mean) {
  const squaredDiffs = values.map((val) => Math.pow(val - mean, 2));
  return squaredDiffs.reduce((acc, val) => acc + val, 0) / values.length;
}

function calculateConversionRate(conversions, totalVisits) {
  return (conversions / totalVisits) * 100;
}

function calculateAverageDuration(sessions) {
  if (sessions.length === 0) {
    return 0;
  }

  const totalDuration = sessions.reduce(
    (sum, session) => sum + (session.duration || 0),
    0
  );
  return totalDuration / sessions.length;
}

function calculateSuccessRate(successful, total) {
  return successful / total;
}

function calculateEfficiency(tasks, time) {
  return tasks / time;
}

module.exports = {
  calculateAverage,
  calculateVariance,
  calculateConversionRate,
  calculateAverageDuration,
  calculateSuccessRate,
  calculateEfficiency,
};
