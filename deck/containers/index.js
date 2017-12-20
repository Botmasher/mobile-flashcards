import React from 'react';
import Deck from '../components/';
import { _removeCard } from '../../utils/api';
import PropTypes from 'prop-types';

class DeckContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			focusedCardId: ''
		};
	}
	openModal = (cardId) => {
		this.setState({modal: true, focusedCardId: cardId});
	};
	closeModal = (removeCard) => {
		this.setState({modal: false});
		if (removeCard) {
			_removeCard(this.state.focusedCardId).then(() => {
				this.props.navigation.navigate('Home');
			});
		}
	};
	render() {
		const { navigation } = this.props;
		const deck = navigation.state.params ? navigation.state.params.deck : props.deck;
		const cards = navigation.state.params ? navigation.state.params.cards : props.cards;
		return (
			<Deck
				deck={deck}
				cards={cards}
				navigation={navigation}
				openModal={this.openModal}
				closeModal={this.closeModal}
				modal={this.state.modal}
			/>
		);
	}
}

DeckContainer.propTypes = {
	navigation: PropTypes.object.isRequired
};

export default DeckContainer;
