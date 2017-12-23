import React from 'react';
import { Animated } from 'react-native';

class AnimCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: new Animated.Value(0)
		};
	}
	componentDidMount() {
		Animated.timing(this.state.width, {
			toValue: 350,
			duration: 250
		}).start();
	}
  render() {
		return (
			<Animated.View style={[this.props.style, {width: this.state.width}]}>
				{this.props.children}
			</Animated.View>
		);
	}
}

export default AnimCard;
