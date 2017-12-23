import React from 'react';
import { ScrollView } from 'react-native';
import NewDeck from '../components/';
import Header from '../../header/components';
import PropTypes from 'prop-types';
import { _addDeck, _updateDeck, _removeDeck } from '../../utils/api';
import { clearLocalNotification, setLocalNotification } from '../../utils/helpers';

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
			_addDeck(this.state.text.trim())
				.then(() => this.props.navigation.navigate('Home'))
				.then(() => clearLocalNotification().then(setLocalNotification));
		} else if (!this.state.text) {
			this.setState({message: 'Please fill out a title for your deck!'});
		} else if (!this.state.edited) {
			this.props.navigation.navigate('Home');
		} else {
			_updateDeck(this.props.navigation.state.params.deckId, this.state.text.trim())
				.then(() => this.props.navigation.navigate('Home'))
				.then(() => clearLocalNotification().then(setLocalNotification));
		}
	}
	render() {
		const { navigation } = this.props;
		const { text } = !this.state.edited && navigation.state.params && navigation.state.params.deckId ? navigation.state.params : this.state;
		return (
			<ScrollView style={{flex: 1}}>
				<Header subtitle={navigation.state.params ? `Edit deck` : `Add a deck`} navigation={navigation} showTitle={true} />
				<NewDeck
					navigation={navigation}
					text={text}
					message={this.state.message}
					handleInput={this.handleInput}
					handleSubmit={this.handleSubmit}
				/>
			</ScrollView>
		);
	}
}

NewDeckContainer.propTypes = {
	navigation: PropTypes.object.isRequired
};

export default NewDeckContainer;
