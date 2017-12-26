import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

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

// local notifications
const NOTIFICATION_KEY = 'MobileFlashCards:notifications';

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

const createNotification = () => ({
  title: 'Study your FlashCards!',
  body: 'Remember to quiz your way through your decks today.',
  ios: {
    sound: true
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true
  }
});

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              );
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
          .catch((e) => console.log(e));
      }
    });
}

export function truncate(txt, count) {
  let truncated;
  if (txt.length <= count) {
    truncated = txt;
  } else {
    truncated = ['.', '?', ' ', '!', ':', ';', '-'].includes(txt[txt.length-1])
      ? txt.substring(0, count-1).concat('...')
      : txt.substring(0, count).concat('...')
    ;
  }
  return truncated;
}
