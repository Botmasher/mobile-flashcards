import { React } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function NewQuestion(props) {
	return (
		<View style={styles.container}>
			<Text>New Question View</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 0
	}
});

export default NewQuestion;
