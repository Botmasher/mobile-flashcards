import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';

function NewQuestion({ question, answer, message, handleQuestion, handleAnswer, handleSubmit, handleClose }) {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>Question:</Text>
			<TextInput
				multiline={true}
				onChangeText={(text) => handleQuestion(text)}
				value={question}
				editable={true}
				style={styles.input}
			/>
			<Text style={styles.label}>Answer:</Text>
			<TextInput
				multiline={true}
				onChangeText={(text) => handleAnswer(text)}
				value={answer}
				editable={true}
				style={styles.input}
			/>
			{message!=='' && <Text>{message}</Text>}
			<TouchableOpacity onPress={() => handleSubmit()}>
				<Text style={styles.button}>Submit</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleClose()}>
				<Text style={styles.button}>Close</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 8
	},
	button: {
		textAlign: 'center',
		marginBottom: 10,
		color: colors.secondary.dark,
		fontSize: size.large
	},
	input: {
		margin: 10,
		padding: 6,
		backgroundColor: colors.white,
		borderRadius: 4,
		fontSize: size.med
	},
	label: {
		fontSize: size.med,
		textAlign: 'center'
	}
});

NewQuestion.propTypes = {
	question: PropTypes.string.isRequired,
	answer: PropTypes.string.isRequired,
	message: PropTypes.string,
	handleQuestion: PropTypes.func.isRequired,
	handleAnswer: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired
};

export default NewQuestion;
