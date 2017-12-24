import React from 'react';
import { View, FlatList, Modal, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';
import CardItem from './CardItem';
import ModalRemove from './ModalRemove';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';

function Deck({ deck, allCards, cardsInDeck, navigation, modal, openModal, closeModal, onGoBack }) {
	return (
		<View style={styles.container}>

			<ModalRemove visible={modal} close={closeModal} />

			<Text style={styles.centerText}>This deck contains {cardsInDeck ? Object.keys(cardsInDeck).length : 0} cards</Text>

			<TouchableOpacity onPress={() => navigation.navigate('NewQuestion', {deck, cards: allCards, onGoBack})}>
				<Text style={styles.buttonBold}>+ add card</Text>
			</TouchableOpacity>

			{cardsInDeck && Object.keys(cardsInDeck).length > 0 && (
				<TouchableOpacity onPress={() => navigation.navigate('Quiz', {deck, cards: cardsInDeck})}>
					<Text style={styles.button}>start quiz</Text>
				</TouchableOpacity>
			)}

			<View style={{flex: 1}}>
				<FlatList
					data={cardsInDeck ? Object.values(cardsInDeck) : []}
					renderItem={({item}) => <CardItem card={item} deck={deck} cards={allCards} navigation={navigation} openModal={openModal} onGoBack={onGoBack} />}
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
	},
	centerText: {
		fontSize: size.med,
		color: colors.gray.med
	},
	button: {
		color: colors.secondary.dark,
		fontSize: size.large,
		fontWeight: 'bold',
		marginTop: 10
	},
	buttonBold: {
		color: colors.primary.dark,
		fontSize: size.large,
		marginTop: 10
	}
});

Deck.propTypes = {
	deck: PropTypes.object.isRequired,
	allCards: PropTypes.object,
	cardsInDeck: PropTypes.object,
	navigation: PropTypes.object.isRequired,
	modal: PropTypes.bool.isRequired,
	openModal: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired,
	onGoBack: PropTypes.func.isRequired
};

export default Deck;
