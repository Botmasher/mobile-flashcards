import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DeckList = (props) => {
	const { decks, cards } = props;
	const cardCounts = {};
	Object.keys(cards).map(cardId => (cards.cardId.decks.map(deckId => (cardCounts.deckId = cardCounts.deckId ? cardCounts.deckId+1 : 0))));
	return (
		<View style={styles.container}>
			<Text>Deck List View (default view)</Text>
			<TouchableOpacity style={styles.btn} onPress={() => props.addDeck(Math.floor(Math.random()*10))}>
				<Text style={styles.btnTxt}>add an entry</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.btn} onPress={() => props.clearDecks()}>
				<Text style={styles.btnTxt}>clear entries</Text>
			</TouchableOpacity>

			{Object.keys(decks).map(deckId => (
				<Text key={deckId}>{decks.deckId} has {cards.filt} cards</Text>
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
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'red'
	},
	btnTxt: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
	}
});

export default DeckList;
