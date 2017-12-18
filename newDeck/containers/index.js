import React from 'react';
import NewDeck from '../components/';
import { _addDeck } from '../../utils/api';

class NewDeckContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
	}
	handleInput = text => this.setState({text});
	handleSubmit = () => {
		_addDeck(this.state.text.trim()).then(() => this.props.navigation.navigate('Home'));
	}
	render() {
		const { navigation } = this.props;
		const { text } = this.state;
		return (
			<NewDeck navigation={navigation} text={text} handleInput={this.handleInput} handleSubmit={this.handleSubmit} />
		);
	}
}

export default NewDeckContainer;
