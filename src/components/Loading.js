import React, { Component } from 'react';

class Loading extends Component {
    render() {
        return (
            <div className={`loading-container ${this.props.full ? 'full' : ''}`}>
                <img src="/assets/images/loading.png" srcSet="/assets/images/loading@2x.png 2x, /assets/images/loading@3x.png 3x" alt="Loading"/>
            </div>
        )
    }
}

export default Loading;