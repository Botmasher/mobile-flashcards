import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome, MaterialCommunityIcons, Foundation, Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';

function CardItem({ card, deck, cards, navigation, openModal, onGoBack }) {
	return (
		<View key={card.id} style={styles.container}>
			<TouchableOpacity onPress={() => navigation.navigate('NewQuestion', {
				cardId: card.id,
				deck,
				cards,
				question: card.question,
				answer: card.answer
			})}>
				{Platform.OS === 'ios'
					? <FontAwesome name="sticky-note" size={size.icon.med} color={colors.primary.dark} style={styles.centerText} />
					: <MaterialCommunityIcons name="note" size={size.icon.med} color={colors.primary.dark} style={styles.centerText} />
				}
				<Text style={[styles.centerText, {fontSize: size.med}]}>{card.question}</Text>
			</TouchableOpacity>
			<View style={styles.row}>
				<TouchableOpacity onPress={() => navigation.navigate('NewQuestion', {
					cardId: card.id,
					deck,
					cards,
					question: card.question,
					answer: card.answer,
					onGoBack
				})}>
					{Platform.OS === 'ios'
					 	? <Foundation name="pencil" size={size.icon.small} color={colors.gray.dark} style={styles.icon} />
					 	: <MaterialCommunityIcons name="pencil" color={colors.gray.dark} size={size.icon.small} style={styles.icon} />
					}
				</TouchableOpacity>
				<TouchableOpacity onPress={() => openModal(card.id)}>
					{Platform.OS === 'ios'
					 	? <Ionicons name="ios-trash" size={size.icon.small} color={colors.gray.dark} style={styles.icon} />
					 	: <Ionicons name="md-trash" size={size.icon.small} color={colors.gray.dark} style={styles.icon} />
					}
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		padding: 6,
		backgroundColor: colors.white,
		borderRadius: 12
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	centerText: {
		textAlign: 'center'
	},
	icon: {
		paddingRight: 16
	}
});

CardItem.propTypes = {
	navigation: PropTypes.object.isRequired,
	card: PropTypes.object.isRequired,
	deck: PropTypes.object.isRequired,
	cards: PropTypes.object.isRequired,
	openModal: PropTypes.func.isRequired,
	onGoBack: PropTypes.func.isRequired
};

export default CardItem;
