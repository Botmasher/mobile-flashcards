import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { countCardsPerDeck } from '../../utils/helpers';

function DeckList(props) {
	const { decks, cards, navigation } = props;
	const cardsPerDeck = countCardsPerDeck(cards);
	return (
		<View style={styles.container}>	
			<Text>Deck List View (default view)</Text>
			{Object.keys(decks).map(deckId => (
				<TouchableOpacity
					key={deckId}
					onPress={() => (
						navigation.navigate(
							'Deck',
							{ title: decks[deckId].name, cards }
						)
					)}
				>
					<Text>
						Deck {decks[deckId].name} has {cardsPerDeck[deckId] ? cardsPerDeck[deckId].length : 0} cards
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 0,
		marginTop: 30,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default DeckList;
