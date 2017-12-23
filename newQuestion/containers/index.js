import React from 'react';
import { ScrollView } from 'react-native';
import NewQuestion from '../components';
import Header from '../../header/components';
import PropTypes from 'prop-types';
import { _addCard, _updateCard } from '../../utils/api';
import { clearLocalNotification, setLocalNotification } from '../../utils/helpers';

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
		const deck = this.props.navigation.state.params.deck ? this.props.navigation.state.params.deck : {};
		const cards = this.props.navigation.state.params.cards ? this.props.navigation.state.params.cards : {};
		if (this.state.question && this.state.answer && !this.props.navigation.state.params.cardId) {
			_addCard(this.props.navigation.state.params.deck.id, this.state.question, this.state.answer)
				.then((updatedCards) => {
					this.setState({message: ''});
					this.props.navigation.navigate('Deck', {deck, cards: updatedCards});
				})
				.then(() => clearLocalNotification().then(setLocalNotification));
		} else if (!this.state.question || !this.state.answer) {
			this.setState({message: 'Please fill out a Question and Answer!'});
		} else {
			_updateCard(this.props.navigation.state.params.cardId, this.state.question, this.state.answer)
				.then((updatedCards) => {
					this.setState({message: ''});
					this.props.navigation.navigate('Deck', {deck, cards: updatedCards});
				})
				.then(() => clearLocalNotification().then(setLocalNotification));
		}
	};
	handleClose = () => {
		const deck = this.props.navigation.state.params.deck;
		const cards = this.props.navigation.state.params.cards;
		this.props.navigation.navigate('Deck', {deck, cards});
	};
	render() {
		const { navigation } = this.props;
		const { message } = this.state;
		const { question, answer } = !this.state.questionEdited && !this.state.answerEdited && navigation.state.params.cardId
			? navigation.state.params
			: this.state
		;
		return (
			<ScrollView style={{flex: 1}}>
				<Header subtitle={`edit card`} showTitle={false} navigation={navigation} />
				<NewQuestion
					handleQuestion={this.handleQuestion}
					handleAnswer={this.handleAnswer}
					handleSubmit={this.handleSubmit}
					handleClose={this.handleClose}
					question={question}
					answer={answer}
					message={message}
				/>
			</ScrollView>
		);
	}
}

NewQuestionContainer.propTypes = {
	navigation: PropTypes.object.isRequired
};

export default NewQuestionContainer;
