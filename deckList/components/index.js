import React from 'react';
import { View, Text, FlatList, Modal, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { countCardsPerDeck, dealCardsIntoDecks } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Foundation, MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';

const windowDimensions = Dimensions.get('window');

const renderListItem = (deck, navigation, cardsPerDeck, openModal) => {
	return (
		<View key={deck.id} style={{backgroundColor: 'white', flex: 10, width: windowDimensions.width, flexDirection: 'row'}}>
			<View style={{flex: 2, marginTop: 0, justifyContent: 'flex-start'}}>
				<TouchableOpacity
					onPress={() => (navigation.navigate('Deck', 
						{
							deck: deck,
							cards: cardsPerDeck[deck.id] ? cardsPerDeck[deck.id] : {}
						}
				))}>
					{Platform.OS === 'ios'
						? <Foundation name="page-multiple" size={60} color="blue" style={styles.centerText} />
						: <MaterialCommunityIcons name="note-multiple" size={60} color="blue" style={styles.centerText} />
					}
				</TouchableOpacity>
			</View>
			<View style={{flex: 8, justifyContent: 'space-around'}}>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<TouchableOpacity
						onPress={() => (navigation.navigate('Deck', 
							{
								deck: deck,
								cards: cardsPerDeck[deck.id] ? cardsPerDeck[deck.id] : {}
							}
					))} style={{flex: 1, flexDirection: 'row'}}>
						<Text style={[styles.deckHeader, {flexGrow: 1, width:0}]}>{deck.name}</Text>
					</TouchableOpacity>
				</View>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<Text style={[styles.centerText, styles.faintText]}>
						{cardsPerDeck[deck.id] ? Object.keys(cardsPerDeck[deck.id]).length : 0} cards
					</Text>
				</View>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<TouchableOpacity onPress={() => navigation.navigate('NewDeck', {text: deck.name, deckId: deck.id})}>
					 {Platform.OS === 'ios'
					 	? <Foundation name="pencil" size={20} color="gray" style={{paddingRight: 16}} />
					 	: <MaterialCommunityIcons name="pencil" color="gray" size={20} style={{paddingRight: 16}} />
					 }
					</TouchableOpacity>
					<TouchableOpacity onPress={() => openModal(deck.id)}>
					 {Platform.OS === 'ios'
					 	? <Ionicons name="ios-trash" size={20} color="gray" style={{paddingRight: 16}} />
					 	: <Ionicons name="md-trash" size={20} color="gray" style={{paddingRight: 16}} />
					 }
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const renderSeparator = () => (
	<View style={{height: 1, marginTop: 10, marginBottom: 10, width: '80%', backgroundColor: 'gray', marginLeft: windowDimensions.width*0.1}} />
);

function DeckList({ decks, cards, navigation, modal, openModal, closeModal }) {
	const cardsPerDeck = dealCardsIntoDecks(cards);
	return (
		<View style={[styles.container, {justifyContent: 'flex-start', alignItems: 'center'}]}>
			<Modal visible={modal}>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Text>Do you want to delete this deck?</Text>
					<TouchableOpacity onPress={() => closeModal(true)}>
						<Text>Yes</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => closeModal(false)}>
						<Text>No</Text>
					</TouchableOpacity>
				</View>
			</Modal>
			<View style={{flexDirection: 'row', paddingBottom: 10}}>
				<Text style={styles.screenHeader}>Your Decks</Text>
				<TouchableOpacity onPress={() => navigation.navigate('NewDeck')}>
					<Entypo name="add-to-list" size={20} color="gray" style={{marginLeft: 20}} />
				</TouchableOpacity>
			</View>
			<FlatList
				data={Object.values(decks)}
				renderItem={({item}) => renderListItem(item, navigation, cardsPerDeck, openModal)}
				keyExtractor={(item, i) => i}
				ItemSeparatorComponent={renderSeparator}
				style={{flex: 1}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	screenHeader: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	deckHeader: {
		fontSize: 14,
		fontWeight: 'bold'
	},
	centerText: {
		textAlign: 'center'
	},
	faintText: {
		fontSize: 13,
		color: 'gray'
	}
});

DeckList.propTypes = {
	decks: PropTypes.array.isRequired,
	cards: PropTypes.object.isRequired,
	navigation: PropTypes.object.isRequired,
	modal: PropTypes.bool.isRequired
};

export default DeckList;
