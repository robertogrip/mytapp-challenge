import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Beerbox extends Component {

    render() {
        if( !this.props.beer || !this.props.beer.id ) {
            return null
        }
        
        return (
            <div className="col-4 col-sm-3 col-md-2 beer">
                <Link to={`/beer/${this.props.beer.id}`} className="beer-poster">
                    <img src={this.props.beer.image_url ? this.props.beer.image_url : '/assets/images/not-found.png'} alt="Beer poster"/>
                    <div className="beer-info">
                        <h6 className="beer-title">{this.props.beer.name}</h6>
                        <p className="beer-tagline">{this.props.beer.tagline}</p>
                        <div className="row beer-contains">
                            <div className="col-6">
                                <p className="beer-ibu">IBU: {this.props.beer.ibu}</p>
                            </div>
                            <div className="col-6">
                                <p className="beer-abv">ABV: {this.props.beer.abv}%</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Beerbox;