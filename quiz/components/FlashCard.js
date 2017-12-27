import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import FlipCard from 'react-native-flip-card';
//import AnimCard from './AnimCard';
import AnimCardText from './AnimCardText';
import PropTypes from 'prop-types';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';
import { truncate } from '../../utils/helpers';

function FlashCard({ flipped, question, answer, flipCard, updateScore }) {
	const charLimit = 475;
	const charShrink = 280;
	return (
		<View style={{flex: 2}}>
			<TouchableOpacity onPress={() => flipCard()}>
				<FlipCard flip={flipped} clickable={false} style={styles.card}>
					<View style={[styles.face, styles.front]}>
						<AnimCardText>
							<Text style={[styles.question, {fontSize: question.length < charShrink ? size.huge : size.large}]}>
								{truncate(question, charLimit)}
							</Text>
						</AnimCardText>
					</View>
					<View style={[styles.face, styles.back]}>
						<AnimCardText>
							<Text style={[styles.answer, {fontSize: answer.length < charShrink ? size.huge : size.large}]}>
								{truncate(answer, charLimit)}
							</Text>
						</AnimCardText>
					</View>
				</FlipCard>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => flipCard()}>
				<Text style={{textAlign: 'center', fontSize: size.med, marginBottom: 5}}>show {flipped ? `question` : `answer`}</Text>
			</TouchableOpacity>
			<View style={styles.row}>
				<TouchableOpacity onPress={() => updateScore(true)} style={{paddingRight: 20}}>
					<Text style={styles.btnCorrect}>Correct</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => updateScore(false)}>
					<Text style={styles.btnIncorrect}>Incorrect</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		marginLeft: 6,
		marginRight: 6,
		marginBottom: -42,
		borderWidth: 0
	},
	face: {
		borderRadius: 14,
		padding: 10,
		height: Dimensions.get('window').height * 0.58,
		width: Dimensions.get('window').width * 0.95,
		alignItems: 'center',
		justifyContent: 'center'	
	},
	front: {
		backgroundColor: colors.primary.dark
	},
	back: {
		backgroundColor: colors.white
	},
	question: {
		color: colors.white
	},
	answer: {
		color: colors.black
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	btnCorrect: {
		fontSize: size.huge,
		color: colors.primary.dark
	},
	btnIncorrect: {
		fontSize: size.huge,
		color: colors.secondary.dark
	}
});

FlashCard.propTypes = {
	flipped: PropTypes.bool.isRequired,
	question: PropTypes.string.isRequired,
	answer: PropTypes.string.isRequired,
	flipCard: PropTypes.func.isRequired,
	updateScore: PropTypes.func.isRequired
};

export default FlashCard;
