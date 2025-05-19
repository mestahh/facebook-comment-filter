function extractFacebookIdFromComment(commentElement) {
  const profileLink = commentElement.querySelector('a[href*="facebook.com"][href*="/"]');

  if (profileLink) {
    const url = new URL(profileLink.href);
    const path = url.pathname; // e.g. /vica.sandor
    const id = path.split("/")[1]; // "vica.sandor"

    return id;
  }

  return null;
}

function hideBlacklistedCommentsById(blacklist) {
  const commentBlocks = document.querySelectorAll('div[aria-label^="Comment by "]');

  commentBlocks.forEach(comment => {
    const fbId = extractFacebookIdFromComment(comment);
    if (fbId && blacklist.includes(fbId)) {
      comment.style.display = "none";
      console.debug(`Comment by ID "${fbId}" hidden.`);
    }
  });
}

function observeCommentsById(blacklist) {
  const observer = new MutationObserver(() => {
    hideBlacklistedCommentsById(blacklist);
  });

  observer.observe(document.body, { childList: true, subtree: true });
  hideBlacklistedCommentsById(blacklist);
}

chrome.storage.local.get(["blacklist"], (result) => {
  const blacklist = result.blacklist || [];
  observeCommentsById(blacklist);
});