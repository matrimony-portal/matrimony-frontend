// Basic JavaScript for interactivity
document.addEventListener("DOMContentLoaded", function () {
  console.log("Matrimony Frontend loaded successfully!");

  // Example: Add event listener to header
  const header = document.querySelector("header h1");
  header.addEventListener("click", function () {
    alert("Welcome to the Matrimony App!");
  });
});
