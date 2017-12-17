import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Deck(props) {
	const { title, cards, navigation } = props;
	return (
		<View style={styles.container}>
			<Text>Individual Deck View</Text>
			<TouchableOpacity onPress={() => navigation.navigate('Quiz', {title, cards})}><Text>start quiz</Text></TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('NewQuestion')}><Text>add card</Text></TouchableOpacity>
			<Text>Deck "{title}" contains {Object.keys(cards).length} cards:</Text>
			{Object.keys(cards).map(cardId => (
				<Text key={cardId}>{cards[cardId].question}</Text>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 0
	}
});

export default Deck;
