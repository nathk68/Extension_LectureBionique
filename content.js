chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "applyBionicReading") {
      applyBionicReadingToSelection();
      sendResponse({ status: "done" });
    } else if (request.action === "applyBionicReadingToArticles") {
      applyBionicReadingToArticles();
      sendResponse({ status: "done" });
    }
  });
  
  function applyBionicReadingToSelection() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
  
    const range = selection.getRangeAt(0);
    const documentFragment = range.cloneContents();
    const nodes = documentFragment.childNodes;
  
    const bionicReading = (text) => {
      return text.split(' ').map(word => {
        let boldLength;
        if (word.length <= 3) {
          boldLength = 1;
        } else if (word.length === 4) {
          boldLength = 2;
        } else if (word.length <= 6) {
          boldLength = 3;
        } else if (word.length <= 8) {
          boldLength = 4;
        } else {
          boldLength = 5;
        }
        return `<b>${word.substring(0, boldLength)}</b>${word.substring(boldLength)}`;
      }).join(' ');
    };
  
    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const span = document.createElement('span');
        span.innerHTML = bionicReading(node.textContent);
        return span;
      } else {
        const newNode = node.cloneNode(false);
        node.childNodes.forEach(child => {
          newNode.appendChild(processNode(child));
        });
        return newNode;
      }
    }
  
    const fragment = document.createDocumentFragment();
    nodes.forEach(node => {
      fragment.appendChild(processNode(node));
    });
  
    range.deleteContents();
    range.insertNode(fragment);
  }
  
  function applyBionicReadingToArticles() {
    const paragraphs = document.querySelectorAll('p');
    console.log(paragraphs);
    paragraphs.forEach(paragraph => {
      const bionicReading = (text) => {
        return text.split(' ').map(word => {
          let boldLength;
          if (word.length <= 3) {
            boldLength = 1;
          } else if (word.length === 4) {
            boldLength = 2;
          } else if (word.length <= 6) {
            boldLength = 3;
          } else if (word.length <= 8) {
            boldLength = 4;
          } else {
            boldLength = 5;
          }
          return `<b>${word.substring(0, boldLength)}</b>${word.substring(boldLength)}`;
        }).join(' ');
      };
  
      paragraph.innerHTML = bionicReading(paragraph.innerHTML);
    });
  }
  