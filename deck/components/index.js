import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Deck(props) {
	const { deck, cards, navigation } = props;
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

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 0
	}
});

export default Deck;
