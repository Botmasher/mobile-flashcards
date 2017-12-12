import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Quiz(props) {
	return (
		<View style={styles.container}>
			<Text>Quiz View</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 0
	}
});

export default Quiz;
