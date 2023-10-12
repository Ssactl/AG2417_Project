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
    this.props.nextPlayer();
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
          <button onClick={this.handleCardClose}>Done</button>
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
          cardContent = "Northwest Region Government Subsidy: In the cities you own, each one located in the northwest region is eligible for a government subsidy. Each city will receive a subsidy of 500 units of currency. If a city has been upgraded, you will receive an additional 1000 units.";
          break;
        case 1:
          cardContent = "Feng Shui Discovery: You've stumbled upon a Feng Shui treasure. Now, you can choose to analyze a city or location. If you already own it, its value will double. If you haven't acquired it yet, you can purchase it at a discounted price.";
          break;
        case 2:
          cardContent = "Cuisine Desert Title: In the cities you own, if none of them have the Cuisine, you will be awarded the Cuisine Desert title, but you'll also face a penalty of 1000 units of currency.";
          break;
        case 3:
          cardContent = "Distance Bonus: In the cities you own, if the distance between any two cities is less than 300 kilometers, you will receive a bonus of 1000 units.";
          break;
        case 4:
          cardContent = "Cultural Exchange Event: You've organized a cultural exchange event in one of your cities, attracting tourists. Randomly select a city, and its value will increase by 200 units. Other players will have to pay you a fee of 400 units each.";
          break;
        case 5:
          cardContent = "Geography Contest Challenge: You've participated in a geography contest, answering questions about world geography. If you answer correctly, you'll receive 1000 units from each of the other players.";
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
        console.log(this.props);
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