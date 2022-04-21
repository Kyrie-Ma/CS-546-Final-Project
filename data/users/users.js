const mongoCollections = require('../../config/mongoCollections');
const users = mongoCollections.users
const bcryptjs = require('bcrypt');
const axios = require("axios");

async function createUser(username, password, firstName, lastName) {
    username = username.trim();
    if (!username || !password)
        throw `Please input the username and password`;
    if (typeof username !== 'string')
        throw `${username} is not a string`
    if (username.length < 4)
        throw `username shouldn't be empty spaces and it'length should be at least 4 characters`;
    if (username.length > 16)
        throw `The length of username shouldn't be more than 16`;
    if (username.indexOf(" ") != -1)
        throw `username shouln'd have spaces`
    var Regx = /^[A-Za-z0-9]*$/;
    if (!Regx.test(username))
        throw 'username should only be combained by alphanumeric characters'


    password = password.trim();
    if (typeof password !== 'string')
        throw `${password} is not a string`
    if (password.indexOf(" ") != -1)
        throw `password shouln'd have spaces`
    if (password.length < 8)
        throw `password shouldn't be empty spaces and should be at least 6 characters`
    if (password.length > 16)
        throw `password shouldn't be more than 16 characters`

    if (typeof firstName !== 'string' || typeof lastName !== 'string')
        throw `firstName and lastName should be string`;
    firstName = firstName.trim();
    lastName = lastName.trim();
    if (firstName.length == 0 || lastName.length == 0)
        throw `firstName and lastName should not be empty spaces`;

    let hasPwd = await bcryptjs.hash(password, 10);
    const userCollection = await users();

    let check = await userCollection.findOne({account: account});
    if(check != null)
        throw `${account} is existed, please change the username`

    let newuser = {
        account: account,
        password: hasPwd,
        isAdmin: false,
        firstName: firstName,
        lastName: lastName,
    }

    const insertInfo = await userCollection.insertOne(newuser);
    if (insertInfo.insertedCount == 0)
        throw `Could not add a new user`
    return {
        userInserted: true
    }
}


async function checkUser(account, password) {
    account = account.trim();
    if(!account || !password)
        throw `account and password should not be empty!`
    if(account.length == 0)
        throw `account shouldn't be empty spaces`;
    if (typeof username !== 'string')
        throw `${username} is not a string`
    if(account.length < 4 || account.length > 16)
        throw `account should be at least 4 characters and do not more than 16`;
    
    password = password.trim();
    if (typeof username !== 'string')
        throw `${username} is not a string`
    if(password.length == 0)
        throw `password shouldn't be empty spaces`;
    if(password.length < 8 || password.length > 16)
        throw `password should be at least 8 characters and do not more than 16`;
    
    // let hasPwd = bcryptjs.hashSync(password, 10);
    const userCollection = await getAllUser();

    let userInfo = await userCollection.findOne({account: account});
    if(userInfo == null)
        throw `account is not existed`;
    if (!await bcryptjs.compare(password, userInfo.password))
        throw `password is not correct`;

    return {
        authenticated: true
    }
}
async function getAllUser(){
    try {
        const { data } = await axios.get(
            `../../task/seed`
        );
        return data;
    } catch (error) {
        return error;
    }
}

module.exports = {
    createUser,
    checkUser
}