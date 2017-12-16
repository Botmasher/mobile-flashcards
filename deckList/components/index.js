import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function DeckList(props) {
	const { decks, cards, cardsPerDeck } = props;
	return (
		<View style={styles.container}>
			
			<Text>Deck List View (default view)</Text>

			{Object.keys(decks).map(deckId => (
				<View key={deckId} style={{padding: 12}}>
					<Text>
						Deck {decks[deckId].name} has {cardsPerDeck[deckId] ? cardsPerDeck[deckId].length : 0} cards
					</Text>
					{cardsPerDeck[deckId] && cardsPerDeck[deckId].map((cardId, i) => (
						<View key={cardId}>
							<Text>Question {i+1}: {cards[cardId].question}</Text>
							<Text>Answer: {cards[cardId].answer}</Text>
						</View>
					))}
				</View>
			))}

		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 0,
		marginTop: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btn: {
		height: 40,
		width: 150,
		borderRadius: 10,
		margin: 5,
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnTxt: {
		color: 'white',
		fontSize: 14,
		fontWeight: 'bold',
		textAlign: 'center'
	}
});

export default DeckList;
