const duration = () => {
    let getStartDate = document.getElementById("startDate").textContent
    let getEndDate = document.getElementById("endDate").textContent

    let startDate = new Date(getStartDate)
    let endDate = new Date(getEndDate)
    
    let duration = endDate - startDate

    let day = Math.floor(duration / 1000 / 60 / 60 / 24)
    let month = Math.floor(day / 30)
    let year = Math.floor(month / 12)

    // pengkondisian nilai duration
    if (year >= 1) {
        document.getElementById("duration").innerHTML = `${year} years`
    } else if (month >= 1) {
        document.getElementById("duration").innerHTML = `${month} months`
    } else {
        document.getElementById("duration").innerHTML = `${day} days`
    }

}

duration()