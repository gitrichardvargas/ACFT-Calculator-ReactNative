import React, { useState, useEffect } from 'react'

import { Text, Pressable ,Button, View, StyleSheet } from 'react-native'



export default function Total ({total}){
  return(
    <Text style={styles.total}>Total Score: <Text style={styles.totalColor}>{total}</Text></Text>
  )}
  
 
const styles = StyleSheet.create({
  total: {
    textAlign: 'center',
    // color: '#14AB9A',
    fontSize: 35,
    fontWeight: 'bold',
    borderWidth: .5,
    borderColor: 'grey',
    paddingTop: 20, 
    paddingBottom: 20, 
  },

  totalColor: {
    color: '#14AB9A',
  }
  
})