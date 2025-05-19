document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("blacklist");
  const saveBtn = document.getElementById("save");

  chrome.storage.local.get(["blacklist"], (result) => {
    textarea.value = (result.blacklist || []).join("\n");
  });

  saveBtn.addEventListener("click", () => {
    const names = textarea.value.split("\n").map(n => n.trim()).filter(n => n);
    chrome.storage.local.set({ blacklist: names }, () => {
      alert("Harcosok mentve!");
    });
  });
});