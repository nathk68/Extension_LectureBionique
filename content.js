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
    const documentFragment = range.cloneContents();
    const nodes = documentFragment.childNodes;
  
    // Function to apply bionic reading to text
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
  
    // Function to recursively process each node
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
  
    // Create a document fragment to hold the new nodes
    const fragment = document.createDocumentFragment();
  
    // Process each node in the selection
    nodes.forEach(node => {
      fragment.appendChild(processNode(node));
    });
  
    // Replace the selected range with the new fragment
    range.deleteContents();
    range.insertNode(fragment);
  }
  