import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Text, Pressable ,Button, View, StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider' 

export default function ExerciseDec ( {minusPointOneMeterSPT, addPointOneMeterSPT, minusWholeMeterSPT, addWholeMeterSPT, raw, points, maxVal} ) {

    return (
        <View style={ExDecStyles.mainContainer}>
          
          <Text style={ExDecStyles.exerciseTitle}>Standing Power Throw</Text>
          <View style={ExDecStyles.btnContainer}>
            {/* subtracted values  */}
            <View style={ExDecStyles.wholeMeterWrapper}>
                <View style={ExDecStyles.verticalStack}>
                  <View 
                  // style={ExDecStyles.buttonRow}
                  >
                    <Text style={ExDecStyles.wholeMeterText}>-1.0 m </Text><Pressable 
                      style={({ pressed }) => [
                            {backgroundColor: pressed? '#EE7206': '#FFCB05'},
                            ExDecStyles.btn
                        ]}
                      onPress={minusWholeMeterSPT}
                    >
                    <AntDesign name="minuscircle" size={25} color="black" />
                    </Pressable>
                  </View>
                  <View 
                  // style={ExDecStyles.buttonRow}
                  >
                    <Text style={ExDecStyles.wholeMeterText}>-0.1 m </Text><Pressable 
                      style={({ pressed }) => [
                            {backgroundColor: pressed? '#EE7206': '#FFCB05'},
                            ExDecStyles.btn
                        ]}
                      onPress={minusPointOneMeterSPT}
                    >
                    <AntDesign name="minuscircle" size={25} color="black" />
                    </Pressable>
                  </View>
                    
                </View>
            </View>
            <Slider
              style={{ flex: 1, marginHorizontal: 5, maxWidth: 200, justifyContent: 'center', alignItems: 'center' }}
              minimumValue={0}
              maximumValue={maxVal}
              step={0.1} // Match the smallest increment (0.1 m)
              value={raw}
              onValueChange={(value) => {
                if (value >= 0 && value <= maxVal) {
                  const difference = value - raw;
                  if (difference >= 1.0) {
                    addWholeMeterSPT();
                  } else if (difference <= -1.0) {
                    minusWholeMeterSPT();
                  } else if (difference >= 0.1) {
                    addPointOneMeterSPT();
                  } else if (difference <= -0.1) {
                    minusPointOneMeterSPT();
                  }
                }
              }}
              minimumTrackTintColor="#FFCB05"
              maximumTrackTintColor="#000000"
              thumbTintColor="#B2B4B3"
            />

            <View style={ExDecStyles.wholeMeterWrapper}>
        
              <View style={ExDecStyles.verticalStack}>
                <View 
                // style={ExDecStyles.buttonRow}
                >
                  <Text style={ExDecStyles.wholeMeterText}>+1.0 m </Text><Pressable 
                    style={({ pressed }) => [
                          {backgroundColor: pressed? '#EE7206': '#FFCB05'},
                          ExDecStyles.btn
                      ]}
                    onPress={addWholeMeterSPT}
                  >
                  <AntDesign name="pluscircle" size={25} color="black" />
                  </Pressable>
                </View>
                <View 
                // style={ExDecStyles.buttonRow}
                >
                  <Text style={ExDecStyles.wholeMeterText}>+0.1 m </Text><Pressable 
                    style={({ pressed }) => [
                          {backgroundColor: pressed? '#EE7206': '#FFCB05'},
                          ExDecStyles.btn
                      ]}
                    onPress={addPointOneMeterSPT}
                  >
                  <AntDesign name="pluscircle" size={25} color="black" />
                  </Pressable>
                </View>
                  
              </View>
          </View>
          </View>
          <Text>Raw: {raw.toFixed(1)} m         Score: {points}</Text>
        </View>
    )
}


const ExDecStyles = StyleSheet.create({
  verticalStack: {
    flexDirection: 'column', // Stack items vertically
    alignItems: 'flex-start', // Align text and buttons to the left
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row', // Align items in the row horizontally
    alignItems: 'center', // Center items vertically within the row
    marginBottom: 10, // Add spacing between rows
  },
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    borderWidth: .5,
    borderColor: 'grey',
    paddingTop: 20, 
    paddingBottom: 20, 
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 20, 
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
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    margin: 5, 
    backgroundColor: '#FFCB05',
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

})

// export default ExerciseDec