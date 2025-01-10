import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Total from './Components/Total'
//components
import Exercise from './Components/Exercise'
import TimedExercise from './Components/TimedExercise'
import ExerciseDec from './Components/ExerciseDec'
import GetDeadliftScores from './Components/GetDeadlift'
import GetBallThrowScores from './Components/GetBallThrow'
import GetPushupScores from './Components/GetPushUps'
import GetSprintDragCarryScores from './Components/GetSprintDragCarry'
import GetLegTuckScores from './Components/GetLegTucks'
import GetTwoMileScores from './Components/GetTwoMile'





export default function App() {
 const [deadliftRaw, setDeadliftRaw] = useState(200)
 const [ballThrowRaw, setBallThrowRaw] = useState(8)
 const [pushupsRaw, setPushupsRaw] = useState(30)
 const [sprintDragRawMin, setSprintDragRawMin] = useState(2)
 const [sprintDragRawSec, setSprintDragRawSec] = useState(10)
 const [legTuckRaw, setLegTuckRaw] = useState(5)
 const [twoMileRawMin, setTwoMileRawMin] = useState(18)
 const [twoMileRawSec, setTwoMileRawSec] = useState(0)



 // deadllift funcs
  const addTenToDL = () => setDeadliftRaw(deadliftRaw+10)
  const minusTenToDL  = () => setDeadliftRaw(deadliftRaw-10)
//ball throw funcs
  const addWholeMeterSPT = () => setBallThrowRaw(ballThrowRaw+1)
  const minusWholeMeterSPT = () => setBallThrowRaw(ballThrowRaw-1)
  const addPointOneMeterSPT = () => setBallThrowRaw(ballThrowRaw+.1)
  const minusPointOneMeterSPT = () => setBallThrowRaw(ballThrowRaw-.1)
  //push ups funcs
  const addOneToPU = () => setPushupsRaw(pushupsRaw+1)
  const minusOneToPU = () => setPushupsRaw(pushupsRaw-1)
  //sprint drag carry funcs
  const addOneMinSDC = () => setSprintDragRawMin(sprintDragRawMin+1)
  const addOneSecSDC = () => setSprintDragRawSec(sprintDragRawSec+1)
  const minusOneMinSDC = () => setSprintDragRawMin(sprintDragRawMin-1)
  const minusOneSecSDC = () => setSprintDragRawSec(sprintDragRawSec-1)
  const addMinClearSecSDC = () => {
    setSprintDragRawMin(sprintDragRawMin+1)
    setSprintDragRawSec(sprintDragRawSec-59)
  }
  const minusMinMaxSecSDC = () => {
    setSprintDragRawMin(sprintDragRawMin-1)
    setSprintDragRawSec(sprintDragRawSec+59)
  }
  //legtucks funcs
  const addOneToLT = () => setLegTuckRaw(legTuckRaw+1)
  const minusOneToLT = () => setLegTuckRaw(legTuckRaw-1)
  //two mile funcs 
  const addOneMinTM = () => setTwoMileRawMin(twoMileRawMin+1)
  const addOneSecTM = () => setTwoMileRawSec(twoMileRawSec+1)
  const minusOneMinTM = () => setTwoMileRawMin(twoMileRawMin-1)
  const minusOneSecTM = () => setTwoMileRawSec(twoMileRawSec-1)
  const addMinClearSecTM = () => {
    setTwoMileRawMin(twoMileRawMin+1)
    setTwoMileRawSec(twoMileRawSec-59)
  }
  const minusMinMaxSecTM = () => {
    setTwoMileRawMin(twoMileRawMin-1)
    setTwoMileRawSec(twoMileRawSec+59)
  }


  return (
    <View style ={styles.myApp}>
    <View style={styles.myHeadingWrapper}>
      <Text style={styles.myHeading}>ACFT CALCULATOR</Text>
    </View>
    <ScrollView style={styles.container}>
      
      
      <Exercise addFunc={addTenToDL} exercise="Max Deadlift (3 reps)" units="lbs" raw={deadliftRaw} 
      points={GetDeadliftScores(deadliftRaw)} decreaseFunc={minusTenToDL} />
      
      <ExerciseDec minusPointOneMeterSPT={minusPointOneMeterSPT} addPointOneMeterSPT={addPointOneMeterSPT}
       minusWholeMeterSPT={minusWholeMeterSPT} addWholeMeterSPT={addWholeMeterSPT} raw={ballThrowRaw} 
       points={GetBallThrowScores(ballThrowRaw)}/>
       
      <Exercise addFunc={addOneToPU} exercise="Hand Release Pushups" units="reps" raw={pushupsRaw} 
      points={GetPushupScores(pushupsRaw)} decreaseFunc={minusOneToPU}  />
      
      <TimedExercise timedExercise={'Sprint Drag Carry'} rawMin={sprintDragRawMin} rawSec={sprintDragRawSec}
       addOneMin={addOneMinSDC} minusOneMin={minusOneMinSDC} addOneSec={addOneSecSDC} 
       minusOneSec={minusOneSecSDC} minusMinMaxSec={minusMinMaxSecSDC} addMinClearSec={addMinClearSecSDC} 
       timedPoints={GetSprintDragCarryScores}/>
       
      <Exercise addFunc={addOneToLT} exercise="Leg Tucks" units="reps" raw={legTuckRaw} 
      points={GetLegTuckScores(legTuckRaw)} decreaseFunc={minusOneToLT}  />
      
      <TimedExercise timedExercise={'Two Mile Run'}rawMin={twoMileRawMin} rawSec={twoMileRawSec} 
      addOneMin={addOneMinTM} minusOneMin={minusOneMinTM} addOneSec={addOneSecTM} 
      minusOneSec={minusOneSecTM} minusMinMaxSec={minusMinMaxSecTM} addMinClearSec={addMinClearSecTM} 
      timedPoints={GetTwoMileScores}/>
      
      <Total  
      deadlift={GetDeadliftScores(deadliftRaw)} 
      ballThrow={GetBallThrowScores(ballThrowRaw)} 
      pushups={GetPushupScores(pushupsRaw)} 
      sprintDragCarry={GetSprintDragCarryScores(sprintDragRawMin)(sprintDragRawSec)} 
      //temp
      // sprintDragCarry={70}
      legtuck={GetLegTuckScores(legTuckRaw)} 
      twoMile={GetTwoMileScores(twoMileRawMin)(twoMileRawSec)}
      //temp
      // twoMile={70}
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
