chrome.runtime.onInstalled.addListener(fetchAndStoreNotes);

async function fetchAndStoreNotes() {
  const notes = await fetch('https://tab-notes-dad94.firebaseio.com/notes.json');
  const notesJson = await notes.json();
  //TODO: New notes should perhaps be saved under `notes.difficult`
  chrome.storage.sync.set({ notes: { difficult: notesJson } }, function () {
    //TODO: Remove this function
    chrome.storage.sync.get(null, function (data) {
      console.log("sotrage data", data)
    })
  });
}
