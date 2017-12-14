import React from 'react';
import { AsyncStorage } from 'react-native';
import DeckList from '../components/';
import uuid from 'uuid/v4';

const DECK_STORAGE_KEY = 'decks';
const CARD_STORAGE_KEY = 'cards';

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
	const cards = await JSON.parse(AsyncStorage.getItem(CARD_STORAGE_KEY)) || {};
	updateUI(cards);
}

async function _addDeck(decks, deckName, updateUI) {
	const updatedDecks = {
		...decks,
		[uuid()]: deckName
	};
	await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(updatedDecks));
	updateUI(updatedDecks);
}

async function _addCard(cards, deckId, question, answer, updateUI) {
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
		[deckId]: deckName
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
				...oldCard.decks,
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
		this.fetchDecks(this.updateDecks);
	}
	updateDecks = (decks={}) => {
		this.setState({decks});
	};
	updateCards = (cards={}) => {
		this.setState({cards});
	};
	fetchDecks = () => {
		_fetchDecks(this.updateDecks);
	};
	addDeck = (deckName) => {
		_addDeck(this.state.decks, deckName, this.updateDecks);
	};
	addCard = (deckId, question, answer) => {
		_addCard(this.state.cards, deckId, question, answer, updateCards);
	};
	clearDecks = () => {
		_clearDecks(this.updateDecks);
	};
	clearCards = () => {
		_clearCards(this.updateCards);
	}
	render() {
		console.log(this.state.decks);
		return <DeckList decks={this.state.decks} addDeck={this.addDeck} clearDecks={this.clearDecks} />;
	}
}

export default DeckListContainer;
