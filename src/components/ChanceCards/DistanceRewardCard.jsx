import React, { Component } from 'react';

class DistanceReward extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isBuyingCity: false,
        };
      }
    
      handleBuyCity = () => {
        // Execute buy city logic here
        const buyResult = executeBuyCityLogic();
        this.props.onExecute(buyResult);
      };
    
      render() {
        const { isBuyingCity } = this.state;
    
        if (isBuyingCity) {
          return (
            <div>
              <h3>Buy a City</h3>
              <p>You can purchase a city at a discounted price.</p>
              <button onClick={() => this.handleBuyCity()}>Purchase City</button>
              <button onClick={this.props.onCancel}>Cancel</button>
            </div>
          );
        } else {
          return (
            <div>
              <h3>City Distance Reward Card</h3>
              <p>You have discovered a location with great feng shui.</p>
              <button onClick={() => this.setState({ isBuyingCity: true })}>Analyze Location</button>
              <button onClick={this.props.onCancel}>Cancel</button>
            </div>
          );
        }
      }
    }
    
    function executeBuyCityLogic() {
      return "You have purchased a city at a discounted price.";
    }

export default DistanceReward;
