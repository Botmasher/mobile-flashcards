import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

function Separator() {
	return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
	separator: {
		height: 1,
		margin: Dimensions.get('window').width*0.1,
		marginTop: 10,
		marginBottom: 10,
		width: Dimensions.get('window').width*0.8,
		backgroundColor: colors.gray.light,
	}
});

export default Separator;
