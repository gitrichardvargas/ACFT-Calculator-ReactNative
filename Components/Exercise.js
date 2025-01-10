import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

import { Text, Pressable ,Button, View, StyleSheet } from 'react-native'

export default function Exercise ({units, addFunc, exercise, raw, points, decreaseFunc,}) {

    return(
        <View style={ExStyles.mainContainer}>
          <Text style={ExStyles.exerciseTitle}>{exercise}</Text>
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
            <Pressable
              style={({ pressed }) => [
                  {backgroundColor: pressed? '#85E785': '#FFCB05'},
                  ExStyles.btn
              ]}
              onPress={addFunc}
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
  },
  btnContainer: {
    // backgroundColor: 'pink',
    // flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  exerciseTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  


});