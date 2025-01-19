import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Text, Pressable, View, StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider' 

export default function TimedExercise({ 
  timedExerciseName, 
  rawTime, 
  addOneMin, 
  minusOneMin, 
  addOneSec, 
  minusOneSec, 
  timedPoints, 
  minusSlide, 
  addSlide, 
  minVal, 
  maxVal
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
        {/* Subtracted Values */}
        <View style={styles.wholeTimeWrapper}>
          <View style={styles.verticalStack}>
            <View 
            // style={styles.buttonRow}
            >
              <Text style={styles.timeText}>-1 Min </Text>
              <Pressable
                style={({ pressed }) => [
                  { backgroundColor: pressed ? '#85E785' : '#FFCB05' },
                  styles.btn
                ]}
                onPress={minusOneMin}
              >
                <AntDesign name="minuscircle" size={25} color="black" />
              </Pressable>
            </View>
            <View 
            // style={styles.buttonRow}
            >
              <Text style={styles.timeText}>-1 Sec </Text>
              <Pressable
                style={({ pressed }) => [
                  { backgroundColor: pressed ? '#85E785' : '#FFCB05' },
                  styles.btn
                ]}
                onPress={minusOneSec}
              >
                <AntDesign name="minuscircle" size={25} color="black" />
              </Pressable>
            </View>
          </View>
        </View>
        <Slider
              style={{ flex: 1, marginHorizontal: 5, maxWidth: 200, justifyContent: 'center', alignItems: 'center', }}
              minimumValue={minVal}
              maximumValue={maxVal}
              step={0}
              value={rawTime}
              onValueChange={(value) => {
                if (value >= 0 && value <= maxVal) {
                  const difference = value - rawTime
                  if (difference >= 15) {
                    addSlide()
                  } else if (difference <= -15) {
                    minusSlide()
                  }
                }
              }}
              minimumTrackTintColor="#FFCB05"
              maximumTrackTintColor="#000000"
              thumbTintColor="#B2B4B3"
            />
        {/* Added Values */}
        <View style={styles.wholeTimeWrapper}>
          <View style={styles.verticalStack}>
            <View 
            // style={styles.buttonRow}
            >
              <Text style={styles.timeText}>+1 Min </Text>
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
            <View 
            // style={styles.buttonRow}
            >
              <Text style={styles.timeText}>+1 Sec </Text>
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
    textAlign: 'center',
    justifyContent: 'center',
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
  wholeTimeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalStack: {
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10, 
  },
  timeText: {
    opacity: 0.5,
    marginRight: 10, 
  },
})