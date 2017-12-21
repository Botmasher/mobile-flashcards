import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

function NewDeck({ navigation, text, message, handleInput, handleSubmit }) {
	return (
		<View style={styles.container}>
			<Text>New Deck View</Text>
			<TextInput onChangeText={(text) => handleInput(text)} value={text} />
			<Text>{message}</Text>
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

NewDeck.propTypes = {
	navigation: PropTypes.object,
	text: PropTypes.string,
	handleInput: PropTypes.func,
	handleSubmit: PropTypes.func
};

export default NewDeck;
