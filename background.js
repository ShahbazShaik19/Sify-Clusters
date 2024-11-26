chrome.runtime.onInstalled.addListener(() => {
    fetch(chrome.runtime.getURL('database.json'))
      .then(response => response.json())
      .then(data => {
        console.log("Data fetched by background script", data);
        chrome.storage.local.set({ jsonData: data });
      });
  });
  