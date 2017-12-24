import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FlashCard from './FlashCard';
import Results from './Results';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';

function Quiz({ navigation, deck, cards, score, flipped, numAnswered, updateScore, flipCard, resetQuiz }) {
	const cardCount = Object.keys(cards).length;
	const card = cards[Object.keys(cards)[numAnswered]];
	return (
		<View style={styles.container}>
			<Text style={styles.stats}>Cards left in quiz: {cardCount-numAnswered}</Text>
			{numAnswered < cardCount
				? <FlashCard flipped={flipped} question={card.question} answer={card.answer} flipCard={flipCard} updateScore={updateScore} />
				: <Results navigation={navigation} deck={deck} cards={cards} score={score} cardCount={cardCount} resetQuiz={resetQuiz} />
			}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 8,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	stats: {
		textAlign: 'center',
		fontSize: size.med,
		marginBottom: 10
	}
});

Quiz.propTypes = {
	navigation: PropTypes.object.isRequired,
	deck: PropTypes.object.isRequired,
	cards: PropTypes.object.isRequired,
	score: PropTypes.number.isRequired,
	flipped: PropTypes.bool.isRequired,
	numAnswered: PropTypes.number.isRequired,
	updateScore: PropTypes.func.isRequired,
	flipCard: PropTypes.func.isRequired,
	resetQuiz: PropTypes.func.isRequired
};

export default Quiz;
