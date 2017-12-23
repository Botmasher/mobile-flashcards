import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { size } from '../../utils/font';

function ModalRemove({ visible, close }) {
	return (
		<Modal visible={visible}>
			<View style={styles.container}>
				<Text style={styles.message}>Do you want to delete this card?</Text>
				<TouchableOpacity onPress={() => close(true)}>
					<Text style={styles.options}>Yes</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => close(false)}>
					<Text style={styles.options}>No</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	message: {
		marginBottom: 10,
		fontSize: size.large
	},
	options: {
		marginBottom: 12,
		fontSize: size.huge
	}
});

ModalRemove.propTypes = {
	visible: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired
};

export default ModalRemove;
