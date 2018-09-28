import React, { Component } from 'react';
import { connect } from 'react-redux';

//import components
import { Beerbox, Loading, Header } from '../../components';

//import Redux FetchBeers action
import { FetchBeers } from '../../actions';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            beers: []
        };
        props.dispatch(FetchBeers());
    }

    componentWillReceiveProps(nextProps) {
        if( nextProps.beers && nextProps.beers.length ) {
            this.setState({ 
                loading: false,
                beers: nextProps.beers
            });
        }
    }

    render() {
        if( this.state.loading ) {
            return (
                <div>
                    <Header/>
                    <Loading/>
                </div>
            )
        }

        return (
            <div>
                <Header/>
                <div className="home-page">
                    <div className="ctainer">
                        <h3 className="category-name">Tendency</h3>
                        <div className="row beers-container">
                            {
                                this.state.beers.map((beer, index) => {
                                    return <Beerbox key={index} beer={beer} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        beers: store.beers.beers
    }
};

export default connect(mapStateToProps)(Home);
