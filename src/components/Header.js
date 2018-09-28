import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

//import images
import logo from '../assets/images/mytapp.png';
import profile from '../assets/images/profile.png';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: props.term || '',
            termError: false
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
    }

    handleInput(e) {
        let inputs = {...this.state};
        inputs[e.currentTarget.name] = e.currentTarget.value;

        this.setState({...inputs, termError: false});
    }

    handleInputFocus(e) {
        this.setState({
            termError: false
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if( this.state.term.trim() ){
            this.props.history.push(`/search/${this.state.term}`);
        } else {
            this.setState({
                termError: true
            });
        }
    }

    render() {
        return (
            <header className="beer-header">
                <div className="beer-logo">
                    <Link to="/">
                        <img src={logo} alt="Beer logo" />
                    </Link>
                </div>
                <div className="search">
                    <div className="search-bar">
                        <form action="/search" method="GET" onSubmit={this.handleSubmit}>
                            <input className={this.state.termError ? 'has-danger' : ''} name="term" type="text" placeholder="Que cerveja você procura?" onFocus={this.handleInputFocus} onChange={this.handleInput} value={this.state.term}/>
                            <button type="submit" className="search-button">
                                <img alt="hollow" src="/assets/images/hollow.png" srcSet="assets/images/hollow@2x.png 2x,assets/images/hollow@3x.png 3x" className="hollow" />
                            </button>
                        </form>
                    </div>
                </div>
                <div className="account">
                    <div className="avatar-image">
                        <img src={profile} alt="Roberto Gripa Filho" />
                    </div>
                    <div className="avatar-name">
                        Roberto Gripa Filho
                    </div>
                </div>
            </header>
        )
    }
}

export default withRouter(Header);