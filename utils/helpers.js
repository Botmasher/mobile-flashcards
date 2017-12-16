export function countCardsPerDeck (cards, decks={}) {
	// Reduce over cardIds to store lists of cards per deck
	// shape of resulting counts obj:  { deckId0: [cardId0, ... cardId_n], ... deckId_n: [cardId_0, ... cardId_n] }
	const cardsPerDeck = Object.keys(cards).reduce((allDealtCards, cardId) => {
		return {
			...allDealtCards,
			...cards[cardId].decks.reduce((decksWithThisCard, deckId) => {
				return {
					...decksWithThisCard,
					[deckId]: allDealtCards[deckId] ? [...allDealtCards[deckId], cardId] : [cardId]
				};
			}, {})
		};
	}, {});
	return cardsPerDeck;
}
