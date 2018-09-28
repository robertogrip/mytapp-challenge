import React, { Component } from 'react';
import { connect } from 'react-redux';
import jQuery from 'jquery';

//import components
import { Rating, Loading } from '../../components';

//import Redux Beers action
import { GetBeer } from '../../actions';

class Beer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beer: {},
            loading: true,
            imageLoaded: false
        };
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        if( this.props.match && this.props.match.params && this.props.match.params.id ) {
            this.props.dispatch(GetBeer(this.props.match.params.id));
        }
    }

    componentWillReceiveProps(nextprops) {
        if( nextprops.beer && ( JSON.stringify(this.props.beer) !== JSON.stringify(nextprops.beer) ) ) {
            this.setState({
                beer: nextprops.beer,
                loading: false
            });

            const that = this;
            jQuery('<img/>').attr('src', that.props.beer.image_url ? that.props.beer.image_url : '/assets/images/not-found.png').on('load', function() {
                jQuery(this).remove();
                that.setState({
                    imageLoaded: true
                });
            });
        }
    }

    goBack(){
        this.props.history.goBack();
    }

    render() {
        if( this.state.loading || !this.state.beer || !this.state.beer.id ){
            return <Loading full={true}/>
        }

        const beer = this.state.beer;

        return (
            <div className="beer-page">
                <a onClick={this.goBack} className="beer-close">
                    <i>&times;</i> Voltar
                </a>
                <div className="ctainer">
                    <div className="row">
                        <div className={`col-md-6 beer-poster-full ${this.state.imageLoaded ? 'image-loaded' : ''}`} style={this.state.imageLoaded ? {backgroundImage: `url('${this.props.beer.image_url ? this.props.beer.image_url : '/assets/images/not-found.png'}')`} : {backgroundImage: 'none'}}></div>
                        <div className="col-md-6">
                            <div className="beer-container">
                                <h2>{beer.Title}</h2>
                                <h6 className="beer-info">{beer.Year} | {beer.Runtime} | {beer.Genre}</h6>
                                <div className="beer-ranking">
                                    <Rating value={beer.imdbRating}/>
                                </div>
                                <div className="beer-description">
                                    <h3>Sinopse</h3>
                                    <p>{beer.Plot}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        beer: store.beers.beer
    }
};

export default connect(mapStateToProps)(Beer);
