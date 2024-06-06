chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'bionicReading',
      title: 'Apply Bionic Reading',
      contexts: ['selection']
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'bionicReading') {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: applyBionicReading
      });
    }
  });
  
  function applyBionicReading() {
    const bionicReading = (text) => {
      return text.split(' ').map(word => {
        if (word.length > 3) {
          return `<b>${word.substring(0, 3)}</b>${word.substring(3)}`;
        }
        return `<b>${word}</b>`;
      }).join(' ');
    };
  
    document.body.innerHTML = bionicReading(document.body.innerHTML);
  }
  