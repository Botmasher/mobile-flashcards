import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import AnimCard from './AnimCard';
import AnimCardText from './AnimCardText';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';

function FlashCard({ flipped, question, answer, flipCard, updateScore }) {
	return (
		<View style={{flex: 1}}>
			<TouchableOpacity onPress={() => flipCard()}>
				<AnimCard flipped={flipped} style={!flipped ? styles.front : styles.back}>
					<AnimCardText flipped={flipped}>
						{!flipped
							? <Text style={[styles.question, {fontSize: question.length < 250 ? size.huge : size.large}]}>{question}</Text>
							: <Text style={[styles.answer, {fontSize: question.length < 250 ? size.huge : size.large}]}>{answer}</Text>
						}
					</AnimCardText>
				</AnimCard>
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
	front: {
		backgroundColor: colors.primary.dark,
		height: 400,
		margin: 10,
		borderRadius: 14,
		alignItems: 'center',
		justifyContent: 'center'
	},
	back: {
		backgroundColor: colors.white,
		height: 400,
		margin: 10,
		borderRadius: 14,
		alignItems: 'center',
		justifyContent: 'center'
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

export default FlashCard;
