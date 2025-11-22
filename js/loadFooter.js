// ============================================
// loadFooter.js — Clean Optimized Version
// Loads footer, then dispatches “footerLoaded”
// ============================================

fetch("partials/footer.html")
  .then(res => res.text())
  .then(data => {
    const footerRoot = document.getElementById("footer");
    if (!footerRoot) return;

    footerRoot.innerHTML = data;

    // Footer is ready — other scripts may listen for this
    document.dispatchEvent(new CustomEvent("footerLoaded"));
  })
  .catch(err => {
    console.error("Could not load footer:", err);
  });
