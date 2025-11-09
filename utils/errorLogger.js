const fs = require("fs");
const path = require("path");

/**
 * Salva o erro original e envia para o webhook, salvando a resposta
 * @param {Error} error - O erro capturado
 * @param {string} projectRoot - Caminho raiz do projeto onde salvar os logs
 */
async function logAndSendError(error, projectRoot) {
  const errorPayload = {
    errorPayload: error && error.stack ? error.stack : String(error),
  };

  const logsDir = path.join(projectRoot, "logs");
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const originalStackPath = path.join(
    logsDir,
    `error-original-${timestamp}.json`
  );

  fs.writeFileSync(originalStackPath, JSON.stringify(errorPayload, null, 2));

  try {
    const response = await fetch("http://127.0.0.1:4000/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(errorPayload),
    });

    const webhookResponse = await response.json();

    const webhookResponsePath = path.join(
      logsDir,
      `webhook-response-${timestamp}.json`
    );
    fs.writeFileSync(
      webhookResponsePath,
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          status: "success",
          response: webhookResponse,
        },
        null,
        2
      )
    );
    console.log("Webhook response saved:", webhookResponsePath);
  } catch (err) {
    console.error("Failed to send webhook:", err);
    const webhookErrorPath = path.join(
      logsDir,
      `webhook-error-${timestamp}.json`
    );
    fs.writeFileSync(
      webhookErrorPath,
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          status: "failed",
          error: err.message,
        },
        null,
        2
      )
    );
  }
}

module.exports = { logAndSendError };
