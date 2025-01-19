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
                <Picker.Item label="Male" value="male" />
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
                <Picker.Item label="Run" value="Two Mile Run" />
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
    margin: 0,
    marginBottom: 20, 
  },
  pickerWrapper: {
    flex: 1,
    padding: 0,
    justifyContent: 'flex-start',
    maxWidth: 170,
  },
label: {
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5, 
    marginBottom: 30, 
    marginTop: 5,    
    fontSize: 30,
    borderColor: 'grey',
    paddingTop: 5,   
    paddingBottom: 5,
    backgroundColor: '#FFCB05',
    marginHorizontal: 5, 
    borderRadius: 10,    
    padding: 0, 
    borderWidth: .5,
    borderColor: 'grey',
    width: 125, 
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
    width: 125, 
  },
})

export default ScaleIdentifier