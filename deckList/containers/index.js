import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DeckList from '../components/';
import Header from '../../header/components/';
import SortPicker from '../components/SortPicker'
import { _fetchDecks, _fetchCards, _removeDeck } from '../../utils/api';
import { selectDecksSortedNum, selectDecksSortedAlpha } from '../selectors';
import PropTypes from 'prop-types';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { size } from '../../utils/font';
import { colors } from '../../utils/colors';

class DeckListContainer extends React.Component {
	state = {
		decks: [],
		cards: {},
		sort: {
			byAlpha: false,
			ascending: false,
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
				<Header subtitle={`My Decks`} showTitle={true} navigation={navigation} />
				<View style={{flex:2, flexDirection: 'row', justifyContent: 'flex-end', marginTop: -18, marginBottom: -92}}>
					{Object.keys(decks).length > 2 && (
						<SortPicker pickerValue={pickerValue} handleSort={this.handleSort} />
					)}
					<TouchableOpacity onPress={() => navigation.navigate('NewDeck')}>
						{Platform.OS === 'ios'
							? <Entypo name="add-to-list" size={size.icon.small} color={colors.gray.dark} style={{marginTop: 5, paddingRight: 10}} />
							: <MaterialIcons name="playlist-add" size={size.icon.small} color={colors.gray.dark} style={{marginTop: 5, paddingRight: 10}} />
						}
					</TouchableOpacity>
				</View>
				{Object.keys(decks).length <= 0
					? <View style={{flex: 6, alignItems: 'center', marginTop: 100}}>
							<TouchableOpacity onPress={() => navigation.navigate('NewDeck')}>
								<Text style={{fontSize: size.huge, textAlign: 'center'}}>No cards yet.</Text>
								<Text style={{fontSize: size.huge, textAlign: 'center', color: colors.secondary.dark}}>Make your first deck!</Text>
							</TouchableOpacity>
						</View>
					:	<DeckList
							decks={decks}
							cards={cards}
							navigation={navigation}
							modal={modal}
							openModal={this.openModal}
							closeModal={this.closeModal}
						/>
				}
			</View>
		);
	}
}

DeckListContainer.propTypes = {
	navigation: PropTypes.object.isRequired
};

export default DeckListContainer;
