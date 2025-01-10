


const GetScoresWithDecimal = myArray => myRaw => {
    let match = myArray.filter(x => x.raw === myRaw)
        if (myRaw >= myArray[0].raw){
            return 100
        }else if (myRaw <= myArray[myArray.length-1].raw){
            return 0 
        }else if (match.length === 1){
            return match[0].points
        }else if(match.length === 0) {
            // return "time to write a working function"
            // myRaw = myRaw-.1
            // return myBallThrowScore(myArray, myRaw)
            for (let i = 0; i < myArray.length; i++) {
                if (myRaw-myArray[i].raw > 0)
                    return myArray[i].points 
            }
        }
}

export default GetScoresWithDecimal

