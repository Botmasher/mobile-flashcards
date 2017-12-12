import React from 'react';
import { AsyncStorage } from 'react-native';
import DeckList from '../components/';

const DECK_STORAGE_KEY = 'decksList';

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

async function _addDeck (decks, key, deck, updateUI) {
	const updatedDecks = {...decks, [key]: deck};
	await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(updatedDecks));
	updateUI(updatedDecks);
}

async function _clearDecks (clearUI) {
	const allKeys = await AsyncStorage.getAllKeys();
	await AsyncStorage.multiRemove(allKeys);
	clearUI();
}

class DeckListContainer extends React.Component {
	state = {
		decks: {}
	};
	componentDidMount() {
		this.fetchDecks(this.updateDecks);
	}
	updateDecks = (decks={}) => {
		this.setState({decks});
	};
	fetchDecks = () => {
		_fetchDecks(this.updateDecks);
	};
	addDeck = (key, deck) => {
		_addDeck(this.state.decks, key, deck, this.updateDecks);
	};
	clearDecks = () => {
		_clearDecks(this.updateDecks);
	};
	render() {
		console.log(this.state.decks);
		return <DeckList decks={this.state.decks} addDeck={this.addDeck} clearDecks={this.clearDecks} />;
	}
}

export default DeckListContainer;
