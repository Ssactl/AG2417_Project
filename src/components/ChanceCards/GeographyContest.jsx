import React, { Component } from 'react';

class GeographyContestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnsweringQuestion: false,
      isQuestionCorrect: false,
    };
  }

  handleAnswerQuestion = (answer) => {
    const isCorrect = answer === 'Correct';

    this.setState({
      isAnsweringQuestion: false,
      isQuestionCorrect: isCorrect,
    });

    if (isCorrect) {
      // Execute reward logic here
      const rewardResult = executeRewardLogic();
      this.props.onExecute(rewardResult);
    }
  };

  render() {
    const { isAnsweringQuestion } = this.state;

    if (isAnsweringQuestion) {
      return (
        <div>
          <h3>Answer the Question</h3>
          <p>Please answer a question about world geography:</p>
          <input type="text" placeholder="Enter your answer" />
          <button onClick={() => this.handleAnswerQuestion("Correct")}>Submit Answer</button>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Geography Contest Card</h3>
          <p>You have chosen to host a geography contest.</p>
          <button onClick={() => this.setState({ isAnsweringQuestion: true })}>Start Answering</button>
          <button onClick={this.props.onCancel}>Cancel</button>
        </div>
      );
    }
  }
}

function executeRewardLogic() {
  return "You answered the question correctly and received 1000 units from other players.";
}

export default GeographyContestCard;
