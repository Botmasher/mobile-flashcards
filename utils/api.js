import { AsyncStorage } from 'react-native';
import uuid from 'uuid/v4';

export const DECK_STORAGE_KEY = 'decks';
export const CARD_STORAGE_KEY = 'cards';

export async function _fetchDecks () {
  const response = await AsyncStorage.getItem(DECK_STORAGE_KEY);
  const decks = await JSON.parse(response) || {};
  return decks;
}

export async function _fetchCards() {
	const response = await AsyncStorage.getItem(CARD_STORAGE_KEY);
	const cards =  await JSON.parse(response) || {};
	return cards;
}

export async function _addDeck(name) {
	const response = await AsyncStorage.getItem(DECK_STORAGE_KEY);
	const decks = await JSON.parse(response) || {};
	const newDeckId = uuid();
	const updatedDecks = {
		...decks,
		[newDeckId]: {
			id: newDeckId,
			name,
			timestamp: Date.now()
		}
	};
	await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(updatedDecks));
	return updatedDecks;
}

export async function _addCard(deckId, question, answer) {
	const response = await AsyncStorage.getItem(CARD_STORAGE_KEY);
	const cards = await JSON.parse(response) || {};
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
	await AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify(updatedCards));
	return updatedCards;
}

export async function _updateDeck(deckId, name) {
	const response = await AsyncStorage.getItem(DECK_STORAGE_KEY);
	const decks = await JSON.parse(response) || {};
	const updatedDecks = {
		...decks,
		[deckId]: {name}
	};
	await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(updatedDecks));
	return updatedDecks;
}

export async function _updateCard(cardId, question=null, answer=null) {
	const response = await AsyncStorage.getItem(CARD_STORAGE_KEY);
	const cards = await JSON.parse(response) || {};
	const oldCard = cards[cardId];
	const updatedCards = {
		...cards,
		[cardId]: {
			...oldCard,
			question: question ? question : oldCard.question,
			answer: answer ? answer : oldCard.answer
		}
	};
	await AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify(updatedCards));
	return updatedCards;
}

export async function _addCardToDeck(cardId, deckId) {
	const response = await AsyncStorage.getItem(CARD_STORAGE_KEY);
	const cards = await JSON.parse(response) || {};
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
	await AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify(updatedCards));
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

// DRY this - use Card/Deck update
export async function _removeDeck(deckId) {
	const decksResponse = await AsyncStorage.getItem(DECK_STORAGE_KEY);
	const decks = await JSON.parse(decksResponse) || {};
	const updatedDecks = Object.keys(decks)
		.filter(id => id !== deckId)
		.reduce((filteredDecks, id) => ({...filteredDecks, [id]: decks[id]}), {});
	await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(updatedDecks));
	// also remove the deck from cards that have it
	const cardsResponse = await AsyncStorage.getItem(CARD_STORAGE_KEY);
	const cards = await JSON.parse(cardsResponse) || {};
	const updatedCards = Object.keys(cards).reduce((deckedCards, cardId) => {
		return {
			...deckedCards,
			[cardId]: {
				...cards[cardId],
				decks: cards[cardId].decks.filter(id => id !== deckId)
			}
		};
	}, {});
	await AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify(updatedCards));
	return {decks: updatedDecks, cards: updatedCards};
}

export async function _removeCard(cardId) {
	const response = await AsyncStorage.getItem(CARD_STORAGE_KEY);
	const cards = await JSON.parse(response) || {};
	const updatedCards = Object.keys(cards)
		.filter(id => id !== cardId)
		.reduce((filteredCards, id) => ({...filteredCards, [id]: cards[id]}), {});
	await AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify(updatedCards));
	return updatedCards;
}
