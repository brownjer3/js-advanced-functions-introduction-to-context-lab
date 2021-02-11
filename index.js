function createEmployeeRecord(array) {
    return {
        firstName: array[0], 
        familyName: array[1],
        title: array[2], 
        payPerHour: array[3],
        timeInEvents: [], 
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(obj, timestamp) {
    let event = {
        type: "TimeIn",
        hour: parseInt(timestamp.slice(11)),
        date: timestamp.slice(0, 10)
    }
    obj.timeInEvents.push(event)
    return obj
}

function createTimeOutEvent(obj, timestamp) {
    let event = {
        type: "TimeOut",
        hour: parseInt(timestamp.slice(11)),
        date: timestamp.slice(0, 10)
    }
    obj.timeOutEvents.push(event)
    return obj
}

function hoursWorkedOnDate(obj, day) {
    let found = obj.timeInEvents.find((event) => {
        return event.date === day
    })
    let i = obj.timeInEvents.indexOf(found)
    return (obj.timeOutEvents[i].hour - found.hour)/100
}

function wagesEarnedOnDate(obj, day) {
    return obj.payPerHour * hoursWorkedOnDate(obj, day);
}

function allWagesFor(obj) {
    let dates = obj.timeInEvents.map((event) => {
        return event.date
    })
    let total = 0;
    dates.forEach((val) => {
        total += wagesEarnedOnDate(obj, val)
    })
    return total;
}

function calculatePayroll(array) {
    let total = 0;
    array.forEach((val) => {
        total += allWagesFor(val)
    })
    return total
}

function findEmployeeByFirstName(srcArray, name) {
    return srcArray.find((person) => {
        return person.firstName === name
    })
}