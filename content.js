function render() {
  const oldRoot = document.querySelector(".gh-outline-root");
  if (oldRoot) {
    oldRoot.remove();
  }

  const {host, pathname} = document.location;
  if (host !== "github.com" || !pathname.endsWith(".md")) {
    return;
  }

  const mdBody = document.querySelector("article.markdown-body");
  const query = ["h1", "h2", "h3", "h4", "h5", "h6"].join(",");
  const headlines = mdBody.querySelectorAll(query);
  const toc = Array.from(headlines).map(hl => ({
    lv: +hl.tagName[1], text: hl.textContent
  }));

  if (toc.length <= 0) {
    return;
  }

  const mainEl = document.querySelector("main");
  const container = document.querySelector("main").parentElement;
  container.style.display = "flex";
  mainEl.style.flex = "1";

  // render toc
  const rootEl = document.createElement("div");
  rootEl.classList.add("gh-outline-root"); 
  for (let item of toc) {
    const el = document.createElement("p");
    el.classList.add("gh-outline-item", `lv-${item.lv}`);
    el.textContent = item.text;
    rootEl.append(el);
  }

  container.prepend(rootEl);
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type !== "musou1500/gh-outline: onHistoryStateUpdated") {
    sendResponse({});
    return;
  }

  render();
  sendResponse({});
});

render();