import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Foundation, MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';

const DeckItem = ({ deck, navigation, cards, cardsPerDeck, openModal }) => {
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
						? <Foundation name="page-multiple" size={size.icon.large} color={colors.primary.dark} style={styles.centerText} />
						: <MaterialCommunityIcons name="note-multiple" size={size.icon.large} color={colors.primary.dark} style={styles.centerText} />
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
					<TouchableOpacity onPress={() => navigation.navigate('NewDeck', {text: deck.name, deckId: deck.id, cards})}>
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

const styles = StyleSheet.create({
	deckHeader: {
		fontSize: size.med,
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
		width: Dimensions.get('window').width,
		flexDirection: 'row'
	},
	listCardIcon: {
		flex: 2,
		justifyContent: 'center'
	}
});

DeckItem.propTypes = {
	deck: PropTypes.object.isRequired,
	cards: PropTypes.object.isRequired,
	navigation: PropTypes.object.isRequired,
	cardsPerDeck: PropTypes.object.isRequired,
	openModal: PropTypes.func.isRequired
};

export default DeckItem;
