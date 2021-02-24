import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const ITEM_WIDTH = Dimensions.get('window').width

const CarouselCard = ({ item, index }) => {
    return (
      <View style={styles.container} key={index}>
        <View style={styles.headerWrap}>
          <Text style={styles.header}>{item.title}</Text>
        </View>
        <View style={styles.imageWrap}>

        </View>
        <View style={styles.priceWrap}>
          <Text style={styles.price}>
              ${item.price}
          </Text>
        </View>
        <View style={styles.bulletWrap}>
        {item.bullets.map((bullet) => {
          return (
            <View>
              <Text style={styles.bullet}>{bullet}</Text>
            </View>
          )
        })}
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    width: ITEM_WIDTH,
    elevation: 7,
    flex:1,
    backgroundColor: '#FFF'
    },
  headerWrap:{
    marginLeft:50,
    marginRight:50,
  },
  bulletWrap:{
    marginLeft:50,
    marginRight:50,
  },
  header: {
    color: "#111",
    fontSize: 28,
    fontWeight: "700",
    textAlign:'center',
    paddingTop:30,
    paddingBottom:30
  },
  bullet:{
    paddingTop:10,
    color: "#111",
    fontSize: 18,
    fontWeight: "700",
    
  },
  price:{
    paddingBottom:30,
    textAlign:'center',
    fontWeight:"900",
    fontSize:40,
    color:'#111'
  }
})

export default CarouselCard