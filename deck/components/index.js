import React from 'react';
import { View, FlatList, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

function renderCard(card, navigation, openModal) {
	return (
		<View>
			<Text>{card.question}</Text>
			<TouchableOpacity onPress={() => navigation.navigate('NewQuestion', {
				cardId: card.id,
				question: card.question,
				answer: card.answer
			})}>
				<Text>edit card</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => openModal(card.id)}>
				<Text>delete card</Text>
			</TouchableOpacity>
		</View>
	);
}

function Deck({ deck, cards, navigation, modal, openModal, closeModal }) {
	return (
		<View style={styles.container}>
			<Text>Individual Deck View</Text>

			<Text>Deck "{deck.name}" contains {Object.keys(cards).length} cards.</Text>

			<TouchableOpacity onPress={() => navigation.navigate('NewQuestion', {deck})}>
				<Text>+ add card</Text>
			</TouchableOpacity>
			
			{Object.keys(cards).length > 0 && (
				<TouchableOpacity onPress={() => navigation.navigate('Quiz', {title: deck.name, cards})}>
					<Text>start quiz</Text>
				</TouchableOpacity>
			)}

			<Modal visible={modal}>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Text>Do you want to delete this card?</Text>
					<TouchableOpacity onPress={() => closeModal(true)}>
						<Text>Yes</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => closeModal(false)}>
						<Text>No</Text>
					</TouchableOpacity>
				</View>
			</Modal>

			<FlatList
				data={Object.values(cards)}
				renderItem={({item}) => renderCard(item, navigation, openModal)}
				keyExtractor={(item, i) => i}
			/>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 0
	}
});

Deck.propTypes = {
	deck: PropTypes.object.isRequired,
	cards: PropTypes.object.isRequired,
	navigation: PropTypes.object.isRequired
};

export default Deck;
