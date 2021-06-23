
const generateUserList = (user) => {
    let isAdult
    let fullName
    const userList = []

    for (let u of user) {
        isAdult = (u.age >= 18 ? true : false)
        fullName = u.firstName + ' ' + u.lastName
        userList.push({ isAdult, fullName })
    }

    return userList
}

const getUserNames = (user) => {
    const userList = generateUserList(user)
    const userFullNameList = []
    for (let ul of userList) {
        userFullNameList.push(ul.fullName + ', ')
    }
    return userFullNameList
}

module.exports = Object.freeze({
    getUserNames
})