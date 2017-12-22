import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';
import { Entypo } from '@expo/vector-icons';

function Header({ navigation, subtitle }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>FlashCards</Text>
			<TouchableOpacity onPress={() => navigation.navigate('NewDeck')} style={styles.row}>
				<Text style={styles.subtitle}>{subtitle}</Text>
				<Entypo name="add-to-list" size={size.icon.small} color={colors.white} style={{marginLeft: 20}} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.primary.dark,
		flex:1,
		marginBottom: 20
	},
	title: {
		color: colors.white,
		fontWeight: 'bold',
		fontSize: size.huge
	},
	subtitle: {
		color: colors.white,
		fontWeight: 'bold',
		fontSize: size.large
	},
	row: {
		flexDirection: 'row',
	}
});

export default Header;
