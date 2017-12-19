import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

function Quiz({ navigation, cards, score, flipped, numAnswered, updateScore, flipCard }) {
	const cardCount = Object.keys(cards).length;
	return (
		<View style={styles.container}>
			<Text>Quiz View</Text>
			<Text>Cards left in quiz: {cardCount-numAnswered}</Text>
			{numAnswered < cardCount
				? <View>
						<TouchableOpacity onPress={() => flipCard()}>
							{!flipped
								? <Text>Q: {cards[Object.keys(cards)[numAnswered]].question}</Text>
								: <Text>A: {cards[Object.keys(cards)[numAnswered]].answer}</Text>
							}
						</TouchableOpacity>
						<TouchableOpacity onPress={() => updateScore(true)}>
							<Text>Correct</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => updateScore(false)}>
							<Text>Incorrect</Text>
						</TouchableOpacity>
					</View>
				: <TouchableOpacity onPress={() => navigation.navigate('Quiz', {cards})}>
						<Text>Score: {Math.round(score/cardCount * 100)}%</Text>
						<Text>Restart Quiz</Text>
					</TouchableOpacity>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 0
	}
});

Quiz.propTypes = {
	navigation: PropTypes.object.isRequired,
	cards: PropTypes.object.isRequired,
	score: PropTypes.number.isRequired,
	flipped: PropTypes.bool.isRequired,
	numAnswered: PropTypes.number.isRequired,
	updateScore: PropTypes.func.isRequired,
	flipCard: PropTypes.func.isRequired
};

export default Quiz;
