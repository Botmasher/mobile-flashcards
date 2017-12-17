import React from 'react';
import Deck from '../components/';

class DeckContainer extends React.Component {
	render() {
		const { navigation } = this.props;
		const title='';
		const cards={};
		console.log(navigation);
		return (
			<Deck
				title={title}
				cards={cards}
				navigation={navigation}
			/>
		);
	}
}

// const DeckContainer = ({ navigation }) => {
// 	const title='';
// 	const cards={};
// 	console.log(navigation);
// 	return (<Deck title={title} cards={cards} navigation={navigation} />)
// };

export default DeckContainer;
