import React from 'react';
import ComponentsTest from '../components/';
import {
	_fetchDecks,
	_fetchCards,
	_addDeck,
	_addCard,
	_updateDeck,
	_updateCard,
	_clearDecks,
	_clearCards,
	_removeDeck,
	_removeCard
} from '../../utils/api';
import { countCardsPerDeck } from '../../utils/helpers';

class ComponentsTestContainer extends React.Component {
	state = {
		decks: {},
		cards: {}
	};
	componentDidMount() {
		this.fetchDecks();
		this.fetchCards();
	}
	fetchDecks = () => {
		_fetchDecks().then(data => this.setState({decks: data}));
	};
	fetchCards = () => {
		_fetchCards().then(data => this.setState({cards: data}));
	};
	addDeck = (deckName) => {
		_addDeck(deckName).then(data => this.setState({decks: data}));
	};
	addCard = (deckId, question, answer) => {
		_addCard(deckId, question, answer).then(data => this.setState({cards: data}));
	};
	updateDeck = (deckId, newName) => {
		_updateDeck(deckId, newName).then(data => this.setState({decks: data}));
	};
	updateCard = (cardId, question=null, answer=null) => {
		_updateCard(cardId, question, answer).then(data => this.setState({cards: data}));
	};
	clearDecks = () => {
		_clearDecks().then(() => this.setState({decks: {}}));
	};
	clearCards = () => {
		_clearCards().then(() => this.setState({cards: {}}));
	};
	removeDeck = (deckId) => {
		_removeDeck(deckId).then(decksAndCardsData => this.setState(decksAndCardsData));
	};
	removeCard = (cardId) => {
		_removeCard(cardId).then(data => this.setState({cards: data}));
	};
	render() {
		const { decks, cards } = this.state;
		const cardsPerDeck = countCardsPerDeck(cards);
		return (
			<ComponentsTest
				decks={decks}
				cards={cards}
				cardsPerDeck={cardsPerDeck}
				addDeck={this.addDeck}
				addCard={this.addCard}
				updateDeck={this.updateDeck}
				updateCard={this.updateCard}
				clearDecks={this.clearDecks}
				clearCards={this.clearCards}
				removeDeck={this.removeDeck}
				removeCard={this.removeCard}
			/>
		);
	}
}

export default ComponentsTestContainer;
