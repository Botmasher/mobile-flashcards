import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Header(props) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>FlashCards</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'blue',
		height: 50
	},
	title: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	}
});

export default Header;
