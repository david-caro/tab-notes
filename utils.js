let tabNotes = null;
document.addEventListener('DOMContentLoaded', function () {
  tabNotes = new TabNotes
  tabNotes.maybeFetchCardOfTheDay();
}, false);

const TabNotes = function () {
  const storage = chrome.storage.sync;

  async function fetchWordOfTheDay() {
    const res = await fetch('https://cors-anywhere.herokuapp.com/http://urban-word-of-the-day.herokuapp.com')
    const resJson = await res.json()
    storage.get('difficult', n => {
      const newNote = { question: resJson.word, answer: resJson.meaning, id: Date.now() };
      const difficultNotes = n.difficult;
      const updatedDifficultNotes = [newNote, ...difficultNotes];
      storage.set({ difficult: updatedDifficultNotes }, () => {
        chrome.storage.sync.get(null, function (data) {
          console.log("sotrage data", data)
        })
      });
    })
  }

  this.maybeFetchCardOfTheDay = function () {
    storage.get('lastNoteOfTheDayFetchedAt', function (e) {
      const oneDay = 24 * 60 * 60 * 1000;
      const now = Date.now();
      const lastNoteOfTheDayFetchedAt = e.lastNoteOfTheDayFetchedAt
      if (now - lastNoteOfTheDayFetchedAt < oneDay) {
        return;
      } else {
        fetchWordOfTheDay()
      }
    })
  }
}

