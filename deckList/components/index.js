import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { countCardsPerDeck, dealCardsIntoDecks } from '../../utils/helpers';
import PropTypes from 'prop-types';

const renderListItem = (deck, navigation, cardsPerDeck) => {
	return (
		<View key={deck.id}>
			<TouchableOpacity
				onPress={() => (navigation.navigate('Deck', 
					{
						deck: deck,
						cards: cardsPerDeck[deck.id] ? cardsPerDeck[deck.id] : {}
					}
			))}>
				<Text key={deck.id}>
					Deck {deck.name} has {cardsPerDeck[deck.id] ? Object.keys(cardsPerDeck[deck.id]).length : 0} cards
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('NewDeck', {text: deck.name, deckId: deck.id})}>
			 <Text>+ edit this deck</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('NewDeck', {text: deck.name, deckId: deck.id})}>
			 <Text>+ edit this deck</Text>
			</TouchableOpacity>
		</View>
	);
};

function DeckList({ decks, cards, navigation }) {
	const cardsPerDeck = dealCardsIntoDecks(cards);
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.navigate('NewDeck')}>
				<Text>+ new deck</Text>
			</TouchableOpacity>
			<Text>Deck List View (default view)</Text>
			<FlatList data={decks} renderItem={({item}) => renderListItem(item, navigation, cardsPerDeck)} keyExtractor={(item, i) => i} />
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

DeckList.propTypes = {
	decks: PropTypes.array.isRequired,
	cards: PropTypes.object.isRequired,
	navigation: PropTypes.object.isRequired
};

export default DeckList;
