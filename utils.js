let tabNotes = null;
document.addEventListener('DOMContentLoaded', function () {
  tabNotes = new TabNotes
  tabNotes.maybeFetchNoteOfTheDay();
}, false);

const TabNotes = function () {
  const storage = chrome.storage.sync;

  async function fetchWordOfTheDay() {
    const res = await fetch('https://cors-anywhere.herokuapp.com/http://urban-word-of-the-day.herokuapp.com')
    const resJson = await res.json()
    storage.get('difficult', n => {
      const now = new Date();
      const newNote = { question: resJson.word, answer: resJson.meaning, id: now.getTime() };
      const difficultNotes = n.difficult;
      const updatedDifficultNotes = [newNote, ...difficultNotes];
      storage.set({ difficult: updatedDifficultNotes, lastNoteOfTheDayFetchedAt: now.toDateString }, () => {
        chrome.storage.sync.get(null, function (data) {
          console.log("sotrage data", data)
        })
      });
    })
  }

  this.maybeFetchNoteOfTheDay = function () {
    storage.get('lastNoteOfTheDayFetchedAt', function (e) {
      const oneDay = 24 * 60 * 60 * 1000;
      const now = new Date();
      const lastNoteFetchedAt = new Date(e.lastNoteOfTheDayFetchedAt);
      console.log(new Date(lastNoteFetchedAt));
      if (now.getTime() - lastNoteFetchedAt.getTime() >= oneDay) {
        fetchWordOfTheDay()
      } else {
        return;
      }
    })
  }
}

