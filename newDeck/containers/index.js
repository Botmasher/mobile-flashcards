import React from 'react';
import NewDeck from '../components/';
import { _addDeck, _updateDeck, _removeDeck } from '../../utils/api';
import PropTypes from 'prop-types';

class NewDeckContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			edited: false,
			message: ''
		};
	}
	handleInput = text => this.setState({text, edited: true});
	handleSubmit = () => {
		if (!this.props.navigation.state.params && this.state.edited) {
			_addDeck(this.state.text.trim()).then(() => this.props.navigation.navigate('Home'));
		} else if (!this.state.text) {
			this.setState({message: 'Please fill out a title for your deck!'});
		} else if (!this.state.edited) {
			this.props.navigation.navigate('Home');
		} else {
			_updateDeck(this.props.navigation.state.params.deckId, this.state.text.trim()).then(() => this.props.navigation.navigate('Home'));
		}
	}
	render() {
		const { navigation } = this.props;
		const { text } = !this.state.edited && navigation.state.params && navigation.state.params.deckId ? navigation.state.params : this.state;
		return (
			<NewDeck
				navigation={navigation}
				text={text}
				message={this.state.message}
				handleInput={this.handleInput}
				handleSubmit={this.handleSubmit}
			/>
		);
	}
}

NewDeckContainer.propTypes = {
	navigation: PropTypes.object.isRequired,
	deckId: PropTypes.string,
	navigation: PropTypes.object
};

export default NewDeckContainer;
