import React from 'react';
import { View, FlatList, Modal, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';
import CardItem from './CardItem';
import ModalRemove from './ModalRemove';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';

function Deck({ deck, cards, navigation, modal, openModal, closeModal }) {
	return (
		<View style={styles.container}>

			<ModalRemove visible={modal} close={closeModal} />

			<Text style={styles.centerText}>This deck contains {Object.keys(cards).length} cards</Text>

			<TouchableOpacity onPress={() => navigation.navigate('NewQuestion', {deck, cards})}>
				<Text style={styles.buttonBold}>+ add card</Text>
			</TouchableOpacity>

			{Object.keys(cards).length > 0 && (
				<TouchableOpacity onPress={() => navigation.navigate('Quiz', {deck, cards})}>
					<Text style={styles.button}>start quiz</Text>
				</TouchableOpacity>
			)}

			<View style={{flex: 1}}>
				<FlatList
					data={Object.values(cards)}
					renderItem={({item}) => CardItem(item, deck, cards, navigation, openModal)}
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
	cards: PropTypes.object.isRequired,
	navigation: PropTypes.object.isRequired
};

export default Deck;
