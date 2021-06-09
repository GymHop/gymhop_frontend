import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart, AreaChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import Colors from '../../constants/Colors';

const CheckinGraph = ({checkins, styles}) => {

  var buckets = {};
  if (checkins.length > 0) {
    // first we bin the checkins by day
    // add a day after to make the graph have a proper axis
    const earliestCheckin = new Date(checkins[checkins.length-1].when.split("T")[0]);
    var latestCheckin = new Date(checkins[0].when.split("T")[0]);
    latestCheckin = latestCheckin.setDate(latestCheckin.getDate()-1);


    var getDaysArray = function(start, end) {
        for(var arr=[],dt=start; dt<=end; dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt));
        }
        return arr;
    };

    // fill with all the days between the range
    let days = getDaysArray(earliestCheckin, latestCheckin);
    for (var idx=0; idx< days.length; idx++) {
      buckets[days[idx].toDateString()] = 0
    }
  }
  // populate days where something happened
  checkins.map((checkin) => {
    let date = new Date(checkin.when).toDateString();
    if (!(date in buckets)) {
      buckets[date] = 1
    } else {
      buckets[date] += 1
    }
  });

  // next we turn that into an arr of objects
  var data = Object.keys(buckets).map((bucket) => {
    return {
      label: bucket,
      value: buckets[bucket]
    }
  });

  // then we sort oldest to newest
  data.sort((a, b) => {
    return new Date(a.label) - new Date(b.label);
  });


  //
  const axesSvg = { fontSize: 10, fill: 'grey' };
  const verticalContentInset = { top: 10, bottom: 10 };
  const horizontalContentInset = { left: 10, right: 10 };
  const xAxisHeight = 30;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const xAxisLabels = data.map((item) => {
    //item.label
    return new Date(item.label).getDate();
  })
  const countData = data.map((item) => {
    return item.value
  })

  console.log("count data below");
  console.log(countData);


  return (
    <View style={{ height: 300, padding: 20, flexDirection: 'row' }}>
      <YAxis
        data={countData}
        style={{ marginBottom: xAxisHeight }}
        contentInset={verticalContentInset}
        svg={axesSvg}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <AreaChart
          data={countData}
          style={{ flex: 1 }}
          contentInset={verticalContentInset}
          svg={{stroke: Colors.darkGreen, strokeWidth: 2, fill: 'rgba(75, 205, 255, 0.6)'}}
          >
          <Grid />
        </AreaChart>
        <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight,
                    }}
            data={countData}
            formatLabel={(value, index) => xAxisLabels[index]}
            contentInset={{ left: 10, right: 10 }}
            svg={axesSvg}
        />
      </View>

    </View>
  )
}
export default CheckinGraph
