export const apiDelay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));
