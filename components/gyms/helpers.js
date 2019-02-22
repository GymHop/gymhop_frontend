
export function getTierDisplay (price) {
  let dollarSigns;
  let budget = ["Budget", "Wallet friendly", "A budget Gym", "Less expensive", "In your budget"];
  let premium = ["Premium","A premium Gym", "A little pricier", "A nicer gym", "😍 You'll love this one"];
  switch (price) {
    case 0:
      dollarSigns = "";
      break;
    case 1:
      dollarSigns = budget[0];
      break;
    case 2:
      dollarSigns = premium[0];
      break;
    default:
      dollarSigns = ""
  }
  return dollarSigns
}
