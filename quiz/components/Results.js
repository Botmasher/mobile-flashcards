import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { clearLocalNotification, setLocalNotification } from '../../utils/helpers';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';

function Results({ navigation, deck, cards, score, cardCount, resetQuiz }) {
	clearLocalNotification().then(() => setLocalNotification());
	return (
		<View style={styles.container}>
			<Text style={styles.score}>{Math.round(score/cardCount * 100)}%</Text>
			<TouchableOpacity onPress={() => resetQuiz()}>
				<Text style={styles.button}>Restart Quiz</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Text style={styles.button}>Back to deck</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	score: {
		fontSize: 150,
		color: colors.secondary.dark,
		marginBottom: 25
	},
	button: {
		fontSize: size.huge,
		color: colors.primary.dark,
		marginBottom: 25
	}
});

Results.propTypes = {
	navigation: PropTypes.object.isRequired,
	deck: PropTypes.object.isRequired,
	cards: PropTypes.object.isRequired,
	score: PropTypes.number,
	cardCount: PropTypes.number,
	resetQuiz: PropTypes.func.isRequired
};

export default Results;
