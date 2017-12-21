import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

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
		backgroundColor: colors.primary.dark,
		height: 50
	},
	title: {
		color: colors.white,
		fontWeight: 'bold',
		fontSize: 20
	}
});

export default Header;
