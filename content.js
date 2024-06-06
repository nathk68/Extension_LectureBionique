chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "applyBionicReading") {
      applyBionicReadingToSelection();
      sendResponse({ status: "done" });
    }
  });
  
  function applyBionicReadingToSelection() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
  
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
  
    const bionicReading = (text) => {
      return text.split(' ').map(word => {
        if (word.length > 3) {
          return `<b>${word.substring(0, 3)}</b>${word.substring(3)}`;
        }
        return `<b>${word}</b>`;
      }).join(' ');
    };
  
    const span = document.createElement('span');
    span.innerHTML = bionicReading(selectedText);
    range.deleteContents();
    range.insertNode(span);
  }
  