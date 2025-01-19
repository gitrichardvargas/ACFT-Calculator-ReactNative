import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const ScaleIdentifier = ({ onGenderChange, onAgeChange, onCardioChange }) => {
  const [gender, setGender] = useState('male')
  const [age, setAge] = useState(17)
  const [cardio, setCardio] = useState('Two Mile Run')  // default value 

  return (
    <View style={styles.container}>
        <View style={styles.selectionWrapper}>
            <View style={styles.pickerWrapper}>
                <Text style={styles.label}>Gender</Text>
                <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => {
                    setGender(itemValue)
                    onGenderChange(itemValue)  // passing gender to App.js
                }}
                style={styles.picker}
                mode="dropdown"
                >
                <Picker.Item label="Male" value="male" style={styles.selectedText}/>
                <Picker.Item label="Female" value="female" />
                </Picker>
            </View>

            <View style={styles.pickerWrapper}>
                <Text style={styles.label}>Age</Text>
                <Picker
                selectedValue={String(age)} // make sure this is a string
                onValueChange={(itemValue) => {
                    setAge(Number(itemValue)) // converting back to number after selection
                    onAgeChange(Number(itemValue))  // passing age to App.js
                }}
                style={styles.picker}
                mode="dropdown"
                >
                {Array.from({ length: 49 }, (_, i) => i + 17).map((ageValue) => (
                    <Picker.Item key={ageValue} label={String(ageValue)} value={String(ageValue)} />
                ))}
                </Picker>
            </View>

            <View style={styles.pickerWrapper}>
                <Text style={styles.label}>Cardio</Text>
                <Picker
                selectedValue={cardio}
                onValueChange={(itemValue) => {
                    setCardio(itemValue)
                    onCardioChange(itemValue)  
                }}
                style={styles.picker}
                mode="dropdown"
                >
                <Picker.Item label="Run" value="Two Mile Run" style={styles.selectedText}/>
                <Picker.Item label="Bike" value="Bike" />
                <Picker.Item label="Row" value="Row" />
                <Picker.Item label="Swim" value="Swim" />
                <Picker.Item label="Walk" value="Walk" />
                </Picker>
            </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

    borderWidth: .5,
    borderColor: 'grey',
    marginTop: 0, 
    padding: 0, 
    justifyContent: 'center',
  },
  selectionWrapper: {
    transform: [{ scale: 0.6 }],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 0,
    marginLeft: -30,
    marginRight: -30, 
    marginBottom: 20, 
    // backgroundColorolor: 'purple',

  },
  pickerWrapper: {
    flex: 1,
    paddingBottom: 50,
    paddingRight: 70, 
    // paddingLeft: 55, 
    justifyContent: 'flex-start',
    // maxWidth: 300,
    backgroundColor: "#B2B4B3", 
    marginHorizontal: 5, 
    width: 145, 
    borderRadius: 10, 
  },
label: {
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10, 
    // marginRight: 70, 
    // marginBottom: 30, 
    marginTop: 0,
    marginLeft: 0,     
    fontSize: 30,
    borderColor: 'grey',
    paddingTop: 0,   
    // paddingBottom: 5,
    backgroundColor: '#FFCB05',
    marginHorizontal: 5, 
    borderRadius: 10,    
    padding: 1, 
    borderWidth: 2,
    borderColor: 'grey',
    width: 135, 
    color: 'black',
    zIndex: 10,
  },
  
  wideLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,  
    marginTop: 5,     
    fontSize: 30,
    width: 170,
    borderColor: 'grey',
    paddingTop: 5,   
    paddingBottom: 5,
    backgroundColor: '#FFCB05',
    marginHorizontal: 5, 
    borderRadius: 10,    
    padding: 5, 
    borderWidth: .5,
    borderColor: 'grey',
  },
  picker: {
    height: 40,
    justifyContent: 'center',
    width: 135,  
    // backgroundColor: 'purple', 
    // opacity: 1,
    color: 'purple'
    
  },

  selectedText: {
    color: 'purple', 
  }
  
})



export default ScaleIdentifier