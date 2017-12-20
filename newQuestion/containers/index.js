import React from 'react';
import NewQuestion from '../components';
import { _addCard, _updateCard } from '../../utils/api';
import PropTypes from 'prop-types';

class NewQuestionContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			question: '',
			answer: '',
			message: '',
			questionEdited: false,
			answerEdited: false
		}
	}
	handleQuestion = question => this.setState({
		question,
		questionEdited: true,
		answer: !this.state.answerEdited && this.props.navigation.state.params.cardId
			? this.props.navigation.state.params.answer
			: this.state.answer
	});
	handleAnswer = answer => this.setState({
		answer,
		answerEdited: true,
		question: !this.state.questionEdited && this.props.navigation.state.params.cardId
			? this.props.navigation.state.params.question
			: this.state.question
	});
	handleSubmit = () => {
		if (this.state.question && this.state.answer && !this.props.navigation.state.params.cardId) {
			_addCard(this.props.navigation.state.params.deck.id, this.state.question, this.state.answer)
				.then(() => {
					this.setState({message: ''});
					this.props.navigation.navigate('Home');
				});
		} else if (!this.state.question || !this.state.answer) {
			this.setState({message: 'Please fill out a Question and Answer!'});
		} else {
			_updateCard(this.props.navigation.state.params.cardId, this.state.question, this.state.answer)
				.then(() => {
					this.setState({message: ''});
					this.props.navigation.navigate('Home');
				});
		}
	};
	handleClose = () => {
		this.props.navigation.navigate('Home');
	};
	render() {
		const { navigation } = this.props;
		const { message } = this.state;
		const { question, answer } = !this.state.questionEdited && !this.state.answerEdited && navigation.state.params.cardId
			? navigation.state.params
			: this.state
		;
		return (
			<NewQuestion
				handleQuestion={this.handleQuestion}
				handleAnswer={this.handleAnswer}
				handleSubmit={this.handleSubmit}
				handleClose={this.handleClose}
				question={question}
				answer={answer}
				message={message}
			/>
		);
	}
}

NewQuestionContainer.propTypes = {
	navigation: PropTypes.object
};

export default NewQuestionContainer;
