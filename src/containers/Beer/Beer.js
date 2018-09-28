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
                        <div className={`col-md-5 beer-poster-full ${this.state.imageLoaded ? 'image-loaded' : ''}`} style={this.state.imageLoaded ? {backgroundImage: `url('${this.props.beer.image_url ? this.props.beer.image_url : '/assets/images/not-found.png'}')`} : {backgroundImage: 'none'}}></div>
                        <div className="col-md-7">
                            <div className="beer-container">
                                <h2>{beer.name}</h2>
                                <h5>{beer.description}</h5>
                                <div className="beer-description">
                                    <Rating label="IBU:" value={beer.ibu/10}/>
                                    <Rating label="ABV:" value={beer.abv}/>
                                    <Rating label="Atenuação:" value={beer.attenuation_level/10}/>
                                    <nav>
                                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Ingredientes</a>
                                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Comidas</a>
                                        <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Método</a>
                                      </div>
                                    </nav>
                                    <div className="tab-content" id="nav-tabContent">
                                      <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">...</div>
                                      <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
                                      <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
                                    </div>
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
