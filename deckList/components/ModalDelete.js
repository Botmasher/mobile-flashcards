import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';

function ModalDelete({ visible, close }) {
	return (
		<Modal visible={visible}>
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text style={{marginBottom: 10, fontSize: size.large}}>Do you want to delete this deck?</Text>
				<TouchableOpacity onPress={() => close(true)}>
					<Text style={{marginBottom: 10, fontSize: size.huge}}>Yes</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => close(false)}>
					<Text style={{marginBottom: 10, fontSize: size.huge}}>No</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}

export default ModalDelete;
