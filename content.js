console.log("Content is loaded");

chrome.storage.local.get('jsonData', function(result) {
  let jsonData = result.jsonData;
  console.log("JSON data loaded", jsonData);

  if (jsonData) {
    document.addEventListener('selectionchange', function() {
        const selectedText = window.getSelection().toString().trim();
        console.log("Selected text: ", selectedText); 
        if (!selectedText) { 
            removePopup();
        }
        if (selectedText && jsonData[selectedText]) {
            console.log(jsonData[selectedText]);
            showPopup(jsonData[selectedText]);
          } else {
            console.log("Selected text not found in JSON data");
          }
    });
  } else {
    console.log("JSON data is not defined");
  }
});

function showPopup(text) {
  let popup = document.createElement('div');
  popup.className = 'popup';
  popup.id = 'cluster-popup';
  popup.innerText = text;

  document.body.appendChild(popup);

  const range = window.getSelection().getRangeAt(0);
  const rect = range.getBoundingClientRect();
  const popupHeight = popup.offsetHeight;
  
  popup.style.left = rect.left + window.scrollX + 'px';
  popup.style.top = rect.top + window.scrollY - popupHeight - 10 + 'px'; // 10 pixels above the selection

//   setTimeout(() => {
//     document.body.removeChild(popup);
//   }, 3000); // Popup disappears after 3 seconds
}

function removePopup() { 
    const popup = document.getElementById('cluster-popup'); 
    if (popup) { 
        document.body.removeChild(popup); 
    }
}
