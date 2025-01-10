import React, { useState, useEffect } from 'react'

import { Text, Pressable ,Button, View, StyleSheet } from 'react-native'



export default function Total ({deadlift, ballThrow,pushups, sprintDragCarry, legtuck, twoMile,}){
  return(
    <Text style={styles.total}>Total Score: {deadlift+ballThrow+pushups+sprintDragCarry+legtuck+twoMile}</Text>
  )}
  
 
const styles = StyleSheet.create({
  total: {
    textAlign: 'center',
    color: '#14AB9A',
    fontSize: 35,
    fontWeight: 'bold',

  },
  
});