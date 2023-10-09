import React, { Component } from 'react';

// Chance card
class StationOther extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: null,
    };
  }

  // Handle card selection
  handleSelectCard = (card) => {
    this.setState({ selectedCard: card });
  };

  // Handle executing the selected command
  handleExecuteCommand = () => {
    const { selectedCard } = this.state;

    if (selectedCard) {
      // Execute the command based on the selected card
      switch (selectedCard) {
        case 1:
          this.executeCommand1();
          break;
        case 2:
          this.executeCommand2();
          break;
        case 3:
          this.executeCommand3();
          break;
        case 4:
          this.executeCommand4();
          break;
        case 5:
          this.executeCommand5();
          break;
        default:
          break;
      }
      // Clear the selected card
      this.setState({ selectedCard: null });
    }
  };

  // Implement the logic for each command
  executeCommand1 = () => {
    // Execute the logic for command 1
    // Query the cities owned by the player and apply the corresponding actions
  };

  executeCommand2 = () => {
    // Execute the logic for command 2
    // Analyze a Feng Shui location and apply the corresponding actions
  };

  executeCommand3 = () => {
    // Execute the logic for command 3
    // Query the cities owned by the player and apply the corresponding actions
  };

  executeCommand4 = () => {
    // Execute the logic for command 4
    // Query the player's cities, calculate distances, and apply the corresponding actions
  };

  executeCommand5 = () => {
    // Execute the logic for command 5
    // Organize a cultural exchange event, select a random city, and apply the corresponding actions
  };

  render() {
    const { selectedCard } = this.state;

    return (
      <div className="station station--other">
        <h3>Pick up a chance card</h3>
        <div className="card-list">
          {/* List of chance cards */}
          <div
            className={`opportunity-card ${selectedCard === 1 ? 'selected' : ''}`}
            onClick={() => this.handleSelectCard(1)}
          >
            chance card 1
          </div>
          <div
            className={`opportunity-card ${selectedCard === 2 ? 'selected' : ''}`}
            onClick={() => this.handleSelectCard(2)}
          >
            chance card 2
          </div>
          <div
            className={`opportunity-card ${selectedCard === 3 ? 'selected' : ''}`}
            onClick={() => this.handleSelectCard(3)}
          >
            chance card 3
          </div>
          <div
            className={`opportunity-card ${selectedCard === 4 ? 'selected' : ''}`}
            onClick={() => this.handleSelectCard(4)}
          >
            chance card 4
          </div>
          <div
            className={`opportunity-card ${selectedCard === 5 ? 'selected' : ''}`}
            onClick={() => this.handleSelectCard(5)}
          >
            chance card 5
          </div>
        </div>
        <button onClick={this.handleExecuteCommand}>Execute Command</button>
      </div>
    );
  }
}

export default StationOther;
