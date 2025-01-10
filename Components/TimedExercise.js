import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Text, Pressable ,Button, View, StyleSheet, } from 'react-native'

export default function TimedExercise ({ timedExercise, rawMin, rawSec, addOneMin, minusOneMin, addOneSec, minusOneSec, addMinClearSec, minusMinMaxSec, timedPoints }) {

    return (
        <View style={ExTimedStyles.mainContainer}>
          <Text style={ExTimedStyles.exerciseTitle}>{timedExercise}</Text>
          <View style={ExTimedStyles.btnContainer}>
            <View style={ExTimedStyles.minuteWrapper}>
              <Text style={ExTimedStyles.minutesText}>Mintues</Text>
              <View style={ExTimedStyles.minuteBtns}>
                <Pressable 
                    style={({ pressed }) => [
                        {backgroundColor: pressed? '#85E785': '#FFCB05'},
                        ExTimedStyles.btn
                    ]}
                    onPress={ 
                    () => {if (rawMin > 0 ){minusOneMin()}}
                    }
                >
                <AntDesign name="minuscircle" size={25} color="black" />
                </Pressable>
                <Pressable 
                    style={({ pressed }) => [
                          {backgroundColor: pressed? '#EE7206': '#FFCB05'},
                          ExTimedStyles.btn
                      ]}
                    onPress={addOneMin}
                >
                <AntDesign name="pluscircle" size={25} color="black" />
                </Pressable>
              </View>
            </View> 
            <View style={ExTimedStyles.secondsWrapper}>
              <Text style={ExTimedStyles.secondsText}>Seconds</Text>
              <View style={ExTimedStyles.secondsBtn}>
                <Pressable 
                  style={({ pressed }) => [
                        {backgroundColor: pressed? '#85E785': '#FFCB05'},
                        ExTimedStyles.btn
                    ]}
                  onPress={()=> {if(rawSec >= 1){minusOneSec()} else if (rawSec === 0){minusMinMaxSec()}}} 
                >
                <AntDesign name="minuscircle" size={25} color="black" />
                </Pressable>
                <Pressable 
                  style={({ pressed }) => [
                        {backgroundColor: pressed? '#EE7206': '#FFCB05'},
                        ExTimedStyles.btn
                    ]}
                  onPress={()=> {if(rawSec <= 58){addOneSec()} else if (rawSec === 59) {addMinClearSec()}}}
                >
                <AntDesign name="pluscircle" size={25} color="black" />
                </Pressable>
              </View>
            </View>
          </View>
          <Text>Raw: {rawMin}:{rawSec < 10? '0'+rawSec: rawSec}          Score: {timedPoints(rawMin)(rawSec)}</Text>
        </View>
    )
}

const ExTimedStyles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  btnContainer: {
    // backgroundColor: 'pink',
    // flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    // alignItems: 'center',
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
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
  },
  exerciseTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  minuteWrapper:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minutesText: {
    opacity: 0.5,
  },
  minuteBtns: {
    display: 'flex',
    flexDirection: 'row',
  },
  secondsWrapper:{
  display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondsBtn: {
    display: 'flex',
    flexDirection: 'row',
  },
  secondsText: {
    opacity: 0.5,
  },

});





