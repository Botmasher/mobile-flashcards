import { React } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function DeckList(props) {
	return (
		<View style={styles.container}>
			<Text>Deck List View (Default View)</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 0
	}
});

export default DeckList;
