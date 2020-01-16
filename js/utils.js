import {LevelEnum} from './constants.js';
import {View} from './view.js';

let tabNotes = null;
document.addEventListener('DOMContentLoaded', function() {

  tabNotes = new TabNotes
  tabNotes.maybeFetchNoteOfTheDay();
  tabNotes.getANote();

  document.getElementById('show').onclick = tabNotes.showAnswer;
  document.querySelectorAll('#levels-container a').forEach(level => {
    level.onclick = tabNotes.onSelectLevel.bind(this, event)
  });
}, false);

const TabNotes = function() {
  const storage = chrome.storage.sync;
  const view = new View();

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
    console.log("maybeFeathc")
    storage.get('lastNoteOfTheDayFetchedAt', function (e) {
      const oneDay = 24 * 60 * 60 * 1000;
      const now = new Date();
      const lastNoteFetchedAt = new Date(e.lastNoteOfTheDayFetchedAt);
      if (now.getTime() - lastNoteFetchedAt.getTime() >= oneDay) {
        fetchWordOfTheDay()
      } else {
        return;
      }
    })
  }

  this.getANote = function () {
    storage.get('mnemonicSequence', function (data) {
      const levelToShow = data.mnemonicSequence[0];
      storage.get(levelToShow, function (data) {
        view.showNoteQuestion(data[levelToShow][0].question);
      })
    })
  }

  this.showAnswer = function() {
    storage.get('mnemonicSequence', function(data) {
      const levelToShow = data.mnemonicSequence[0];
      storage.get(levelToShow, function(data) {
        view.showNoteAnswer(data[levelToShow][0].answer);
      })
    })
  }

  this.onSelectLevel = function(_, event) {
    const selectedLevel = event.target.id;
    storage.set
  }
}

