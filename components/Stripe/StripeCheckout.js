import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
 
class TakeMoney extends React.Component {
  constructor(props) {
    super(props);
  }
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_77YUPGjCnGcpWsNkHegQjw8l"
        amount={this.amount}
        email={this.email}
      />
    )
  }
}

export default TakeMoney;