export function militaryToAMPM(time) {
  time = time.split(':');

  var hours = Number(time[0]);
  var minutes = Number(time[1]);
  var seconds = Number(time[2]);

  var timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue= "" + hours;
  } else if (hours > 12) {
    timeValue= "" + (hours - 12);
  } else if (hours == 0) {
    timeValue= "12";
  }

  timeValue += (minutes === 0) ? "" : (minutes < 10) ? ":0" + minutes : ":" + minutes;
  timeValue += (hours >= 12) ? "PM" : "AM";
  return timeValue
}

export function renderHoursString(hours) {
  return hours.reduce((acc, hour) => {
    let opening = militaryToAMPM(hour.from_hour);
    let closing = militaryToAMPM(hour.to_hour);
    return acc + ` ${opening}-${closing},`
  }, "").replace(/(^,)|(,$)/g, "");
}
