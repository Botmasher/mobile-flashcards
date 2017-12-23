import React from 'react';
import { View } from 'react-native';
import Deck from '../components/';
import Header from '../../header/components';
import { _removeCard } from '../../utils/api';
import { dealCardsIntoDecks } from '../../utils/helpers';
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
			_removeCard(this.state.focusedCardId).then(updatedCards => {
				this.props.navigation.navigate('Deck', {
					deck: this.props.navigation.state.params.deck,
					cards: updatedCards
				});
			});
		}
	};
	render() {
		const { navigation } = this.props;
		const { deck, cards } = navigation.state.params;
		const cardsPerDeck = dealCardsIntoDecks(cards);
		return (
			<View style={{flex: 1, flexDirection: 'column'}}>
				<Header navigation={navigation} showTitle={true} subtitle={`${deck.name}`} />
				<Deck
					deck={deck}
					allCards={cards}
					cardsInDeck={cardsPerDeck[deck.id]}
					navigation={navigation}
					openModal={this.openModal}
					closeModal={this.closeModal}
					modal={this.state.modal}
				/>
			</View>
		);
	}
}

DeckContainer.propTypes = {
	navigation: PropTypes.object.isRequired
};

export default DeckContainer;
