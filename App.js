import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'

import ValidTimes from './Components/Data/ValidTimes' // all possible times 
// subclass for individual scores
import { SoldierSimpleACFT } from './Components/GetScores'

// view components
import Exercise from './Components/Exercise'
import TimedExercise from './Components/TimedExercise'
import ExerciseDec from './Components/ExerciseDec'
import Total from './Components/Total'
import ScaleIdentifier from './Components/ScaleIdentifier'

export default function App() {
  //gender, age and alt cardio 
  const [gender, setGender] = useState('male')
  const [age, setAge] = useState(30)
  const [cardio, setCardio] = useState('Two Mile Run')
  const handleGenderChange = (newGender) => {
    setGender(newGender)
    console.log('Gender changed to:', newGender)
  }
  // alt cardio 
  
  const handleAgeChange = (newAge) => {
    setAge(newAge)
    console.log('Age changed to:', newAge)
  }
  const handleCardioChange = (newCardio) => {
    setCardio(newCardio)
    console.log('Cardio changed to:', newCardio)
  }
  // intervals for sliders 
  // subsets of ValidTime, more complicated given how the model vs view handle time 
  // each second is an index, ValidTimes[60] is the index at the minute mark 
  const plankTimeInterval = ValidTimes.slice(0, 4 * 60) 
  const sprintDragCarryTimeInterval = ValidTimes.slice(60, 5*60)
  const twoMileRunTimeInterval = ValidTimes.slice(12*60, 27*60)
  const altCardioTimeInterval = ValidTimes.slice(12*60, 45*60)

  // deadlift weight valid interval 
  const deadliftWeightInterval = Array.from({ length: 35 }, (_, lbs) => lbs * 10)
  // hand release pushups reps valid interval 
  const handReleasePushupsInterval = Array.from({ length: 70 }, (_, pushup) => pushup)
  // standing power throw distance valid interval 
  const standingPowerThrowInterval = Array.from({ length: 180 }, (_, m) => m / 10)

  // function to get the midpoint index of an array
  const getMidPoint = (interval) => Math.floor(interval.length / 2)

  // state for all events
  const [deadliftIndex, setDeadliftIndex] = useState(getMidPoint(deadliftWeightInterval))
  const deadliftRaw = deadliftWeightInterval[deadliftIndex]

  const [ballThrowIndex, setBallThrowIndex] = useState(getMidPoint(standingPowerThrowInterval))
  const ballThrowRaw = standingPowerThrowInterval[ballThrowIndex]

  const [pushupsIndex, setPushupsIndex] = useState(getMidPoint(handReleasePushupsInterval))
  const pushupsRaw = handReleasePushupsInterval[pushupsIndex]

  const [sprintDragCarryIndex, setSprintDragCarryIndex] = useState(getMidPoint(sprintDragCarryTimeInterval))
  const sprintDragCarryRaw = sprintDragCarryTimeInterval[sprintDragCarryIndex].raw

  const [plankIndex, setPlankIndex] = useState(getMidPoint(plankTimeInterval))
  const plankRaw = plankTimeInterval[plankIndex].raw

  const [twoMileIndex, setTwoMileIndex] = useState(getMidPoint(twoMileRunTimeInterval))
  const twoMileRaw = twoMileRunTimeInterval[twoMileIndex].raw 
  // alternative cardio 
  const [altCardioIndex, setAltCardioIndex] = useState(getMidPoint(altCardioTimeInterval))
  const altCardioRaw = altCardioTimeInterval[altCardioIndex].raw 

   // universal exercise state change function 
  const changeRawScore = (change, currentIndex, setIndex, interval) => {
    const newIndex = currentIndex + change
    // ensure the index stays within bounds
    if (newIndex >= 0 && newIndex < interval.length) {
      setIndex(newIndex)
    }
  }
  // object from subclass for individual users and no SQLite usage
  // once proven to be working we'll make this a conditional assignment for alternate cardio events 
  // const simpleJack = new SoldierSimpleACFT(
  //   age, gender, deadliftRaw, ballThrowRaw, pushupsRaw, 
  //   sprintDragCarryRaw, plankRaw, twoMileRaw, null) 
  const simpleJack = new SoldierSimpleACFT(
      age, gender, deadliftRaw, ballThrowRaw, pushupsRaw,
      sprintDragCarryRaw,plankRaw,
      cardio === "Two Mile Run" ? twoMileRaw : altCardioRaw,
      cardio === "Two Mile Run" ? null : cardio.toLowerCase()
  )
  // when populating a database for an excel file rank, firstName, lastName will be needed 
  return (
    <View style={styles.myApp}>
      <View style={styles.myHeadingWrapper}>
        <Text style={styles.myHeading}>ACFT CALCULATOR</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.container}>
        <ScaleIdentifier onGenderChange={handleGenderChange} onAgeChange={handleAgeChange} onCardioChange={handleCardioChange} />
        {/* Max Deadlift */}
        <Exercise
          increaseFunc={() => changeRawScore(1, deadliftIndex, setDeadliftIndex, deadliftWeightInterval)}
          decreaseFunc={() => changeRawScore(-1, deadliftIndex, setDeadliftIndex, deadliftWeightInterval)}
          exerciseName="Max Three Rep Deadlift"
          units="lbs"
          raw={deadliftRaw}
          points={simpleJack.getIndividualScores()['deadlift']}
          maxVal={340}
        />

        {/* Ball Throw , , , addWholeMeterSPT, raw, points*/}
        <ExerciseDec //only exercise with decimals standing power through is hardcoded as the title 
          minusPointOneMeterSPT ={() => changeRawScore(-1, ballThrowIndex, setBallThrowIndex, standingPowerThrowInterval)}
          addPointOneMeterSPT = {() => changeRawScore(1, ballThrowIndex, setBallThrowIndex, standingPowerThrowInterval)}
          minusWholeMeterSPT={() => changeRawScore(-10, ballThrowIndex, setBallThrowIndex, standingPowerThrowInterval)}
          addWholeMeterSPT={() => changeRawScore(10, ballThrowIndex, setBallThrowIndex, standingPowerThrowInterval)}
          raw={ballThrowRaw}
          points={simpleJack.getIndividualScores()['standing power throw']}
          maxVal={18.0}
        />

        {/* Hand Release Pushups */}
        <Exercise 
          increaseFunc={() => changeRawScore(1, pushupsIndex, setPushupsIndex, handReleasePushupsInterval)}
          decreaseFunc={() => changeRawScore(-1, pushupsIndex, setPushupsIndex, handReleasePushupsInterval)}
          exerciseName="Hand Release Pushups"
          units="reps"
          raw={pushupsRaw}
          points={simpleJack.getIndividualScores()['hand release pushups']}
          maxVal={65}
        />
        
        {/* Sprint Drag Carry */}
        <TimedExercise 
          timedExerciseName={'Sprint Drag Carry'}
          rawTime={sprintDragCarryRaw} // time is written as an integer 100 = 1:00 or 1 minute
          addOneMin={() => changeRawScore(
            60, sprintDragCarryIndex, setSprintDragCarryIndex, sprintDragCarryTimeInterval
          )} 
          minusOneMin={() => changeRawScore(
            -60, sprintDragCarryIndex, setSprintDragCarryIndex, sprintDragCarryTimeInterval
          )} 
          addOneSec={() => changeRawScore(
            1, sprintDragCarryIndex, setSprintDragCarryIndex, sprintDragCarryTimeInterval
          )}  
          minusOneSec={() => changeRawScore(
            -1, sprintDragCarryIndex, setSprintDragCarryIndex, sprintDragCarryTimeInterval
          )} 
          addSlide={() => changeRawScore(
            5, sprintDragCarryIndex, setSprintDragCarryIndex, sprintDragCarryTimeInterval
          )}
          minusSlide={() => changeRawScore(
            -5, sprintDragCarryIndex, setSprintDragCarryIndex, sprintDragCarryTimeInterval
          )}
          minVal={sprintDragCarryTimeInterval[0].raw} // Starting from the first valid raw value
          maxVal={sprintDragCarryTimeInterval[sprintDragCarryTimeInterval.length - 1].raw} // Ending at the last valid raw value
          timedPoints={simpleJack.getIndividualScores()['sprint drag carry']}
        />

        {/* Plank */}
        <TimedExercise 
          timedExerciseName={'Plank'}
          rawTime={plankRaw} // time is written as an integer 100 = 1:00 or 1 minute
          addOneMin={() => changeRawScore(
            60, plankIndex, setPlankIndex, plankTimeInterval
          )} 
          minusOneMin={() => changeRawScore(
            -60, plankIndex, setPlankIndex, plankTimeInterval
          )} 
          addOneSec={() => changeRawScore(
            1, plankIndex, setPlankIndex, plankTimeInterval
          )}  
          minusOneSec={() => changeRawScore(
            -1, plankIndex, setPlankIndex, plankTimeInterval
          )} 
          addSlide={() => changeRawScore(
            5, plankIndex, setPlankIndex, plankTimeInterval
          )}
          minusSlide={() => changeRawScore(
            -5, plankIndex, setPlankIndex, plankTimeInterval
          )}
          minVal={plankTimeInterval[0].raw} // Starting from the first valid raw value
          maxVal={plankTimeInterval[plankTimeInterval.length - 1].raw} // Ending at the last valid raw value
          timedPoints={simpleJack.getIndividualScores()['plank']}
        />
       
        {/* Cardio Event */}
        <TimedExercise
          timedExerciseName={cardio === 'Two Mile Run' ? 'Two Mile Run' : cardio} // Dynamically set name
          rawTime={cardio === 'Two Mile Run' ? twoMileRaw : altCardioRaw} // Choose between twoMileRaw and altCardioRaw
          addOneMin={() => changeRawScore(
            60, 
            cardio === 'Two Mile Run' ? twoMileIndex : altCardioIndex, 
            cardio === 'Two Mile Run' ? setTwoMileIndex : setAltCardioIndex, 
            cardio === 'Two Mile Run' ? twoMileRunTimeInterval : altCardioTimeInterval
          )}
          minusOneMin={() => changeRawScore(
            -60, 
            cardio === 'Two Mile Run' ? twoMileIndex : altCardioIndex, 
            cardio === 'Two Mile Run' ? setTwoMileIndex : setAltCardioIndex, 
            cardio === 'Two Mile Run' ? twoMileRunTimeInterval : altCardioTimeInterval
          )}
          addOneSec={() => changeRawScore(
            1, 
            cardio === 'Two Mile Run' ? twoMileIndex : altCardioIndex, 
            cardio === 'Two Mile Run' ? setTwoMileIndex : setAltCardioIndex, 
            cardio === 'Two Mile Run' ? twoMileRunTimeInterval : altCardioTimeInterval
          )}
          minusOneSec={() => changeRawScore(
            -1, 
            cardio === 'Two Mile Run' ? twoMileIndex : altCardioIndex, 
            cardio === 'Two Mile Run' ? setTwoMileIndex : setAltCardioIndex, 
            cardio === 'Two Mile Run' ? twoMileRunTimeInterval : altCardioTimeInterval
          )}
          timedPoints={simpleJack.getIndividualScores()[cardio.toLowerCase()]} // dynamically set timedPoints
          minusSlide={() => changeRawScore(
            -15, 
            cardio === 'Two Mile Run' ? twoMileIndex : altCardioIndex, 
            cardio === 'Two Mile Run' ? setTwoMileIndex : setAltCardioIndex, 
            cardio === 'Two Mile Run' ? twoMileRunTimeInterval : altCardioTimeInterval
          )}
          addSlide={() => changeRawScore(
            15, 
            cardio === 'Two Mile Run' ? twoMileIndex : altCardioIndex, 
            cardio === 'Two Mile Run' ? setTwoMileIndex : setAltCardioIndex, 
            cardio === 'Two Mile Run' ? twoMileRunTimeInterval : altCardioTimeInterval
          )}
          minVal={cardio === 'Two Mile Run' ? twoMileRunTimeInterval[0].raw : altCardioTimeInterval[0].raw}
          maxVal={cardio === 'Two Mile Run' ? twoMileRunTimeInterval[twoMileRunTimeInterval.length - 1].raw : altCardioTimeInterval[altCardioTimeInterval.length - 1].raw}
        />

        {/* Total Score */}
        <Total 
          total = {simpleJack.getTotalScore()}
        />
        <View style={{ height: 160 }}></View>
      </ScrollView> 
    </View>
  )
}


const styles = StyleSheet.create({

  myApp: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#E8E8D9',
  },

  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop: 0,
    backgroundColor: '#E8E8D9',
    padding: 10,
    paddingBottom: 20,
    margin: 0,
    marginTop: 0, 
  },
  myHeadingWrapper: {
      // borderRadius: 25,
      backgroundColor: 'black',
      textAlign: 'center',
      margin: 0,
      paddingTop: 40,
      paddingBottom: 0,

      // padding: 10,
  },
  myHeading: {
    padding: 10,
    // paddingTop: 50,
    color: '#FFCB05',
    fontSize: 30,
    textAlign: 'center',
  },
  
}) 