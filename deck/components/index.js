import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Deck(props) {
	return (
		<View style={styles.container}>
			<Text>Individual Deck View</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 0
	}
});

export default Deck;
