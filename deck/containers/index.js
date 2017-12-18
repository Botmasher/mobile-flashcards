import React from 'react';
import Deck from '../components/';

class DeckContainer extends React.Component {
	render() {
		const { navigation } = this.props;
		const deck = navigation.state.params ? navigation.state.params.deck : props.deck;
		const cards = navigation.state.params ? navigation.state.params.cards : props.cards;
		return (
			<Deck
				deck={deck}
				cards={cards}
				navigation={navigation}
			/>
		);
	}
}

export default DeckContainer;
