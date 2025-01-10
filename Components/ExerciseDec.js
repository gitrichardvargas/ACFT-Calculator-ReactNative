import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Text, Pressable ,Button, View, StyleSheet } from 'react-native'

export default function ExerciseDec ( {minusPointOneMeterSPT, addPointOneMeterSPT, minusWholeMeterSPT, addWholeMeterSPT, raw, points} ) {

    return (
        <View style={ExDecStyles.mainContainer}>
          
          <Text style={ExDecStyles.exerciseTitle}>Standing Power Throw</Text>
          <View style={ExDecStyles.btnContainer}>
            <View style={ExDecStyles.wholeMeterWrapper}>
              <Text style={ExDecStyles.wholeMeterText}>1 m </Text>
                <View style={ExDecStyles.wholeMeterBtns}>
                  <Pressable 
                    style={({ pressed }) => [
                          {backgroundColor: pressed? '#EE7206': '#FFCB05'},
                          ExDecStyles.btn
                      ]}
                    onPress={minusWholeMeterSPT}
                  >
                  <AntDesign name="minuscircle" size={25} color="black" />
                  </Pressable>
                  <Pressable 
                    style={({ pressed }) => [
                          {backgroundColor: pressed? '#85E785': '#FFCB05'},
                          ExDecStyles.btn
                      ]}
                    onPress={addWholeMeterSPT}
                  >
                  <AntDesign name="pluscircle" size={25} color="black" />
                  </Pressable> 
                </View>
            </View>
            <View style={ExDecStyles.pointOneMeterWrapper}>
              <Text style={ExDecStyles.pointOneMeterText}>0.1 m</Text>
              <View style={ExDecStyles.pointOneMeterBtns}>
                <Pressable 
                  style={({ pressed }) => [
                        {backgroundColor: pressed? '#EE7206': '#FFCB05'},
                        ExDecStyles.btn
                    ]}
                  onPress={minusPointOneMeterSPT}
                >
                <AntDesign name="minuscircle" size={25} color="black" />
                </Pressable>
                <Pressable 
                  style={({ pressed }) => [
                        {backgroundColor: pressed? '#85E785': '#FFCB05'},
                        ExDecStyles.btn
                    ]}
                  onPress={addPointOneMeterSPT}
                >
                <AntDesign name="pluscircle" size={25} color="black" />
                </Pressable> 
              </View>
            </View>
          </View>
          <Text>Raw: {raw.toFixed(1)} m         Score: {points}</Text>
        </View>
    )
}


const ExDecStyles = StyleSheet.create({
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
  exerciseTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  wholeMeterWrapper:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wholeMeterBtns: {
    display: 'flex',
    flexDirection: 'row',
  },
  wholeMeterText:{
    opacity: 0.5,
  },
  pointOneMeterWrapper:{
  display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointOneMeterBtns: {
    display: 'flex',
    flexDirection: 'row',
  },
  pointOneMeterText:{
    opacity: 0.5,
  },

});

// export default ExerciseDec