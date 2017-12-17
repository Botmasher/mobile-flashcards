import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Deck(props) {
	const { title, cards } = props;
	return (
		<View style={styles.container}>
			<Text>Individual Deck View</Text>
			<Text></Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 0
	}
});

export default Deck;
