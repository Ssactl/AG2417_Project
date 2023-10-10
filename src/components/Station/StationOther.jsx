import React, { Component } from 'react';
import "./StationCity.css";
import './StationOther.css';
import CardBackImage from '../../assets/chancecard/chanceback.png';
import CardContentImage from '../../assets/chancecard/chancecontent.png'
import ChanceCard1 from '../ChanceCards/ChanceCard1';
import ChanceCard2 from '../ChanceCards/ChanceCard2';
import ChanceCard4 from '../ChanceCards/ChanceCard4';
import ChanceCardContent from '../ChanceCards/ChanceCardContent';

class StationOther extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCardIndex: null, // Track the selected card index
      isCardFlipped: false, // Track if the card is flipped to show content
    };
  }

  // Handle the card click to flip and show content
  handleCardClick = (cardIndex) => {
    this.setState({
      selectedCardIndex: cardIndex,
      isCardFlipped: true
    });
  }

  // Handle the execute button click
  handleExecuteButtonClick = () => {
    const { selectedCardIndex } = this.state;
    // Execute logic based on the selected chance card index
    this.executeChanceCard(selectedCardIndex);
  };

  // Execute logic for each chance card
  executeChanceCard = (cardIndex) => {
    // Use switch statement to execute logic for each card
    switch (cardIndex) {
      case 0:
        // Execute logic for Chance Card 1
        ChanceCard1.execute(this.props);
        break;
      case 1:
        // Execute logic for Chance Card 2
        ChanceCard2.execute(this.props);
        break;
      // case 2:
      //   // Execute logic for Chance Card 3
      //   ChanceCard3.execute(this.props);
      //   break;
      case 3:
        // Execute logic for Chance Card 4
        ChanceCard4.execute(this.props);
        break;
      // case 4:
      //   // Execute logic for Chance Card 5
      //   ChanceCard5.execute(this.props);
      //   break;
      // case 5:
      //   // Execute logic for Chance Card 6
      //   ChanceCard6.execute(this.props);
      //   break;
      default:
        // Handle unknown card
        console.log('Unknown chance card');
    }
  };

  // Render the window content
  renderWindowContent() {
    const { selectedCardIndex, isCardFlipped } = this.state;

    if (isCardFlipped) {
      // Display the selected card content and execute button
      return (
        <div className="card-content">
          {/* Render the card content based on selectedCardIndex */}
          {this.renderCardContent(selectedCardIndex)}
          <button onClick={this.handleExecuteButtonClick}>Execute</button>
        </div>
      );
    } else {
      // Display the initial window with six red card options
      return (
        <div className="card-options">
          <h3 className='card--title'>Select  a  Chance  Card</h3>
          <ul>
            {this.renderCardOptions()}
          </ul>
        </div>
      );
    }
  }

  // Render the card options
  renderCardOptions() {
    const cardIndices = [0, 1, 2, 3, 4, 5];
    return (
      <div className="card-options">
        <ul className="card-grid">
          {cardIndices.map((index) => (
            <li
              key={index}
              onClick={() => this.handleCardClick(index)}
              className="card"
            >
              <div
                className={`card-inner ${this.state.isCardFlipped ? 'flipped' : ''}`}
                style={{ backgroundImage: `url(${CardBackImage})` }}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Render the card content based on selectedCardIndex
  renderCardContent(selectedCardIndex) {
    if (selectedCardIndex !== null) {
      let cardContent = null;
      switch (selectedCardIndex) {
        case 0:
          cardContent = "Query player's cities in the northwest region and grant subsidies.";
          break;
        case 1:
          cardContent = "Discover a Feng Shui treasure. Analyze a city or location.";
          break;
        case 2:
          cardContent = "Query player's cities for Cuisine upgrades and impose fines.";
          break;
        case 3:
          cardContent = "Receive rewards for cities within 300km of each other.";
          break;
        case 4:
          cardContent = "Host a cultural exchange event in a city.";
          break;
        case 5:
          cardContent = "Organize a geography contest.";
          break;
        default:
          cardContent = "Unknown chance card";
          break;
      }
      return (
        <div className="chance-card-content">
          <h3>CHANCE CARD</h3>
          <p>{cardContent}</p>
        </div>
      );
    }
    return null; // 如果 selectedCardIndex 为 null，则不显示内容
  }

  render() {
    return (
      <div className="station--other">
        {this.renderWindowContent()}
      </div>
    );
  }
}

export default StationOther;