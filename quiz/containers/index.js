import React from 'react';
import Quiz from '../components/';

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
			score: isCorrect ? prevState.score+1 : prevState.score,
			numAnswered: prevState.numAnswered+1,
			flipped: false
		}));
	};
	flipCard = () => {
		this.setState((prevState) => ({
			flipped: !this.state.flipped
		}));
	};
	render() {
		const { navigation } = this.props;
		const { score, numAnswered, flipped } = this.state;
		const cards = navigation.state.params ? navigation.state.params.cards : {};
		console.log(cards);
		return (
			<Quiz
				navigation={navigation}
				cards={cards}
				score={score}
				numAnswered={numAnswered}
				flipped={flipped}
				updateScore={this.updateScore}
				flipCard={this.flipCard}
			/>
		);
	}
}

export default QuizContainer;
