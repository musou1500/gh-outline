
chrome.webNavigation.onHistoryStateUpdated.addListener(e => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    const message = { type: "musou1500/gh-outline: onHistoryStateUpdated" };
    chrome.tabs.sendMessage(tabs[0].id, message, () => {});
  });
});
