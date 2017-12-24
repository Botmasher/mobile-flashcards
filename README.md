# Mobile Flashcards

## About this project
This React Native iOS app allows you to build decks of flashcards and to quiz yourself and your friends. It was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app). It follows the [Udacity rubric](https://review.udacity.com/#!/rubrics/1021/view) for this project and aims to adhere to the [Nanodegree styleguide](http://udacity.github.io/frontend-nanodegree-styleguide/).

## Getting Started
Instructions for installing and running the app on your local machine go here. Also include notes about using an iOS/Android simulator vs mobile device.

To install and run the app on your local machine:
1. make sure that `npm` / `yarn` are installed
2. fork, clone or download this project
3. navigate to the project root and run `yarn install` or `npm install`
4. start the project server with `yarn start` or `npm start`

To simulate the project on your local Mac (tested with a MacBook Air, Early 2015):
1. verify that [Xcode](https://developer.apple.com/xcode/) is installed (tested with Xcode 9.2)
2. check that watchman and command line tools are installed using [this guide](https://facebook.github.io/react-native/docs/getting-started.html)
3. navigate to the project directory
4. start the app with `yarn start`
5. select `i` to open the project in the iOS simulator

To run the installed app on your mobile device:
1. install the [Expo client app](https://expo.io/) on your mobile device
2. navigate to the project directory on your local machine
3. run `yarn start`
4. scan the QR code in the terminal or enter the address in the Expo app

## Dependencies:
FlashCards is built atop the following dependencies:
- [Node](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [React](https://github.com/facebook/react)
- [React Native](https://github.com/facebook/react-native)
- [Expo](https://expo.io/)
- [React Navigation](https://github.com/react-community/react-navigation)
- [Reselect](https://github.com/reactjs/reselect)
- [uuid](https://www.npmjs.com/package/uuid)

## App Structure
FlashCards is built out of React Native components and leverages local storage.

### Core Views
1. Deck List View (Default View)
  - displays the title of each Deck
  - displays the number of cards in each deck
2. Individual Deck View
  - displays the title of the Deck
  - displays the number of cards in the deck
  - displays an option to start a quiz on this specific deck
  - an option to add a new question to the deck
3. Quiz View
  - displays a card question
  - an option to view the answer (flips the card)
  - a "Correct" button
  - an "Incorrect" button
  - the number of cards left in the quiz
  - displays the percentage correct once the quiz is complete
4. New Deck View
  - an option to enter in the title for the new deck
  - an option to submit the new deck title
5. New Question View
  - an option to enter in the question
  - an option to enter in the answer
  - an option to submit the new question

Subcomponents break out additional UI for certain features.

Navigation between screens is accomplished with `StackNavigator`.

### Files and Folders
Folders are structured by feature (following the five main views above), akin to [ducks for Redux](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be). Presentation components are separated from container components. The root `App.js` mainly routes between screens and sets a daily local notification (method in `/utils/helpers.js` and reset in Quiz results subcomponent).

`reselect` selectors are used in Deck List to rearrange all cards into per cards deck.

Additional code was abstracted into `/utils`:
- `api` for crud operations on local storage
- `colors` for text and elements
- `font` for text and icon sizes
- `helpers` sorting functions and setup for notifications

### Data
Local storage divides FlashCards data into `decks` and `cards`. Besides a uuid `id` and a `timestamp`, each deck in `decks` stores a presentation `name`, and each card in `cards` stores a `question` and an `answer`. Deck List fetches `cards` and `decks`, and uses them to deal cards into cards per deck with selectors. New Deck adds or edits a deck. New Question adds or edits a question. Individual decks can be removed in Deck List list items. Individual cards can be removed in Deck list items.

Methods for fetching, creating, updating, and deleting decks and cards are found in `utils/api.js`.

The shape of these objects differs from a simpler original example in the Udacity specifications:

```
{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
```

In this example, each deck creates a new key on the object. Each deck has a `title` and a `questions` key. `title` is the title for the specific deck and `questions` is an array of questions and answers for that deck.

In FlashCards, the current storage instead takes this shape:

```
decks: {
  'uuid': {
    id: 'uuid',
    name: '',
    timestamp: Date.now()
  },
  ...
}

cards: {
  'uuid': {
    id: 'uuid',
    question: '',
    answer: '',
    timestamp: Date.now(),
    decks: []      // id for each deck containing this card
  },
  ...
}
```

This separates a card model from a deck model, where card can belong to one or more decks.

Another difference between specifications and buildout: four helper methods were suggested for managing the `AsyncStorage` database:

`getDecks`: return all of the decks along with their titles, questions, and answers. 
`getDeck`: take in a single `id` argument and return the deck associated with that id. 
`saveDeckTitle`: take in a single `title` argument and add it to the decks. 
`addCardToDeck`: take in two arguments, `title` and `card`, and will add the card to the list of questions for the deck with the associated title.

The final API arsenal is more robust and can be found in `utils/api.js`.

## Contributing

If you're familiar with React Native and would like to contribute to this app, feel free to fork the repository and make a pull request with updates. Before you do, please check my constraints from a previous React Udacity [CONTRIBUTING.md](https://github.com/Botmasher/reactnd-myreads/blob/master/CONTRIBUTING.md), since those points also apply to this project.

For more info about common React Native tasks, check the most recent version of [this guide](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).
