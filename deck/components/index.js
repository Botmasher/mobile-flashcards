import React from 'react';
import { View, FlatList, Modal, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';
import { FontAwesome, MaterialCommunityIcons, Foundation, Ionicons } from '@expo/vector-icons';

function renderCard(card, deck, cards, navigation, openModal) {
	return (
		<View key={card.id} style={{flex: 1, marginTop: 20, padding: 6, backgroundColor: colors.white, borderRadius: 12}}>
			<TouchableOpacity onPress={() => navigation.navigate('NewQuestion', {
				cardId: card.id,
				deck,
				cards,
				question: card.question,
				answer: card.answer
			})}>
				{Platform.OS === 'ios'
					? <FontAwesome name="sticky-note" size={size.icon.med} color={colors.primary.dark} style={{textAlign: 'center'}} />
					: <MaterialCommunityIcons name="note" size={size.icon.med} color={colors.primary.dark} style={{textAlign: 'center'}} />
				}
				<Text style={{textAlign: 'center', fontSize: size.med}}>{card.question}</Text>
			</TouchableOpacity>
			<View style={{flexDirection: 'row', justifyContent: 'center'}}>
				<TouchableOpacity onPress={() => navigation.navigate('NewQuestion', {
					cardId: card.id,
					deck,
					cards,
					question: card.question,
					answer: card.answer
				})}>
					{Platform.OS === 'ios'
					 	? <Foundation name="pencil" size={size.icon.small} color={colors.gray.dark} style={{paddingRight: 16}} />
					 	: <MaterialCommunityIcons name="pencil" color={colors.gray.dark} size={size.icon.small} style={{paddingRight: 16}} />
					}
				</TouchableOpacity>
				<TouchableOpacity onPress={() => openModal(card.id)}>
					{Platform.OS === 'ios'
					 	? <Ionicons name="ios-trash" size={size.icon.small} color={colors.gray.dark} style={{paddingRight: 16}} />
					 	: <Ionicons name="md-trash" size={size.icon.small} color={colors.gray.dark} style={{paddingRight: 16}} />
					}
				</TouchableOpacity>
			</View>
		</View>
	);
}

function Deck({ deck, cards, navigation, modal, openModal, closeModal }) {
	return (
		<View style={styles.container}>
		
			<Text style={{fontSize: size.med, color: colors.gray.med}}>This deck contains {Object.keys(cards).length} cards</Text>

			<TouchableOpacity onPress={() => navigation.navigate('NewQuestion', {deck, cards})}>
				<Text style={{color: colors.primary.dark, fontSize: size.large, marginTop: 10}}>+ add card</Text>
			</TouchableOpacity>

			{Object.keys(cards).length > 0 && (
				<TouchableOpacity onPress={() => navigation.navigate('Quiz', {deck, cards})}>
					<Text style={{color: colors.secondary.dark, fontSize: size.large, fontWeight: 'bold', marginTop: 10}}>start quiz</Text>
				</TouchableOpacity>
			)}

			<Modal visible={modal}>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Text style={{marginBottom: 10, fontSize: size.large}}>Do you want to delete this card?</Text>
					<TouchableOpacity onPress={() => closeModal(true)}>
						<Text style={{marginBottom: 10, fontSize: size.huge}}>Yes</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => closeModal(false)}>
						<Text style={{marginBottom: 10, fontSize: size.huge}}>No</Text>
					</TouchableOpacity>
				</View>
			</Modal>

			<View style={{flex: 1}}>
				<FlatList
					data={Object.values(cards)}
					renderItem={({item}) => renderCard(item, deck, cards, navigation, openModal)}
					keyExtractor={(item, i) => i}
					style={{flex: 1}}
				/>
			</View>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 8,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

Deck.propTypes = {
	deck: PropTypes.object.isRequired,
	cards: PropTypes.object.isRequired,
	navigation: PropTypes.object.isRequired
};

export default Deck;
