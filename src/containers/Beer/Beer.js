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

    renderIngredients() {
        let ingredientsResult = [];

        for (const ingredients in this.state.beer.ingredients) {
            if( Array.isArray(this.state.beer.ingredients[ingredients]) ) {
                ingredientsResult = this.state.beer.ingredients[ingredients].map(ingredient => {
                    return (
                        <tr key={Math.floor(Math.random()*1234)}>
                            <td>{ingredient.name}</td>
                            <td>{ingredient.amount.value || 0}</td>
                            <td>{ingredient.amount.unit || 'kilograms'}</td>
                        </tr>
                    );
                });
            }
        }

        return ingredientsResult;
    }

    renderFoods() {
        let foodsResult = [];

        if( Array.isArray(this.state.beer.food_pairing) ) {
            foodsResult = this.state.beer.food_pairing.map(food => {
                return (
                    <tr key={Math.floor(Math.random()*1234)}>
                        <td>{food}</td>
                    </tr>
                );
            });
        }

        return foodsResult;
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
                        <div className={`col-md-5 beer-poster-full ${this.state.imageLoaded ? 'image-loaded' : ''}`} style={this.state.imageLoaded ? {backgroundImage: `url( '${this.props.beer.image_url ? this.props.beer.image_url : '/assets/images/not-found.png '}')`} : {backgroundImage: 'none'}}></div>
                        <div className="col-md-7 beer-container">
                            <h2>{beer.name}</h2>
                            <h5>{beer.description}</h5>
                            <div className="beer-description">
                                <Rating label="IBU:" value={beer.ibu/10}/>
                                <Rating label="ABV:" value={beer.abv}/>
                                <Rating label="Atenuação:" value={beer.attenuation_level/10}/>
                                { beer.ingredients && beer.food_pairing && beer.food_pairing.length &&
                                    ( <div>
                                        <nav>
                                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Ingredientes</a>
                                                <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Comidas</a>
                                            </div>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">
                                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                                <table className="table table-striped">
                                                    <tbody>
                                                        {this.renderIngredients()}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                                <table className="table table-striped">
                                                    <tbody>
                                                        {this.renderFoods()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div> )
                                }
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
