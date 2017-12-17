import React from 'react';
import Deck from '../components/';

class DeckContainer extends React.Component {
	render() {
		const { navigation } = this.props;
		const title = navigation.state.params ? navigation.state.params.title : props.title;
		const cards = navigation.state.params ? navigation.state.params.cards : props.cards;
		return (
			<Deck
				title={title}
				cards={cards}
				navigation={navigation}
			/>
		);
	}
}

export default DeckContainer;
