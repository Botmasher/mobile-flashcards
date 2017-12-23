import React from 'react';
import { View, Text, Picker, TouchableOpacity, Platform } from 'react-native';
import DeckList from '../components/';
import Header from '../../header/components/';
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
						<View style={{flexDirection: 'row'}}>
							<Text style={{marginTop: 13}}>sort by: </Text>
							<Picker
								selectedValue={pickerValue}
								onValueChange={(value) => this.handleSort(value)}
								style={{height: 50, marginLeft: -14}}
								itemStyle={{height: 40, width: 100}}
							>
								<Picker.Item label="newest" value="timestamp-desc"  />
								<Picker.Item label="oldest" value="timestamp-asc" />
								<Picker.Item label="A to Z" value="name-asc" />
								<Picker.Item label="Z to A" value="name-desc" />
							</Picker>
						</View>
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
