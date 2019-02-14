
import React from 'react';
import { StyleSheet, View, Picker, } from 'react-native';

export default class BirthdayPicker extends React.Component {
  static defaultProps= {
    selectedYear:   (new Date()).getFullYear(),
    selectedMonth:  (new Date()).getMonth(),
    selectedDay:    (new Date()).getDate(),
    yearsBack:      100,

    onYearValueChange: function(year, idx) { },
    onMonthValueChange: function(month, idx) { },
    onDayValueChange: function(day, idx) { },
  }

  constructor(props) {
    super(props);

    this.startingYear = this.props.selectedYear;
    this.state = {
      year:     this.props.selectedYear,
      month:    this.props.selectedMonth,
      day:      this.props.selectedDay,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      year: nextProps.selectedYear, month: nextProps.selectedMonth, day: nextProps.selectedDay
    });
  }

  getLocale() {
    if (navigator.language) { return navigator.language; }
    if (navigator.languages && navigator.languages.length > 0) { return navigator.languages[0]; }
    return "en-us";
  }

  getMonthNames() {
    // var locale = this.getLocale();
    //
    // var monthNames = [];
    // for (var i = 0; i < 12; i++) {
    //   var date = new Date(2000, i, 15);
    //   monthNames.push(date.toLocaleString(locale, { month: "long" }));
    // }
    return ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    // return monthNames;
  }

  getNumDaysInMonth(year, month) {

    return (year == 0 && month == 1) ? 29 : (new Date(year, month + 1, 0).getDate());
  }

  renderYearPickerItems() {

    var currentYear = (new Date()).getFullYear();
    var centerYear = this.startingYear;
    if (centerYear === 0) { centerYear = currentYear; }

    var startYear = centerYear - this.props.yearsBack;
    var endYear = currentYear;

    var years = [];
    for (var i = startYear; i <= endYear; i++) {
      years.push(<Picker.Item label={i.toString()} value={i} key={i} />);
    }
    years.push(<Picker.Item label="----" value={0} key={0} />);
    return years;
  }

  renderMonthPickerItems() {
    var months = this.getMonthNames();
    return months.map(function(month, index) {
      return <Picker.Item label={month} value={index} key={index} />;
    });
  }

  renderDayPickerItems() {

    var numDays = this.getNumDaysInMonth(this.state.year, this.state.month);

    var days = [];
    for (var i = 1; i <= numDays; i++) {
        days.push(<Picker.Item label={i.toString()} value={i} key={i} />);
    }
    return days;
  }

  onYearChange = (value, index) => {

    var maxDays = this.getNumDaysInMonth(value, this.state.month);
    var day = (this.state.day > maxDays) ? maxDays : this.state.day;

    this.setState({ year: value, day: day });
    this.props.onYearValueChange(value, index);
  }

  onMonthChange = (value, index) => {

    var maxDays = this.getNumDaysInMonth(this.state.year, value);
    var day = (this.state.day > maxDays) ? maxDays : this.state.day;

    this.setState({ month: value, day: day });
    this.props.onMonthValueChange(value, index);
  }

  onDayChange = (value, index) => {
    this.setState({ day: value });
    this.props.onDayValueChange(value, index);
  }

  render() {
    return (
      <View style={[styles.container, ...this.props.styles]}>
        <Picker style={[styles.monthPicker, styles.light]} selectedValue={this.state.month} onValueChange={this.onMonthChange}>
          {this.renderMonthPickerItems()}
        </Picker>

        <Picker style={[styles.dayPicker, styles.light]} selectedValue={this.state.day} onValueChange={this.onDayChange}>
          {this.renderDayPickerItems()}
        </Picker>

        <Picker style={[styles.yearPicker, styles.light]} selectedValue={this.state.year} onValueChange={this.onYearChange}>
          {this.renderYearPickerItems()}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:    { flexDirection: "row", },
  monthPicker:  { flex: 3, },
  dayPicker:    { flex: 1, },
  yearPicker:   { flex: 2, },
  light:        { color: "white", backgroundColor: "black"}
});
