document.getElementById('applyBionic').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "applyBionicReading" });
    });
  });

document.getElementById('applyBionicToArticles').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "applyBionicReadingToArticles" });
    });
});
  
//   document.getElementById('applyBionicToArticles').addEventListener('click', () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (tabs.length > 0) {
//         console.log("Sending message to content script for articles");
//         chrome.tabs.sendMessage(tabs[0].id, { action: "applyBionicReadingToArticles" }, (response) => {
//           if (chrome.runtime.lastError) {
//             console.error("Error sending message:", chrome.runtime.lastError.message);
//           } else {
//             console.log("Response from content script:", response.status);
//           }
//         });
//       }
//     });
//   });
  
