import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';

function Header({ navigation, subtitle, showTitle }) {
	const truncatedSubtitle = ['.', '?', ' ', '!', ':', ';'].includes(subtitle[subtitle.length-1])
		? subtitle.substring(0, 28).concat('...')
		: subtitle.substring(0, 29).concat('...')
	;
	return (
		<View style={styles.container}>
			{showTitle && (
				<TouchableOpacity onPress={() => navigation.navigate('Home')}>
					<Text style={styles.title}>FlashCards</Text>
				</TouchableOpacity>
			)}
			{showTitle
				? <Text style={styles.subtitle}>{subtitle.length > 32 ? truncatedSubtitle : subtitle}</Text>
				: <Text style={styles.title}>{subtitle.length > 29 ? truncatedSubtitle : subtitle}</Text>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.primary.dark,
		flex: 1,
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
