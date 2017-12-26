import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';
import { truncate } from '../../utils/helpers';

function Header({ navigation, subtitle, showTitle }) {
	const truncatedSubtitle = truncate(subtitle, 29);
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

Header.propTypes = {
	navigation: PropTypes.object.isRequired,
	subtitle: PropTypes.string,
	showTitle: PropTypes.bool
};

export default Header;
