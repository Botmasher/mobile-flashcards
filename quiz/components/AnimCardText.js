import React from 'react';
import { Animated } from 'react-native';

class AnimCardText extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			opacity: new Animated.Value(0)
		};
	}
	componentDidMount() {
		Animated.sequence([
			Animated.delay(100),
			Animated.timing(this.state.opacity, {
				toValue: 1,
				duration: 250
			})
		]).start();
	}
  render() {
		return (
			<Animated.View style={{...this.props.style, opacity: this.state.opacity}}>
				{this.props.children}
			</Animated.View>
		);
	}
}

export default AnimCardText;
