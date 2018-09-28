import React, { Component } from 'react';
import { connect } from 'react-redux';

//import components
import { Header, Loading, Beerbox } from '../../components';

//import Redux Beers action
import { SearchBeers } from '../../actions';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchBeers: [],
            loading: false
        }
    }

    componentWillMount(){
        if( this.props.match && this.props.match.params && this.props.match.params.term ) {
            this.props.dispatch(SearchBeers(this.props.match.params.term));
        }
    }

    componentWillReceiveProps(nextprops){
        if( nextprops.match.params.term !== this.props.match.params.term ){
            this.setState({
                loading: true,
                searchBeers: []
            });
            this.props.dispatch(SearchBeers(nextprops.match.params.term));
        }

        if( nextprops.match.params.term === this.props.match.params.term && nextprops.searchBeers.length ) {
            this.setState({
                loading: false,
                searchBeers: nextprops.searchBeers
            });
        }
    }
    
    render() {
        console.log(this);

        if( this.state.loading || !this.state.searchBeers.length ) {
            return (
                <div>
                    <Header term={this.props.match.params.term || ''}/>
                    <Loading/>
                </div>
            )
        }

        return (
            <div>
                <Header term={this.props.match.params.term || ''}/>
                <div className="search-page">
                    <div className="ctainer">
                        <h3 className="category-name">{this.props.match.params.term}</h3>
                        <div className="row beers-container">
                            {
                                this.state.searchBeers.map((beer, index) => {
                                    return <Beerbox key={index} beer={beer} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        searchBeers: store.beers.searchBeers
    }
};

export default connect(mapStateToProps)(Search);