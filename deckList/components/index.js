import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DeckList = (props) => (
	<View style={styles.container}>
		<Text>Deck List View (default view)</Text>
		<TouchableOpacity style={styles.btn} onPress={() => props.addDeck(Math.random(), `adding deck named ${Math.random()}`)}>
			<Text style={styles.btnTxt}>add an entry</Text>
		</TouchableOpacity>
		<TouchableOpacity style={styles.btn} onPress={() => props.clearDecks()}>
			<Text style={styles.btnTxt}>clear entries</Text>
		</TouchableOpacity>
		{Object.keys(props.decks).map(deckId => <Text key={deckId}>{props.decks[deckId]}</Text>)}
	</View>
);

const styles = StyleSheet.create({
	container: {
		margin: 0,
		marginTop: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btn: {
		height: 40,
		width: 150,
		borderRadius: 10,
		margin: 5,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'red'
	},
	btnTxt: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
	}
});

export default DeckList;
