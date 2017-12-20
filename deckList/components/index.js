import React from 'react';
import { View, Text, FlatList, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { countCardsPerDeck, dealCardsIntoDecks } from '../../utils/helpers';
import PropTypes from 'prop-types';

const renderListItem = (deck, navigation, cardsPerDeck, openModal) => {
	return (
		<View key={deck.id} style={{marginTop: 10}}>
			<TouchableOpacity
				onPress={() => (navigation.navigate('Deck', 
					{
						deck: deck,
						cards: cardsPerDeck[deck.id] ? cardsPerDeck[deck.id] : {}
					}
			))}>
				<Text>Deck: "{deck.name}"</Text>
				<Text style={{fontSize: 14, color: 'gray'}}>{cardsPerDeck[deck.id] ? Object.keys(cardsPerDeck[deck.id]).length : 0} cards</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('NewDeck', {text: deck.name, deckId: deck.id})}>
			 <Text style={{fontSize: 12, color: 'blue'}}>+ edit this deck</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => openModal(deck.id)}>
			 <Text style={{fontSize: 12, color: 'blue'}}>+ delete this deck</Text>
			</TouchableOpacity>
		</View>
	);
};

function DeckList({ decks, cards, navigation, modal, openModal, closeModal }) {
	const cardsPerDeck = dealCardsIntoDecks(cards);
	return (
		<View style={styles.container}>
			<Modal visible={modal}>
				<View style={{padding: 20, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Text>Do you want to delete this deck?</Text>
					<TouchableOpacity onPress={() => closeModal(true)}>
						<Text>Yes</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => closeModal(false)}>
						<Text>No</Text>
					</TouchableOpacity>
				</View>
			</Modal>
			<TouchableOpacity onPress={() => navigation.navigate('NewDeck')}>
				<Text>+ new deck</Text>
			</TouchableOpacity>
			<Text>Deck List View (default view)</Text>
			<FlatList
				data={Object.values(decks)}
				renderItem={({item}) => renderListItem(item, navigation, cardsPerDeck, openModal)}
				keyExtractor={(item, i) => i}
			/>
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
	navigation: PropTypes.object.isRequired,
	modal: PropTypes.bool.isRequired
};

export default DeckList;
