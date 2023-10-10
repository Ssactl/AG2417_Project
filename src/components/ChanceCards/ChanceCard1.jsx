import React from 'react';

class ChanceCard1 extends React.Component {
  static execute(props) {
    // Execute logic for Chance Card 1: 
    // "Query player's cities in the northwest region and grant subsidies."
    
    // Access props to interact with the game state
    // For example, props.setSubsidies(1000);
    console.log('here is chancecard1');
  }

  render() {
    return (
      <div>
        <h3>Chance Card 1 Content</h3>
        {/* Add content for Chance Card 1 */}
      </div>
    );
  }
}

export default ChanceCard1;
