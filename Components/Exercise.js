import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import Slider from '@react-native-community/slider' 
import { Text, Pressable ,Button, View, StyleSheet } from 'react-native'

export default function Exercise ({units, increaseFunc, decreaseFunc, exerciseName, raw, points, maxVal }) {

    return(
        <View style={ExStyles.mainContainer}>
          <Text style={ExStyles.exerciseTitle}>{exerciseName}</Text>
          <View style={ExStyles.btnContainer}>
            <Pressable
              style={({ pressed }) => [
                  {backgroundColor: pressed? '#EE7206': '#FFCB05'},
                  ExStyles.btn
              ]}
              onPress={
                ()=> {
                  if(raw>0){
                    decreaseFunc()
                    }
                  }
              }
              >
              <AntDesign name="minuscircle" size={25} color="black" />
            </Pressable>
            <Slider
              style={{ flex: 1, marginHorizontal: 5, maxWidth: 200}}
              // minimumValue={0}
              maximumValue={maxVal}
              step={0}
              value={raw}
              onValueChange={(value) => {
                // synchronizes slider movement with raw
                if (value >= 0 && value <= maxVal) {
                  if (value > raw) {
                    increaseFunc()
                  } else if (value < raw) {
                    decreaseFunc()
                  }
                }
              }}
              minimumTrackTintColor="#FFCB05"
              maximumTrackTintColor="#000000"
              thumbTintColor="#B2B4B3"
            />
            <Pressable
              style={({ pressed }) => [
                  {backgroundColor: pressed? '#85E785': '#FFCB05'},
                  ExStyles.btn
              ]}
              onPress={increaseFunc}
              >
               <AntDesign name="pluscircle" size={25} color="black" />
            </Pressable>
          </View>
            <View>
                <Text>Raw: {raw} {units}          Score: {points}</Text>
            </View> 

            
        </View> 
    )
}

const ExStyles = StyleSheet.create({
  mainContainer: {
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    borderWidth: .5,
    borderColor: 'grey',
    paddingTop: 20, 
    paddingBottom: 20, 
  },
  btnContainer: {
    // backgroundColor: 'pink',
    // flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensure equal spacing between buttons and edges
    alignItems: 'center',
    paddingHorizontal: 20, // Space between the buttons and container edges
    marginVertical: 10, 
  },
  btn: {
    display: 'flex',
    color: 'white',
    width: 35, 
    height: 35,
    margin: 2,
    borderWidth: 2,
    borderRadius: 25,
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    margin: 5, // Space around each button
    backgroundColor: '#FFCB05',
  },
  exerciseTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  


}) 