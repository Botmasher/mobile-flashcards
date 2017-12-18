import React from 'react';
import NewDeck from '../components/';

class NewDeckContainer extends React.Component {
	constructor() {
		super(props);
		this.state = {
			title: ''
		};
	}
	handleInput = () => {};
	handleSubmit = () => {};
	render() {
		const { navigation } = this.props;
		return (
			<NewDeck navigation={navigation} handleInput={this.handleInput} handleSubmit={this.handleSubmit} />
		);
	}
}

export default NewDeckContainer;
