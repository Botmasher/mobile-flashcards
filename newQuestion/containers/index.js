import React from 'react';
import NewQuestion from '../components';
import { _addCard } from '../../utils/api';

class NewQuestionContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			question: '',
			answer: '',
			message: ''
		}
	}
	handleQuestion = question => this.setState({question});
	handleAnswer = answer => this.setState({answer});	
	handleSubmit = () => {
		if (this.state.question && this.state.answer) {
			_addCard(this.props.navigation.state.params.deck.id, this.state.question, this.state.answer)
				.then(() => {
					this.setState({message: ''});
					this.props.navigation.navigate('Home');
				});
		} else {
			this.setState({message: 'Please fill out a Question and Answer!'});
		}
	};
	render() {
		const { navigation } = this.props;
		const { question, answer, message } = this.state;
		return (
			<NewQuestion
				handleQuestion={this.handleQuestion}
				handleAnswer={this.handleAnswer}
				handleSubmit={this.handleSubmit}
				question={question}
				answer={answer}
				message={message}
			/>
		);
	}
}

export default NewQuestionContainer;
