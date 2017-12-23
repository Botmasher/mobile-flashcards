import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';

function NewDeck({ navigation, text, message, handleInput, handleSubmit }) {
	return (
		<View style={styles.container}>
			<Text style={{fontSize: size.med, textAlign: 'center'}}>Deck name:</Text>
			<TextInput
				multiline={true}
				onChangeText={(text) => handleInput(text)}
				value={text}
				editable={true}
				style={{margin: 10, padding: 6, backgroundColor: colors.white, borderRadius: 4, fontSize: size.med}}
			/>
			<Text>{message}</Text>
			<TouchableOpacity onPress={(text) => handleSubmit(text)}>
				<Text style={{textAlign: 'center', marginBottom: 10, color: colors.secondary.dark, fontSize: size.large}}>Submit</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={(text) => navigation.navigate('Home')}>
				<Text style={{textAlign: 'center', marginBottom: 10, color: colors.secondary.dark, fontSize: size.med}}>Cancel</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 8
	}
});

NewDeck.propTypes = {
	navigation: PropTypes.object,
	text: PropTypes.string,
	handleInput: PropTypes.func,
	handleSubmit: PropTypes.func
};

export default NewDeck;
