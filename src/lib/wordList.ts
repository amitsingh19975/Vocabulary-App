import { readable, writable } from "svelte/store";
import type { WordHistory, WordSchema } from '../model/wordsSchema';
import { browser } from '$app/environment';
import defaultWordList from '../data/words';

const DEFAULT_WORD_LIST = fixWords(defaultWordList);

function getItemLocalStorageFromLocalStorage(key: string) {
    if (!browser) return;
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(value);
    return null;
}

function setItemToLocalStorage(key: string, data: unknown) {
    if (!browser || data == null) return;
    const value = JSON.stringify(data);
    localStorage.setItem(key, value);
}

function createWordHistory() {
    const { subscribe, update, set } = writable<WordHistory[]>([], (set) => {
        try {
            const words = getItemLocalStorageFromLocalStorage("history");
            if (words) set(words);
        } catch (error) {
            console.error(error);
        }
    });

    function addWord(word: WordHistory) {
        update((words) => {
            const newWords = [word, ...words];
            try {
                setItemToLocalStorage("history", newWords);
            } catch (error) {
                console.error(error);
            }
            return newWords;
        });
    }

    function updateWord(word: WordHistory) {
        update((words) => {
            const newWords = words.map((item) => {
                if (item.word === word.word) return word;
                return item;
            });
            try {
                setItemToLocalStorage("history", newWords);
            } catch (error) {
                console.error(error);
            }
            return newWords;
        });
    };

    function upsertWord(word: WordHistory) {
        update((words) => {
            const index = words.findIndex((item) => item.word === word.word);
            if (index === -1) return [word, ...words];
            words[index] = word;
            return words;
        });
    }

    function setWords(words: WordHistory[]) {
        set(words);
        try {
            setItemToLocalStorage("history", words);
        } catch (error) {
            console.error(error);
        }
    }

    return {
        subscribe,
        addWord,
        updateWord,
        upsertWord,
        set: setWords
    }
}

function fixWords(words: WordSchema[][]) {
    const temp: WordSchema[] = [];
    for (const list of words) {
        for (const word of list) {
            word.word = word.word.toLowerCase();
            word?.otherForms?.forEach((item) => {
                item.word = item.word.toLowerCase();
            });
            temp.push(word);
        }
    }
    return temp;
}

function createWordList(words: WordSchema[] = []) {
    const tempWords = [...DEFAULT_WORD_LIST, ...fixWords([words])]
        .sort((a, b) => a.word.localeCompare(b.word));
    return readable<WordSchema[]>(tempWords);
}

export const wordList = createWordList();
export const wordHistory = createWordHistory();