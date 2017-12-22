import React from 'react';
import { View, Text, Picker } from 'react-native';
import DeckList from '../components/';
import Header from '../../header/components/';
import { _fetchDecks, _fetchCards, _removeDeck } from '../../utils/api';
import { selectDecksSortedNum, selectDecksSortedAlpha } from '../selectors';
import PropTypes from 'prop-types';
import { size } from '../../utils/font';

class DeckListContainer extends React.Component {
	state = {
		decks: [],
		cards: {},
		sort: {
			byAlpha: false,
			ascending: true,
		},
		pickerValue: '',
		modal: false,
		focusedDeckId: ''
	};
	componentDidMount() {
		this.fetchDecks();
		this.fetchCards();
	}
	fetchDecks = () => {
		_fetchDecks().then(data => {
			const decks = selectDecksSortedNum({decks: data, property: 'timestamp', ascending: this.state.sort.ascending});
			this.setState({decks});
		});
	};
	fetchCards = () => {
		_fetchCards().then(data => this.setState({cards: data}));
	};

	handleSort = pickerValue => {
		const [property, ascDesc] = pickerValue.split('-');
		const sortState = {
			decks: this.state.decks,
			property,
			ascending: ascDesc==='asc'
		};
		const decks = property === 'name'
			? selectDecksSortedAlpha(sortState)
			: selectDecksSortedNum(sortState);
		this.setState({decks, sort: { byAlpha: property==='name', ascending: ascDesc==='asc'}, pickerValue});
	};
	openModal = (deckId) => this.setState({modal: true, focusedDeckId: deckId});
	closeModal = (removeDeck) => {
		this.setState({modal: false});
		if (removeDeck) {
			_removeDeck(this.state.focusedDeckId).then(() => {
				this.props.navigation.navigate('Home');
			});
		}
	}
	render() {
		const { decks, cards, sort, pickerValue, modal } = this.state;
		const { navigation } = this.props;
		return (
			<View style={{flex: 1}}>
				<Header subtitle={`Your Decks`} navigation={navigation} />
				{Object.keys(decks).length > 2 && (
					<View style={{flex:2, flexDirection: 'row', justifyContent: 'flex-end', marginTop: -18, marginBottom: -92}}>
						<Text style={{marginTop: 13}}>sort by: </Text>
						<Picker
							selectedValue={pickerValue}
							onValueChange={(value) => this.handleSort(value)}
							style={{height: 50}}
							textStyle={{fontSize: size.small}}
							itemStyle={{height: 40, width: 100}}
						>
							<Picker.Item label="newest" value="timestamp-desc"  />
							<Picker.Item label="oldest" value="timestamp-asc" />
							<Picker.Item label="title A-Z" value="name-asc" />
							<Picker.Item label="title Z-A" value="name-desc" />
						</Picker>
					</View>
				)}
				<DeckList
					decks={decks}
					cards={cards}
					navigation={navigation}
					modal={modal}
					openModal={this.openModal}
					closeModal={this.closeModal}
				/>
			</View>
		);
	}
}

DeckListContainer.propTypes = {
	navigation: PropTypes.object.isRequired
};

export default DeckListContainer;
