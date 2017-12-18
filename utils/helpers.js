export function dealCardsIntoDecks(cards) {
	// Reduce over cardIds to store lists of cards per deck
	// Returned object shape: { deckId0: {cardId_0 : {card_0}, ... }, ... }
	const cardsPerDeck = Object.keys(cards).reduce((allDealtCards, cardId) => {
		return {
			...allDealtCards,
			...cards[cardId].decks.reduce((decksWithCurrentCard, deckId) => {
				const currentCard = {[cardId]: cards[cardId]};
				const currentDeckCards = allDealtCards[deckId];
				return {
					...decksWithCurrentCard,
					[deckId]: currentDeckCards ? {...currentDeckCards, ...currentCard} : currentCard
				};
			}, {})
		};
	}, {});
	return cardsPerDeck;
}

export function countCardsPerDeck(cards) {
	const cardCountsPerDeck = Object.keys(cards).reduce((allDealtCards, cardId) => {
		return {
			...allDealtCards,
			...cards[cardId].decks.reduce((decksWithThisCard, deckId) => {
				return {
					...decksWithThisCard,
					[deckId]: allDealtCards[deckId] ? allDealtCards[deckId]+1 : 1
				};
			}, {})
		};
	}, {});
	return cardCountsPerDeck;
}
