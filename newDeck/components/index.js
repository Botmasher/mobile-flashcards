import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function NewDeck({ navigation, text, handleInput, handleSubmit }) {
	console.log(text);
	return (
		<View style={styles.container}>
			<Text>New Deck View</Text>
			<TextInput onChangeText={(text) => handleInput(text)} value={text} />
			<TouchableOpacity onPress={(text) => handleSubmit(text)}>
				<Text>Submit</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 0
	}
});

export default NewDeck;
