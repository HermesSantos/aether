chrome.commands.onCommand.addListener((command) => {
  if (command === "show_input") {
    injectInputOverlay();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openTab') {
    chrome.tabs.create({ url: "https://www.google.com/search?q=" + encodeURIComponent(message.query) });
  }
});

chrome.action.onClicked.addListener((tab) => {
  injectInputOverlay();
});

function injectInputOverlay() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    });
  });
}
