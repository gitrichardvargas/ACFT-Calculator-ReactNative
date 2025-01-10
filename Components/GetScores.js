const GetScores = array => raw => {
    let match = array.filter(x => x.raw === parseInt(raw))
    if (raw > array[0].raw){
        return 100
    } else if (raw <= array[array.length-1].raw){

        return 0
    } else if(match.length === 0){
        return GetScores(array)(raw-1)
    }else{
        return match[0].points
    }
}

export default GetScores