import React from 'react';
import Quiz from '../components/';

function QuizContainer(props) {
	const { navigation } = props;
	return (
		<Quiz navigation={navigation} />
	);
}

export default QuizContainer;
