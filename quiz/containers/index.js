import React from 'react';
import { ScrollView } from 'react-native';
import Quiz from '../components';
import Header from '../../header/components';
import PropTypes from 'prop-types';

class QuizContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			score: 0,
			numAnswered: 0,
			flipped: false
		};
	}
	updateScore = (isCorrect) => {
		this.setState((prevState) => ({
			flipped: false,
			score: isCorrect ? prevState.score+1 : prevState.score,
			numAnswered: prevState.numAnswered+1
		}));
	};
	flipCard = () => {
		this.setState((prevState) => ({
			flipped: !this.state.flipped
		}));
	};
	resetQuiz = () => {
		this.setState({score: 0, numAnswered: 0, flipped: false});
	};
	render() {
		const { navigation } = this.props;
		const { score, numAnswered, flipped } = this.state;
		const deck = navigation.state.params ? navigation.state.params.deck : {};
		const cards = navigation.state.params ? navigation.state.params.cards : {};
		return (
			<ScrollView style={{flex: 1}}>
				<Header subtitle={`Deck Quiz`} showTitle={true} navigation={navigation} />
				<Quiz
					navigation={navigation}
					deck={deck}
					cards={cards}
					score={score}
					numAnswered={numAnswered}
					flipped={flipped}
					updateScore={this.updateScore}
					flipCard={this.flipCard}
					resetQuiz={this.resetQuiz}
				/>
			</ScrollView>
		);
	}
}

QuizContainer.propTypes = {
	navigation: PropTypes.object.isRequired
};

export default QuizContainer;
