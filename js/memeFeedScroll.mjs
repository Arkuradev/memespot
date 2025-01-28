document.addEventListener("DOMContentLoaded", () => {
  const memeFeed = document.getElementById("memeFeed");

  //Event listener for arrow key navigation

  if (!memeFeed) {
    console.error("Meme feed container not found!");
    return;
  }

  // Function to handle snapping to the next/previous meme.
  function scrollToPost(direction) {
    const postHeight = window.innerHeight;
    memeFeed.scrollBy({
      top: direction * postHeight,
      behavior: "smooth",
    });
  }

  // Keyboard / Arrow key navigation.
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      scrollToPost(1); // Scroll down.
    } else if (event.key === "ArrowUp") {
      // Scroll to previous meme
      scrollToPost(-1);
    }
  });

  // Scroll wheel navigation
  let debounce = false; // Prevent spamming scroll events.
  memeFeed.addEventListener(
    "wheel",
    (event) => {
      if (debounce) return;
      debounce = true;

      if (event.deltaY > 0) {
        scrollToPost(1); // Scroll down
      } else if (event.deltaY < 0) {
        scrollToPost(-1); // Scroll up
      }

      setTimeout(() => (debounce = false), 500); // Reset debounce.
    },
    { passive: true }
  );
});
