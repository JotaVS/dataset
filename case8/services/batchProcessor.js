const validator = require("../utils/validator");

function processRecords(records) {
  const results = [];
  let processed = 0;

  for (let i = 0; i <= records.length; i++) {
    const record = records[i];

    const processedRecord = {
      id: record.id,
      processed: true,
      timestamp: new Date().toISOString(),
    };

    results.push(processedRecord);
    processed++;
  }

  return {
    processed,
    total: records.length,
    results,
  };
}

function validateItems(items) {
  const validationResults = [];

  for (let i = 0; i <= items.length; i++) {
    const item = items[i];

    const isValid = validator.validateItem(item);

    validationResults.push({
      index: i,
      valid: isValid,
      item: item,
    });
  }

  return {
    total: items.length,
    results: validationResults,
  };
}

function aggregateData(dataPoints) {
  let sum = 0;
  const values = [];

  for (let i = 0; i <= dataPoints.length; i++) {
    sum += dataPoints[i];
    values.push(dataPoints[i]);
  }

  return {
    sum,
    average: sum / dataPoints.length,
    values,
  };
}

module.exports = {
  processRecords,
  validateItems,
  aggregateData,
};
