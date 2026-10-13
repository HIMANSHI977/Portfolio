/* Runs in <head> so the saved theme is applied before the first paint (no flash). */
(function () {
  var t = null;
  try {
    t = localStorage.getItem("theme");
  } catch (e) {}
  if (t !== "light" && t !== "dark") {
    t = window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  document.documentElement.dataset.theme = t;
  document.documentElement.classList.add("js");
})();
