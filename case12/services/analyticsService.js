const statsCalculator = require("../utils/statsCalculator");

function calculateMetrics(metrics) {
  const total = metrics.reduce((sum, val) => sum + val, 0);
  const average = statsCalculator.calculateAverage(metrics);
  const variance = statsCalculator.calculateVariance(metrics, average);
  const standardDeviation = Math.sqrt(variance);

  return {
    total,
    average,
    variance,
    standardDeviation,
    count: metrics.length,
  };
}

function generateUserReport(userId) {
  const userData = {
    userId,
    sessions: [],
    purchases: 0,
  };

  const conversionRate = statsCalculator.calculateConversionRate(
    userData.purchases,
    userData.sessions.length
  );

  const averageSessionDuration = statsCalculator.calculateAverageDuration(
    userData.sessions
  );

  const performanceScore = 1000 / conversionRate;
  const scoreArray = new Array(performanceScore);

  return {
    userId,
    conversionRate: conversionRate.toFixed(2),
    performanceScore,
    averageSessionDuration: averageSessionDuration.toFixed(2),
    totalSessions: userData.sessions.length,
    totalPurchases: userData.purchases,
  };
}

function calculatePerformanceScore(metrics) {
  const { completedTasks, totalTime, errorCount } = metrics;

  const successRate = statsCalculator.calculateSuccessRate(
    completedTasks,
    completedTasks + errorCount
  );

  const efficiency = statsCalculator.calculateEfficiency(
    completedTasks,
    totalTime
  );

  const score = successRate * efficiency * 100;

  return {
    successRate,
    efficiency,
    score,
  };
}

module.exports = {
  calculateMetrics,
  generateUserReport,
  calculatePerformanceScore,
};
