import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import ComponentsTestContainer from './componentsTest/containers/';
import DeckListContainer from './deckList/containers';
import DeckContainer from './deck/containers';
import QuizContainer from './quiz/containers';
import NewDeckContainer from './newDeck/containers';
import NewQuestionContainer from './newQuestion/containers';

const App = ({ navigation }) => (
  <DeckListContainer navigation={navigation} />
);

const ScreenNavigator = StackNavigator({
  Home: {
    screen: App
  },
  DeckList: {
    screen: props => <DeckListContainer {...props} />
  },
  Deck: {
    screen: props => <DeckContainer {...props} />
  },
  ComponentsTest: {
    screen: props => <ComponentsTestContainer {...props} />
  },
  Quiz: {
    screen: props => <QuizContainer {...props} />
  },
  NewDeck: {
    screen: props => <NewDeckContainer {...props} />
  },
  NewQuestion: {
    screen: props => <NewQuestionContainer {...props} />
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

export default ScreenNavigator;
