import React, { Component } from 'react';

class Star extends Component {
	render() {
		if( this.props.active ) {
			return (
				<img src="/assets/images/activeStar.png" srcset="/assets/images/activeStar@2x.png 2x, /assets/images/activeStar@3x.png 3x" className="active" alt="Star"/>
			)
		} else {
			return (
				<img src="/assets/images/star.png" srcset="/assets/images/star@2x.png 2x, /assets/images/star@3x.png 3x" alt="Star"/>
			)
		}
	}
}

export default Star;