import React from 'react';
import { AsyncStorage } from 'react-native';
import DeckList from '../components/';
import uuid from 'uuid/v4';

const DECK_STORAGE_KEY = 'decks';
const CARD_STORAGE_KEY = 'cards';

function countCardsPerDeck (cards, decks={}) {
	// Reduce over cardIds to store lists of cards per deck
		// shape of resulting counts obj:  { deckId0: [cardId0, ... cardId_n], ... deckId_n: [cardId_0, ... cardId_n] }
	const cardsPerDeck = Object.keys(cards).reduce((allDealtCards, cardId) => {
		return {
			...allDealtCards,
			...cards[cardId].decks.reduce((decksWithThisCard, deckId) => {
				return {
					...decksWithThisCard,
					[deckId]: allDealtCards[deckId] ? [...allDealtCards[deckId], cardId] : [cardId]
				};
			}, {})
		};
	}, {});
	return (cardsPerDeck);
}

async function _fetchDecks (updateUI) {
	// grab everything at all keys
	//const allKeys = await AsyncStorage.getAllKeys();
	//const response = await AsyncStorage.multiGet(allKeys);
	//const decks = await JSON.parse(response[0][1]) || {}; 	// IF 'decks' stored within first key
			// this is because response is [[k0, v0], [k1, v1], ...] where unparsed v0 is '{'deckId': 'deckTxt'}'
	// grab all decks
  const response = await AsyncStorage.getItem(DECK_STORAGE_KEY);
  const decks = await JSON.parse(response) || {};
  updateUI(decks);
}

async function _fetchCards(updateUI) {
	const response = await AsyncStorage.getItem(CARD_STORAGE_KEY);
	const cards =  await JSON.parse(response) || {};
	updateUI(cards);
}

async function _addDeck(decks, name, updateUI) {
	const updatedDecks = {
		...decks,
		[uuid()]: {name}
	};
	await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(updatedDecks));
	updateUI(updatedDecks);
}

async function _addCard(cards, deckId, question, answer, updateUI) {
	// PROBLEM: what if there are no decks to add to? then what do you do with a card??
	// 	- enforce adding to a single starter deck OR only possible to add through a deck's ui
	const updatedCards = {
		...cards,
		[uuid()]: {
			question,
			answer,
			decks: [deckId]
		}
	};
	await AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify(updatedCards));
	updateUI(updatedCards);
}

async function _updateDeck(decks, deckId, name, updateUI) {
	const updatedDecks = {
		...decks,
		[deckId]: {name}
	};
	await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(updatedDecks));
	updateUI(updatedDecks);
}

async function _updateCard(cards, cardId, updateUI, question=null, answer=null) {
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
	updateUI(updatedCards);
}

async function _addCardToDeck(cards, cardId, deckId, updateUI) {
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
	updateUI(updatedCards);
}

async function _clearDecks(clearUI) {
	await AsyncStorage.removeItem(DECK_STORAGE_KEY);
	clearUI();
}

async function _clearCards(clearUI) {
	await AsyncStorage.removeItem(CARD_STORAGE_KEY);
	clearUI();
}

async function _clearAll (clearUI) {
	const allKeys = await AsyncStorage.getAllKeys();
	await AsyncStorage.multiRemove(allKeys);
	clearUI();
}

class DeckListContainer extends React.Component {
	state = {
		decks: {},
		cards: {}
	};
	componentDidMount() {
		this.fetchDecks();
		this.fetchCards();
	}
	setDecks = (decks={}) => {
		this.setState({decks});
	};
	setCards = (cards={}) => {
		this.setState({cards});
	};
	fetchDecks = () => {
		_fetchDecks(this.setDecks);
	};
	fetchCards = () => {
		_fetchCards(this.setCards);
	};
	addDeck = (deckName) => {
		_addDeck(this.state.decks, deckName, this.setDecks);
	};
	addCard = (deckId, question, answer) => {
		_addCard(this.state.cards, deckId, question, answer, this.setCards);
	};
	updateDeck = (deckId, newName) => {
		_updateDeck(this.state.decks, deckId, newName, this.setDecks);
	};
	updateCard = (cardId, question=null, answer=null) => {
		_updateCard(this.state.cards, cardId, this.setCards, question, answer);
	};
	clearDecks = () => {
		_clearDecks(this.setDecks);
	};
	clearCards = () => {
		_clearCards(this.setCards);
	};
	render() {
		const { decks, cards } = this.state;
		const cardsPerDeck = countCardsPerDeck(cards);
		return (
			<DeckList
				decks={decks}
				cards={cards}
				cardsPerDeck={cardsPerDeck}
				addDeck={this.addDeck}
				addCard={this.addCard}
				updateDeck={this.updateDeck}
				updateCard={this.updateCard}
				clearDecks={this.clearDecks}
				clearCards={this.clearCards}
			/>
		);
	}
}

export default DeckListContainer;
