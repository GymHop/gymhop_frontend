import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const ITEM_WIDTH = Dimensions.get('window').width

const CarouselCard = ({ item, index }) => {

    return (
      <View style={styles.container} key={index}>
        <Text style={styles.header}>{item.title}</Text>
        {item.bullets.map((bullet) => {
          return (
            <View>
              <Text style={styles.bullet}>{bullet}</Text>
            </View>
          )
        })}
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    elevation: 7,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  bullet:{
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default CarouselCard