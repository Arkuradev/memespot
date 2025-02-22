export function displayMessage(selector, type = "info", text) {
  const messageContainer = document.querySelector(selector);
  if (!messageContainer) return;

  messageContainer.textContent = text;

  // Apply classes based on message type
  messageContainer.className = `message ${type}`;

  setTimeout(() => {
    messageContainer.textContent = "";
    messageContainer.className = "";
  }, 2000);
}
