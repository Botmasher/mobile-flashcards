import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { colors } from '../../utils/colors';
import { size } from '../../utils/font';

class AnimCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: new Animated.Value(0)
		};
	}
	componentDidMount() {
		Animated.timing(this.state.width, {
			toValue: 350,
			duration: 250
		}).start();
	}
  render() {
		return (
			<Animated.View style={{...this.props.style, width: this.state.width}}>
				{this.props.children}
			</Animated.View>
		);
	}
}

class AnimCardText extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			opacity: new Animated.Value(0)
		};
	}
	componentDidMount() {
		Animated.sequence([
			Animated.delay(200),
			Animated.timing(this.state.opacity, {
				toValue: 1,
				duration: 250
			})
		]).start();
	}
  render() {
		return (
			<Animated.View style={{...this.props.style, opacity: this.state.opacity}}>
				{this.props.children}
			</Animated.View>
		);
	}
}

function Quiz({ navigation, deck, cards, score, flipped, numAnswered, updateScore, flipCard }) {
	const cardCount = Object.keys(cards).length;
	const card = cards[Object.keys(cards)[numAnswered]];
	return (
		<View style={styles.container}>
			<Text style={{textAlign: 'center', fontSize: size.med, marginBottom: 10}}>Cards left in quiz: {cardCount-numAnswered}</Text>
			{numAnswered < cardCount
				? <View style={{flex: 1}}>
						<TouchableOpacity onPress={() => flipCard()}>
							<AnimCard flipped={flipped} style={!flipped
								? {backgroundColor: colors.primary.dark, height: 400, margin: 10, borderRadius: 14, alignItems: 'center', justifyContent: 'center'}
								: {backgroundColor: colors.white, height: 400, margin: 10, borderRadius: 14, alignItems: 'center', justifyContent: 'center'}}
							>
								<AnimCardText flipped={flipped}>
									{!flipped
										? <Text style={{fontSize: card.question.length < 250 ? size.huge : size.large, color: colors.white}}>{card.question}</Text>
										: <Text style={{fontSize: card.answer.length < 250 ? size.huge : size.large, color: colors.black}}>{card.answer}</Text>
									}
								</AnimCardText>
							</AnimCard>
						</TouchableOpacity>
						<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
							<TouchableOpacity onPress={() => updateScore(true)} style={{paddingRight: 20}}>
								<Text style={{fontSize: size.huge, color: colors.primary.dark}}>Correct</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => updateScore(false)}>
								<Text style={{fontSize: size.huge, color: colors.secondary.dark}}>Incorrect</Text>
							</TouchableOpacity>
						</View>
					</View>
				: <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{fontSize: 150, color: colors.secondary.dark, marginBottom: 25}}>{Math.round(score/cardCount * 100)}%</Text>
						<TouchableOpacity onPress={() => navigation.navigate('Quiz', {deck, cards})}>
							<Text style={{fontSize: size.huge, color: colors.primary.dark, marginBottom: 25}}>Restart Quiz</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.navigate('Deck', {deck, cards})}>
							<Text style={{fontSize: size.huge, color: colors.primary.dark, marginBottom: 25}}>Back to deck</Text>
						</TouchableOpacity>
					</View>
			}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 8,
		justifyContent: 'flex-start',
		alignItems: 'center'
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
