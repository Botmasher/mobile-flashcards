import React from 'react';
import DeckList from '../components/';
import { _fetchDecks, _fetchCards } from '../../utils/api';

class DeckListContainer extends React.Component {
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
	render() {
		const { decks, cards } = this.state;
		return (
			<DeckList
				decks={decks}
				cards={cards}
			/>
		);
	}
}

export default DeckListContainer;
