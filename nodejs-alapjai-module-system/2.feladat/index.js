const { getUserNames } = require('./utils')

const user = [
    { firstName: 'John', lastName: 'Doe', age: 30 },
    { firstName: 'Jane', lastName: 'Doe', age: 25 },
    { firstName: 'Taek-Wan', lastName: 'Doe', age: 99 }
]

console.log(getUserNames(user))