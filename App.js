import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Total from './Components/Total'
// view components
import Exercise from './Components/Exercise'
import TimedExercise from './Components/TimedExercise'
import ExerciseDec from './Components/ExerciseDec'
// all possible times 
import ValidTimes from './Components/Data/ValidTimes'
// subclass for individual scores
import SoldierSimpleACFT from './Components/GetScore' // also has ACFTDATA from Data 


export default function App() {
  // intervals for sliders 
  // subsets of ValidTime, more complicated given how the model vs view handle time 
  // each second is an index, ValidTimes[60] is the index at the minute mark 
  const plankTimeInterval = ValidTimes.slice(0, 4 * 60) 
  const sprintDragCarryTimeInterval = ValidTimes(60, 5*60)
  const TwoMileRunTimeInterval = ValidTimes(8*60, 27*60)
  // deadlift weight valid interval 
  const deadliftWeightInterval = Array.from({ length: 35 }, (_, lbs) => lbs * 10)
  // hand release pushups reps valid interval 
  const handReleasePushupsInterval = Array.from({ length: 70 }, (_, pushup) => pushup)
  // standing power throw distance valid interval 
  const standingPowerThrowInterval = Array.from({ length: 180 }, (_, m) => m / 10)
  // state 
  const [deadliftRaw, setDeadliftRaw] = useState(200)
  const [ballThrowRaw, setBallThrowRaw] = useState(8)
  const [pushupsRaw, setPushupsRaw] = useState(30)
  const [sprintDragCarryRaw, setSprintDragCarryRaw] = useState(200) // 2:00 or 2 minutes
  const [plankRaw, setPlankRaw] = useState(130) // 1:30
  const [twoMileRaw, setTwoMileRaw] = useState(1600) // 16:00
  // temporary place holder for age, gender, and cardio title 
  const gender = 'male' // will be its own view with options of 'female' and 'male'
  const age = 30 // will be its own viw with a slidign scale of ages (17, 18, ..., 61, 62+)
  const cardioTitle = 'Two Mile Run' // will later have option by the user to chose from alternative cardio: row, swim, walk, and bike

   // universal state change function
  const changeRawScore = (change, stateToChange, changeState) => changeState(stateToChange + change)
  // object from subclass for individual users and no SQLite usage
  // once proven to be working we'll make this a conditional assignment for alternate cardio events 
  const simpleJack = new SoldierSimpleACFT(
    age, gender, deadliftRaw, ballThrowRaw, pushupsRaw, 
    sprintDragCarryRaw, plankRaw, twoMileRaw) 
  // when populating a database for an excel file rank, firstName, lastName will be needed 
  return (
    <View style={styles.myApp}>
      <View style={styles.myHeadingWrapper}>
        <Text style={styles.myHeading}>ACFT CALCULATOR</Text>
      </View>
      <ScrollView style={styles.container}>
        {/* Max Deadlift */}
        <Exercise
          increaseFunc={() => changeRawScore(10, deadliftRaw, setDeadliftRaw)}
          decreaseFunc={() => changeRawScore(-10, deadliftRaw, setDeadliftRaw)}
          exerciseName="Max Deadlift (3 reps)"
          units="lbs"
          raw={deadliftRaw}
          points={simpleJack.dl}
        />

        {/* Ball Throw */}
        <ExerciseDec //only exercise with decimals standing power through is hardcoded as the title 
          increaseFunc={() => changeRawScore(1, ballThrowRaw, setBallThrowRaw)}
          decreaseFunc={() => changeRawScore(-1, ballThrowRaw, setBallThrowRaw)}
          raw={ballThrowRaw}
          points={simpleJack.spt}
        />

        {/* Hand Release Pushups */}
        <Exercise 
          increaseFunc={() => changeRawScore(1, pushupsRaw, setPushupsRaw)}
          decreaseFunc={() => changeRawScore(-1, pushupsRaw, setPushupsRaw)}
          exerciseName="Hand Release Pushups"
          units="reps"
          raw={pushupsRaw}
          points={simpleJack.hrp}
        />

        {/* Sprint Drag Carry */}
        <TimedExercise 
          timedExerciseName={'Sprint Drag Carry'}
          rawTime = {sprintDragCarryRaw} // time is written as an integer 100 = 1:00 or 1 minute
          addOneMin={() => changeRawScore(100, sprintDragCarryRaw, setSprintDragCarryRaw)} 
          minusOneMin={() => changeRawScore(-100, sprintDragCarryRaw, setSprintDragCarryRaw)} 
          addOneSec={() => changeRawScore(1, sprintDragCarryRaw, setSprintDragCarryRaw)}  
          minusOneSec={() => changeRawScore(-1, sprintDragCarryRaw, setSprintDragCarryRaw)} 
          timedPoints={simpleJack.sdc}
        />

        {/* Plank */}
        <TimedExercise 
          timedExerciseName={'Plank'}
          rawTime = {plankRaw} // time is written as an integer 100 = 1:00 or 1 minute
          addOneMin={() => changeRawScore(100, plankRaw, setPlankRaw)} 
          minusOneMin={() => changeRawScore(-100, plankRaw, setPlankRaw)} 
          addOneSec={() => changeRawScore(1, plankRaw, setPlankRaw)} 
          minusOneSec={() => changeRawScore(-1, plankRaw, setPlankRaw)} 
          timedPoints={simpleJack.plk}
        />

        {/* Two Mile Run */}
        <TimedExercise 
          timedExerciseName={cardioTitle}
          rawTime = {twoMileRaw} // time is written as an integer 100 = 1:00 or 1 minute
          addOneMin={() => changeRawScore(100, twoMileRaw, setTwoMileRaw)} 
          minusOneMin={() => changeRawScore(-100, twoMileRaw, setTwoMileRaw)} 
          addOneSec={() => changeRawScore(1, twoMileRaw, setTwoMileRaw)} 
          minusOneSec={() => changeRawScore(-1, twoMileRaw, setTwoMileRaw)} 
          timedPoints={simpleJack.cardio}
        />

        {/* Total Score */}
        <Total
          total = {simpleJack.getTotalScore()}
        />
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({

  myApp: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 0,
    backgroundColor: '#E8E8D9',
    padding: 0,
    paddingTop: 0,
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
  
});
