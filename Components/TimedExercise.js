import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Text, Pressable, View, StyleSheet } from 'react-native'

export default function TimedExercise({ 
  timedExerciseName, 
  rawTime, 
  addOneMin, 
  minusOneMin, 
  addOneSec, 
  minusOneSec, 
  timedPoints 
}) {
  // format raw time to "mm:ss"
  const formatTime = (time) => {
    const minutes = Math.floor(time / 100)
    const seconds = time % 100
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.exerciseTitle}>{timedExerciseName}</Text>
      <View style={styles.btnContainer}>
        {/* Minute Controls */}
        <View style={styles.minuteWrapper}>
          <Text style={styles.minutesText}>Minutes</Text>
          <View style={styles.minuteBtns}>
            <Pressable
              style={({ pressed }) => [
                { backgroundColor: pressed ? '#85E785' : '#FFCB05' },
                styles.btn
              ]}
              onPress={minusOneMin}
            >
              <AntDesign name="minuscircle" size={25} color="black" />
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                { backgroundColor: pressed ? '#EE7206' : '#FFCB05' },
                styles.btn
              ]}
              onPress={addOneMin}
            >
              <AntDesign name="pluscircle" size={25} color="black" />
            </Pressable>
          </View>
        </View>

        {/* Second Controls */}
        <View style={styles.secondsWrapper}>
          <Text style={styles.secondsText}>Seconds</Text>
          <View style={styles.secondsBtns}>
            <Pressable
              style={({ pressed }) => [
                { backgroundColor: pressed ? '#85E785' : '#FFCB05' },
                styles.btn
              ]}
              onPress={minusOneSec}
            >
              <AntDesign name="minuscircle" size={25} color="black" />
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                { backgroundColor: pressed ? '#EE7206' : '#FFCB05' },
                styles.btn
              ]}
              onPress={addOneSec}
            >
              <AntDesign name="pluscircle" size={25} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
      <Text>
        Raw Time: {formatTime(rawTime)}          Score: {timedPoints}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btn: {
    display: 'flex',
    color: 'white',
    width: 35,
    height: 35,
    margin: 2,
    borderWidth: 2,
    borderRadius: 25,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  minuteWrapper: {
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
  secondsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondsBtns: {
    display: 'flex',
    flexDirection: 'row',
  },
  secondsText: {
    opacity: 0.5,
  },
})