import React, { Component } from 'react';

//import components
import Star from './Star';

class Rating extends Component {
	render() {
		const stars = ( this.props.value && parseFloat(this.props.value) ) || 0;

		return (
			<div className="rating-container">
				{this.props.label && <p>{this.props.label}</p>}
				<ul>
					<li>{stars >= 2 ? <Star active={true}/> : <Star/> }</li>
					<li>{stars >= 4 ? <Star active={true}/> : <Star/> }</li>
					<li>{stars >= 6 ? <Star active={true}/> : <Star/> }</li>
					<li>{stars >= 8 ? <Star active={true}/> : <Star/> }</li>
					<li>{stars >= 10 ? <Star active={true}/> : <Star/> }</li>
				</ul>
				<h5 className="medium">{this.props.value || '0'} / 10</h5>
			</div>
		)
	}
}

export default Rating;