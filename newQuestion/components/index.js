import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function NewQuestion({ question, answer, message, handleQuestion, handleAnswer, handleSubmit }) {
	return (
		<View style={styles.container}>
			<Text>New Question View</Text>
			<Text>Question: </Text><TextInput onChangeText={(text) => handleQuestion(text)} value={question} />
			<Text>Answer: </Text><TextInput onChangeText={(text) => handleAnswer(text)} value={answer} />
			{message!=='' && <Text>{message}</Text>}
			<TouchableOpacity onPress={() => handleSubmit()}>
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

export default NewQuestion;
