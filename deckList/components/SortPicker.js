import React from 'react';
import { View, Text, Picker, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

function SortPicker({ pickerValue, handleSort, togglePicker }) {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => togglePicker()}>
				{Platform.OS === 'ios'
					? <FontAwesome name="close" size={size.icon.small} color={colors.secondary.dark} style={styles.icon} />
					: <MaterialCommunityIcons name="window-close" size={size.icon.small} color={colors.secondary.dark} style={styles.icon} />
				}
			</TouchableOpacity>
			<Picker
				selectedValue={pickerValue}
				onValueChange={(value) => handleSort(value)}
				style={{marginTop: -12}}
			>
				<Picker.Item label="newest" value="timestamp-desc"  />
				<Picker.Item label="oldest" value="timestamp-asc" />
				<Picker.Item label="A to Z" value="name-asc" />
				<Picker.Item label="Z to A" value="name-desc" />
			</Picker>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		borderTopWidth: 6,
		borderTopColor: colors.secondary.dark,
		width: Dimensions.get('window').width,
		height: 200,
		bottom: 0,
		backgroundColor: colors.white
	},
	icon: {
		textAlign: 'right',
		paddingRight: 7,
		paddingTop: 5
	}
});

SortPicker.propTypes = {
	pickerValue: PropTypes.string,
	handleSort: PropTypes.func.isRequired,
	togglePicker: PropTypes.func.isRequired
};

export default SortPicker;
