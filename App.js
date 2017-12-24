import React from 'react';
import DeckListContainer from './deckList/containers';
import ScreenNavigator from './ScreenNavigator';
import { setLocalNotification } from './utils/helpers';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    setLocalNotification();
  }
  render () {
    return <ScreenNavigator />;
  }
}

export default App;
