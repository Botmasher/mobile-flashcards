import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import ComponentsTestContainer from './componentsTest/containers/';
import DeckListContainer from './deckList/containers';
import DeckContainer from './deck/containers';

export default class App extends React.Component {
  render() {
    return (
      <ScreenNavigator />
    );
  }
}

const ScreenNavigator = StackNavigator({
  Home: {
    screen: props => <DeckListContainer {...props} />
  },
  Deck: {
    screen: DeckContainer
  },
  ComponentsTest: {
    screen: ComponentsTestContainer
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
