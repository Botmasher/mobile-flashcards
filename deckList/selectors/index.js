import { createSelector } from 'reselect';

const decksSelector = state => Object.values(state.decks);
const propertySelector = state => state.property;
const ascendingSelector = state => state.ascending;

export const selectDecksSortedNum = createSelector(
	[decksSelector, propertySelector, ascendingSelector],
	(decks, property, ascending) => (
		ascending
			? decks.sort((a, b) => a[property]-b[property])
			: decks.sort((a, b) => b[property]-a[property])
	)
);

export const selectDecksSortedAlpha = createSelector(
	[decksSelector, propertySelector, ascendingSelector],
	(decks, property, ascending) => (
		ascending
			? decks.sort((a, b) => a[property] === b[property] ? 0 : a[property] > b[property] ? 1 : -1)
			: decks.sort((a, b) => a[property] === b[property] ? 0 : a[property] < b[property] ? 1 : -1)
	)
);
