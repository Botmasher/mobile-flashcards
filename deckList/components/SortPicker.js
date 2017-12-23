import React from 'react';
import { View, Text, Picker } from 'react-native';
import PropTypes from 'prop-types';

function SortPicker({ pickerValue, handleSort }) {
	return (
		<View style={{flexDirection: 'row'}}>
			<Text style={{marginTop: 13}}>sort by: </Text>
			<Picker
				selectedValue={pickerValue}
				onValueChange={(value) => handleSort(value)}
				style={{height: 50, marginLeft: -14}}
				itemStyle={{height: 40, width: 100}}
			>
				<Picker.Item label="newest" value="timestamp-desc"  />
				<Picker.Item label="oldest" value="timestamp-asc" />
				<Picker.Item label="A to Z" value="name-asc" />
				<Picker.Item label="Z to A" value="name-desc" />
			</Picker>
		</View>
	);
}

SortPicker.propTypes = {
	pickerValue: PropTypes.string,
	handleSort: PropTypes.func.isRequired
};

export default SortPicker;
