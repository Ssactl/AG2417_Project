import React, { Component } from 'react';
import './StationOther.css';
import CardBackImage from '../../assets/chancecard/chanceback.png';
import CardContentImage from '../../assets/chancecard/chancecontent.png'
import ChanceCard1 from '../ChanceCards/ChanceCard1';


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

  handleCloseCard() {
    this.setState({
      selectedCardIndex: null,
      isCardFlipped: false,
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
      case 2:
        // Execute logic for Chance Card 3
        ChanceCard3.execute(this.props);
        break;
      case 3:
        // Execute logic for Chance Card 4
        ChanceCard4.execute(this.props);
        break;
      case 4:
        // Execute logic for Chance Card 5
        ChanceCard5.execute(this.props);
        break;
      case 5:
        // Execute logic for Chance Card 6
        ChanceCard6.execute(this.props);
        break;
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
        <div className="card-content" style={{ background: CardContentImage }}>
          {/* Render the card content based on selectedCardIndex */}
          {this.renderCardContent(selectedCardIndex)}
          <button onClick={this.handleExecuteButtonClick}>Execute</button>
        </div>
      );
    } else {
      // Display the initial window with six red card options
      return (
        <div className="card-options">
          <h3>Select a Chance Card</h3>
          <ul>
            {this.renderCardOptions()}
          </ul>
        </div>
      );
    }
  }

  // Render the card options
  renderCardOptions() {
    const cardOptions = [
      "Query player's cities in the northwest region and grant subsidies.",
      "Discover a Feng Shui treasure. Analyze a city or location.",
      "Query player's cities for Cuisine upgrades and impose fines.",
      "Receive rewards for cities within 300km of each other.",
      "Host a cultural exchange event in a city.",
      "Organize a geography contest.",
    ];

    return (
      <div className="card-options">
        <ul className="card-grid">
          {cardOptions.map((option, index) => (
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
      switch (selectedCardIndex) {
        case 0:
          return (
            <div className="card-content">
              <p>Query player's cities in the northwest region and grant subsidies.</p>
              <button onClick={this.handleCloseCard}>Close</button>
            </div>
          );
        case 1:
          return <ChanceCard2Content />;
        case 2:
          return <ChanceCard3Content />;
        case 3:
          return <ChanceCard4Content />;
        case 4:
          return <ChanceCard5Content />;
        case 5:
          return <ChanceCard6Content />;
        default:
          return <div>Unknown chance card</div>;
      }
    }
  }

  render() {
    return (
      <div className="stationchancecards">
        {this.renderWindowContent()}
        {this.renderCardContent(this.state.selectedCardIndex)}
      </div>
    );
  }
}

export default StationOther;
