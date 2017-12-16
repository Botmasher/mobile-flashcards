import React from 'react';
import Deck from '../components/';

class DeckContainer extends React.Component {
	render() {
		const { title, cards } = this.props;
		return (
			<Deck
				title={title}
				cards={cards}
			/>
		);
	}
}

export default DeckContainer;
