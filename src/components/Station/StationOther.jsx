import React, { Component } from 'react';
import "./StationCity.css";
import './StationOther.css';
import CardBackImage from '../../assets/chancecard/chanceback.png';
import CardContentImage from '../../assets/chancecard/chancecontent.png'
import ChanceCard1 from '../ChanceCards/ChanceCard1';
import ChanceCard2 from '../ChanceCards/ChanceCard2';
import ChanceCard3 from '../ChanceCards/ChanceCard3';
import ChanceCard4 from '../ChanceCards/ChanceCard4';

class StationOther extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCardIndex: null, // Track the selected card index
      isCardFlipped: false, // Track if the card is flipped to show content
      isCardExecuted: false, // Track if the card is executed
    };
  }

  // 定义一个数组来存储所有的 ChanceCard 组件
  chanceCards = [
    ChanceCard1,
    ChanceCard2,
    ChanceCard3,
    ChanceCard4,
    // ChanceCard5,
    // ChanceCard6,
  ];

  // Handle the card click to flip and show content
  handleCardClick = (cardIndex) => {
    this.setState({
      selectedCardIndex: cardIndex,
      isCardFlipped: true,
      isCardExecuted: false,
    });
  }

  // Handle the execute button click
  handleExecuteButtonClick = () => {
    const { selectedCardIndex } = this.state;
    this.setState({
      isCardFlipped: true,
      isCardExecuted: true,
    });
    console.log('isCardExecuted:'+this.state.isCardExecuted);
    this.setState(
      {
        isCardExecuted: true,
      },
      () => {
        // 在状态更新完成后执行其他操作
        console.log('isCardExecuted is now true');
      }
    );
  };

  handleCardClose = () => {
    this.setState({
      selectedCardIndex: null,
      isCardFlipped: false,
      isCardExecuted: false,
    });
  }

  // Render the window content
  renderWindowContent() {
    const { selectedCardIndex, isCardFlipped, isCardExecuted } = this.state;
    if (isCardFlipped) {
      if (isCardExecuted) {
        return (
        <div className="card-executed">
          {/* Render the card content based on selectedCardIndex */}
          {this.renderCardExecuted(selectedCardIndex)}
          <button onClick={this.handleCardClose}>Commit</button>
        </div>
        );
      } else {
        // Display the selected card content and execute button
        return (
          <div className="card-content">
            {/* Render the card content based on selectedCardIndex */}
            {this.renderCardContent(selectedCardIndex)}
            <button onClick={this.handleExecuteButtonClick}>Execute</button>
          </div>
        );
      }
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

  renderCardExecuted(selectedCardIndex) {
    if (selectedCardIndex !== null) {
      const ChanceCardComponent = this.chanceCards[selectedCardIndex];
      // console.log('renderCardExecuted');
      // console.log(this.chanceCards);
      // console.log(ChanceCardComponent);
      if (ChanceCardComponent) {
        console.log('ChanceCardComponent =/= 0');
        return (
          <div className="chance-card-executed">
            <h3 className='card--title'>Result</h3>
            <ChanceCardComponent {...this.props}/>;
          </div>
        );
      }
      else{
        return (
          <div className="chance-card-executed">
            <h1> ChanceCardComponent = 0 </h1>
          </div>
        );
    }}
    return (
      <div className="chance-card-executed">
        <h1> selectedCardIndex = null </h1>
      </div>
    );
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