import React from 'react';
import { Animated } from 'react-native';

class AnimCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: new Animated.Value(0),
			update: 0
		};
		this._width = 0;
	}
	componentWillMount() {
		this.l = this.state.width.addListener(({value}) => this._width = value);
	}
	componentDidMount() {
		Animated.timing(this.state.width, {
			toValue: 350,
			duration: 400
		}).start();
	}
	componentWillUnmount() {
		this.state.width.removeAllListeners();
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
