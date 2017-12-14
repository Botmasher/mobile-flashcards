import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function DeckList(props) {
	const { decks, cards, cardsPerDeck } = props;
	console.log(cards);
	// test values for passing up to container to create and update local state/storage
	const question = `Uhm, are you friends with ${Math.random()*20}?`;
	const answer = 'FALSE!';
	const moddedQuestion = `Uhm, are you ENEMIES with ${Math.floor(Math.random()*350)}?`;
	const moddedAnswer = 'OH TRUE!';
	const moddedDeckName = `NewName${Math.floor(Math.random()*100)}`;
	const displayAnswer = [];
	return (
		<View style={styles.container}>
			
			<Text>Deck List View (default view)</Text>
			
			<TouchableOpacity style={[styles.btn, styles.deckBtn]} onPress={() => props.addDeck(Math.floor(Math.random()*100))}>
				<Text style={styles.btnTxt}>add a deck</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.btn, styles.deckBtn]} onPress={() => Object.keys(decks).length>0 ? props.updateDeck(Object.keys(decks)[0], moddedDeckName) : null}>
				<Text style={styles.btnTxt}>update one deck</Text>
			</TouchableOpacity>			
			
			<TouchableOpacity style={[styles.btn, styles.deckBtn]} onPress={() => props.clearDecks()}>
				<Text style={styles.btnTxt}>clear decks</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.btn, styles.cardBtn]} onPress={() => props.addCard(Object.keys(decks)[0], question, answer)}>
				<Text style={styles.btnTxt}>add card to first deck</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.btn, styles.cardBtn]} onPress={() => Object.keys(cards).length>0 ? props.updateCard(Object.keys(cards)[0], moddedQuestion, moddedAnswer) : null}>
				<Text style={styles.btnTxt}>update one card</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.btn, styles.cardBtn]} onPress={() => props.clearCards()}>
				<Text style={styles.btnTxt}>clear cards</Text>
			</TouchableOpacity>

			{Object.keys(decks).map(deckId => (
				<View key={deckId} style={{padding: 12}}>
					<Text>
						Deck {decks[deckId]} has {cardsPerDeck[deckId] ? cardsPerDeck[deckId].length : 0} cards
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
	},
	deckBtn: {
		backgroundColor: 'red'
	},
	cardBtn: {
		backgroundColor: 'purple'
	}
});

export default DeckList;
