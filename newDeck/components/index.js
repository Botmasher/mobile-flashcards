import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function NewDeck(props) {
	return (
		<View style={styles.container}>
			<Text>New Deck View</Text>
			<Input></Input>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 0
	}
});

export default NewDeck;
