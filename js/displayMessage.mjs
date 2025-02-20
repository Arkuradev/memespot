export function displayMessage(selector, type = "info", text) {
  const messageContainer = document.querySelector(selector);
  if (!messageContainer) return;

  // Set the message text
  messageContainer.textContent = text;

  // Apply classes based on message type
  messageContainer.className = `message ${type}`;

  // Auto-remove message after 5 seconds.
  setTimeout(() => {
    messageContainer.textContent = "";
    messageContainer.className = "";
  }, 5000);
}
