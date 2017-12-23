import React from 'react';
import { StackNavigator } from 'react-navigation';
import ComponentsTestContainer from './componentsTest/containers/';
import DeckListContainer from './deckList/containers';
import DeckContainer from './deck/containers';
import QuizContainer from './quiz/containers';
import NewDeckContainer from './newDeck/containers';
import NewQuestionContainer from './newQuestion/containers';
import { setLocalNotification } from './utils/helpers';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    setLocalNotification();
  }
  render () {
    const { navigation } = this.props;
    return <DeckListContainer navigation={navigation} />;
  }
}

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

export default ScreenNavigator;
