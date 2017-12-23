import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';

function NewQuestion({ question, answer, message, handleQuestion, handleAnswer, handleSubmit, handleClose }) {
	return (
		<View style={styles.container}>
			<Text style={{fontSize: size.med, textAlign: 'center'}}>Question:</Text>
			<TextInput
				multiline={true}
				onChangeText={(text) => handleQuestion(text)}
				value={question}
				editable={true}
				style={{margin: 10, padding: 6, backgroundColor: colors.white, borderRadius: 4, fontSize: size.med}}
			/>
			<Text style={{fontSize: size.med, textAlign: 'center'}}>Answer</Text>
			<TextInput
				multiline={true}
				onChangeText={(text) => handleAnswer(text)}
				value={answer}
				editable={true}
				style={{margin: 10, padding: 6, backgroundColor: colors.white, borderRadius: 4, fontSize: size.med}}
			/>
			{message!=='' && <Text>{message}</Text>}
			<TouchableOpacity onPress={() => handleSubmit()}>
				<Text style={{textAlign: 'center', marginBottom: 10, color: colors.secondary.dark, fontSize: size.large}}>Submit</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => handleClose()}>
				<Text style={{textAlign: 'center', marginBottom: 10, color: colors.secondary.dark, fontSize: size.large}}>Close</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 8
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
