const increaseDate = (date, dayNumber = 3) => {
    // console.log(date);
    let baseDate = new Date(date)
    // console.log(Date.now())
    // console.log(baseDate.getTime() + (dayNumber * 3600 * 24 * 1000))

    return new Date(baseDate.getTime() + (dayNumber * 3600 * 24 * 1000))

}

const increaseAndFormatDate = (dates) => {
    // console.log(increaseDate(new Date(dates[0]).getTime(), 5))
    const arrayOfDates = dates.map(date => new Date(increaseDate(new Date(date), 5)).toLocaleDateString('hu'))

    return arrayOfDates
}

console.log(increaseDate(new Date("1989-01-25").getTime(), 5))

module.exports = Object.freeze(
    increaseAndFormatDate
)