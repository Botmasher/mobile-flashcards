import React from 'react';
import { View, Text, FlatList, Modal, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { countCardsPerDeck, dealCardsIntoDecks } from '../../utils/helpers';
import PropTypes from 'prop-types';
import { Foundation, MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';

const windowDimensions = Dimensions.get('window');

const renderListItem = (deck, navigation, cardsPerDeck, openModal) => {
	return (
		<View key={deck.id} style={styles.listItem}>
			<View style={styles.listCardIcon}>
				<TouchableOpacity
					onPress={() => (navigation.navigate('Deck', 
						{
							deck: deck,
							cards: cardsPerDeck[deck.id] ? cardsPerDeck[deck.id] : {}
						}
				))}>
					{Platform.OS === 'ios'
						? <Foundation name="page-multiple" size={size.icon.med} color={colors.primary.dark} style={styles.centerText} />
						: <MaterialCommunityIcons name="note-multiple" size={size.icon.med} color={colors.primary.dark} style={styles.centerText} />
					}
				</TouchableOpacity>
			</View>
			<View style={{flex: 8, justifyContent: 'space-around'}}>
				<View style={styles.row}>
					<TouchableOpacity
						onPress={() => (navigation.navigate('Deck', 
							{
								deck: deck,
								cards: cardsPerDeck[deck.id] ? cardsPerDeck[deck.id] : {}
							}
					))} style={styles.row}>
						<Text style={[styles.deckHeader, {flexGrow: 1, width:0}]}>{deck.name}</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<Text style={[styles.centerText, styles.faintText]}>
						{cardsPerDeck[deck.id] ? Object.keys(cardsPerDeck[deck.id]).length : 0} cards
					</Text>
				</View>
				<View style={styles.row}>
					<TouchableOpacity onPress={() => navigation.navigate('NewDeck', {text: deck.name, deckId: deck.id})}>
					 {Platform.OS === 'ios'
					 	? <Foundation name="pencil" size={size.icon.small} color={colors.gray.dark} style={styles.rowIcon} />
					 	: <MaterialCommunityIcons name="pencil" color={colors.gray.dark} size={size.icon.small} style={styles.rowIcon} />
					 }
					</TouchableOpacity>
					<TouchableOpacity onPress={() => openModal(deck.id)}>
					 {Platform.OS === 'ios'
					 	? <Ionicons name="ios-trash" size={size.icon.small} color={colors.gray.dark} style={styles.rowIcon} />
					 	: <Ionicons name="md-trash" size={size.icon.small} color={colors.gray.dark} style={styles.rowIcon} />
					 }
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const renderSeparator = () => (
	<View style={styles.separator} />
);

function DeckList({ decks, cards, navigation, modal, openModal, closeModal }) {
	const cardsPerDeck = dealCardsIntoDecks(cards);
	return (
		<View style={styles.container}>
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
			<View style={[styles.row, {paddingBottom: 10}]}>
				<Text style={styles.screenHeader}>Your Decks</Text>
				<TouchableOpacity onPress={() => navigation.navigate('NewDeck')}>
					<Entypo name="add-to-list" size={size.icon.small} color="gray" style={{marginLeft: 20}} />
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
		fontSize: size.huge,
		fontWeight: 'bold'
	},
	deckHeader: {
		fontSize: size.large,
		fontWeight: 'bold'
	},
	centerText: {
		textAlign: 'center'
	},
	faintText: {
		fontSize: size.med,
		color: colors.gray.med
	},
	row: {
		flex: 1,
		flexDirection: 'row'
	},
	rowIcon: {
		paddingRight: 16
	},
	listItem: {
		backgroundColor: colors.white,
		flex: 10,
		width: windowDimensions.width,
		flexDirection: 'row'
	},
	listCardIcon: {
		flex: 2,
		marginTop: 0,
		justifyContent: 'flex-start'
	},
	separator: {
		height: 1,
		marginTop: 10,
		marginBottom: 10,
		width: '80%',
		backgroundColor: colors.gray.light,
		marginLeft: windowDimensions.width*0.1
	}
});

DeckList.propTypes = {
	decks: PropTypes.array.isRequired,
	cards: PropTypes.object.isRequired,
	navigation: PropTypes.object.isRequired,
	modal: PropTypes.bool.isRequired
};

export default DeckList;
