const GetTimedScores = array => rawMin => rawSec => {
    let matchMin = array.filter(x => x.rawMin === parseInt(rawMin))
    let matchMinSec = matchMin.filter(x => x.rawSec === parseInt(rawSec))
    if(matchMinSec.length === 0){
        if((rawMin < array[0].rawMin) || (rawMin === array[0].rawMin && rawSec <= array[0].rawSec)){
            return 100
        }else if(rawMin === array[array.length-1].rawMin && rawSec >= array[array.length-1].rawSec){
            return 0 
        }else if(rawMin > array[array.length-1].rawMin){
            return 0
        }else if (matchMin[matchMin.length-1].rawSec-rawSec < 0){
          return (array.filter(x=>x.rawMin === parseInt(rawMin+1))[0].points)
        }else{
            for (let i = 0; i < matchMin.length; i++) {
                if (matchMin[i].rawSec-rawSec > 0){
                    rawSec = matchMin[i].rawSec
                    return(matchMin.filter(x => x.rawSec === rawSec)[0].points)
                }
            }
        }
    }else{
        return matchMinSec[0].points 
    }
}

export default GetTimedScores

// let twoMilePoints = GetTimedScores(twoMileScores)
// let sprintDragCarryPoints = GetTimedScores(sprintDragCarryScores)