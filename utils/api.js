import { AsyncStorage } from 'react-native';
import uuid from 'uuid/v4';

export const DECK_STORAGE_KEY = 'decks';
export const CARD_STORAGE_KEY = 'cards';

async function _fetch (storageKey) {
  const response = await AsyncStorage.getItem(storageKey);
  const data = await JSON.parse(response) || {};
  return data;
}

async function _merge(storageKey, updatedData) {
	await AsyncStorage.mergeItem(storageKey, JSON.stringify(updatedData));
}

export async function _fetchDecks () {
	const decks = await _fetch(DECK_STORAGE_KEY);
	return decks;
}

export async function _fetchCards() {
	const cards = await _fetch(CARD_STORAGE_KEY);
	return cards;
}

async function _mergeCards(cards) {
	await _merge(CARD_STORAGE_KEY, cards);
}

async function _mergeDecks(decks) {
	await _merge(DECK_STORAGE_KEY, decks);
}

export async function _addDeck(name) {
	const decks = await _fetchDecks();
	const newDeckId = uuid();
	const updatedDecks = {
		...decks,
		[newDeckId]: {
			id: newDeckId,
			name,
			timestamp: Date.now()
		}
	};
	await _mergeDecks(updatedDecks);
	return updatedDecks;
}

export async function _addCard(deckId, question, answer) {
	const cards = await _fetchCards();
	const newCardId = uuid();
	const updatedCards = {
		...cards,
		[newCardId]: {
			id: newCardId,
			question,
			answer,
			decks: [deckId],
			timestamp: Date.now()
		}
	};
	await _mergeCards(updatedCards);
	return updatedCards;
}

export async function _updateDeck(deckId, name) {
	const decks = await _fetchDecks();
	const updatedDecks = {
		...decks,
		[deckId]: {name}
	};
	await _mergeDecks(updatedDecks);
	return updatedDecks;
}

export async function _updateCard(cardId, question=null, answer=null) {
	const cards = await _fetchCards();
	const oldCard = cards[cardId];
	const updatedCards = {
		...cards,
		[cardId]: {
			...oldCard,
			question: question ? question : oldCard.question,
			answer: answer ? answer : oldCard.answer
		}
	};
	await _mergeCards(updatedCards);
	return updatedCards;
}

export async function _addCardToDeck(cardId, deckId) {
	const cards = _fetchCards();
	const oldCard = cards[cardId];
	const updatedCards = {
		...cards,
		[cardId]: {
			...oldCard,
			decks: [
				...oldCard.decks.filter(assignedDeck => assignedDeck !== deckId),
				deckId
			]
		}
	};
	await _mergeCards(updatedCards);
	return updatedCards;
}

export async function _clearDecks() {
	await AsyncStorage.removeItem(DECK_STORAGE_KEY);
}

export async function _clearCards() {
	await AsyncStorage.removeItem(CARD_STORAGE_KEY);
}

export async function _clearAll () {
	const allKeys = await AsyncStorage.getAllKeys();
	await AsyncStorage.multiRemove(allKeys);
}

export async function _removeDeck(deckId) {
	const decks = await _fetchDecks();
	const updatedDecks = Object.keys(decks)
		.filter(id => id !== deckId)
		.reduce((filteredDecks, id) => ({...filteredDecks, [id]: decks[id]}), {});
	await _mergeDecks(updatedDecks);
	// also remove the deck from cards that have it
	const cards = await _fetchCards();
	const updatedCards = Object.keys(cards).reduce((deckedCards, cardId) => {
		return {
			...deckedCards,
			[cardId]: {
				...cards[cardId],
				decks: cards[cardId].decks.filter(id => id !== deckId)
			}
		};
	}, {});
	await _mergeCards(updatedCards);
	return {decks: updatedDecks, cards: updatedCards};
}

export async function _removeCard(cardId) {
	const cards = await _fetchCards();
	const updatedCards = Object.keys(cards)
		.filter(id => id !== cardId)
		.reduce((filteredCards, id) => ({...filteredCards, [id]: cards[id]}), {});
	await _mergeCards(updatedCards);
	return updatedCards;
}
