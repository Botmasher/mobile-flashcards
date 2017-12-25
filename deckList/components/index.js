import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { dealCardsIntoDecks } from '../../utils/helpers';
import PropTypes from 'prop-types';
import DeckItem from './DeckItem';
import ModalDelete from './ModalDelete';
import Separator from './Separator';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';

function DeckList({ decks, cards, navigation, modal, openModal, closeModal, refresh }) {
	const cardsPerDeck = dealCardsIntoDecks(cards);
	return (
		<View style={styles.container}>
			<ModalDelete visible={modal} close={closeModal} />
			<View style={styles.row}>
				<FlatList
					data={Object.values(decks)}
					renderItem={({item}) => (
						<DeckItem
							deck={item}
							navigation={navigation}
							cards={cards}
							cardsPerDeck={cardsPerDeck}
							openModal={openModal}
							refreshDeckList={refresh}
						/>
					)}
					keyExtractor={(item, i) => i}
					ItemSeparatorComponent={Separator}
					style={{flex: 1}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 6,
		justifyContent: 'center',
		alignItems: 'center'
	},
	row: {
		flex: 1,
		flexDirection: 'row'
	}
});

DeckList.propTypes = {
	decks: PropTypes.array.isRequired,
	cards: PropTypes.object.isRequired,
	navigation: PropTypes.object.isRequired,
	modal: PropTypes.bool.isRequired,
	openModal: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired,
	refresh: PropTypes.func.isRequired
};

export default DeckList;
