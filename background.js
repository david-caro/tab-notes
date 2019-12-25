
chrome.runtime.onInstalled.addListener(fetchAndStoreNotes);

async function fetchAndStoreNotes() {
  //TODO: New notes should perhaps be saved under `notes.difficult`
  chrome.storage.sync.set({ difficult: INITIAL_CARDS }, function () {
    //TODO: Remove this function
    chrome.storage.sync.get(null, function (data) {
      console.log("storage data", data)
    })
  });
  const installedOn = new Date();
  console.log(installedOn);
  chrome.storage.sync.set({ lastNoteOfTheDayFetchedAt: installedOn.toDateString() })
}
//
const INITIAL_CARDS = [
  {
    id: "1",
    question: "Some",
    answer: "Check if at least one element in an array satisfy the predicate"
  },
  {
    id: "2",
    question: "Includes",
    answer: "Check if array contains an element: arr<T>.includes(ele: T)"
  },
  {
    id: "3",
    question: "As you like it",
    answer: "Shakespeare"
  },
  {
    id: "4",
    question: "Clay",
    answer: "Noddy hampshire padington townhouse"
  },
  {
    id: "5",
    question: "Sincere",
    answer: "Zues pangea uranus mars athena apollo"
  },
];