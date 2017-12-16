# Mobile Flashcards task list

## Plan and Sketch
- [X] use create-react-native-app to build your project.
- [X] test that the app starts and runs in Expo simulator
- [X] consider project requirements
	- Allow users to create a deck which can hold an unlimited number of cards.
	- Allow users to add a card to a specific deck.
	- The front of the card should display the question.
	- The back of the card should display the answer.
	- Users should be able to quiz themselves on a specific deck and receive a score once they're done.
	- Users should receive a notification to remind themselves to study if they haven't already for that day.
- [X] plan basic project file and folder structure
	- [X] modular by feature
	- [X] separate out presentation vs state management
	- [X] do not separate presentation vs style (e.g. separate css folders)
- [X] plan data storage
	- [X] check fetching local storage data
	- [X] test crud local storage data
	- [X] decide on shape of the storage
	- [X] ensure crud ops works with decided shape - decks: {id: {name},...}, cards: {id: {question, answer, decks},...}
- [X] break out UI crud tests into separate test view
	- [X] copy and update storage methods and container
	- [X] copy and update presentation component
	- [X] update storage methods to set state properly
- [ ] sketch basic UI
	- [ ] Deck List View (Default View)
	  - [ ] displays the title of each Deck
	  - [ ] displays the number of cards in each deck
	- [ ] Individual Deck View
	  - [ ] displays the title of the Deck
	  - [ ] displays the number of cards in the deck
	  - [ ] displays an option to start a quiz on this specific deck
	  - [ ] An option to add a new question to the deck
	- [ ] Quiz View
		- [ ] displays a card question
		- [ ] an option to view the answer (flips the card)
		- [ ] a "Correct" button
		- [ ] an "Incorrect" button
		- [ ] the number of cards left in the quiz
		- [ ] Displays the percentage correct once the quiz is completeIndividual Deck View
	- [ ] New Deck View
	  - [ ] An option to enter in the title for the new deck
	  - [ ] An option to submit the new deck title
	- [ ] New Question View
	  - [ ] An option to enter in the question
	  - [ ] An option to enter in the answer
	  - [ ] An option to submit the new question
- [ ] routing/navigating between UI screens
- [ ] add prop types
- [ ] double check the project requirements list (top of this section)
- [ ] check through Udacity React Native course lessons for important tasks missing here
- [ ] plan out architecture of components and containers
	- [ ] adjustments to View sketches built above
	- [ ] break out subcomponents from those View sketches
	- [ ] any needed new components
- [ ] plan utils
- [ ] update README and TODO as changes made during planning

## Build out
- [ ] break out helper methods
	- [X] card counter
	- [ ] sorting (or use selectors to sort)
- [ ] introduce selectors
- [X] break out async storage api keys and methods
- [ ] style components
- [ ] add and update packages
	- [ ] notifications and permissions
- [ ] reread and adjust based on project requirements (beginning of planning above)
- [ ] notifications for reminders to study that day
- [ ] update README and TODO

## Test

## Go beyond
- [ ] ability to add card to multiple decks
