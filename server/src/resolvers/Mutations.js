const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

const saltRounds = 10;

async function signup(parent, args, context, info) {

    if(!args.email.includes('@') || !args.email.includes('.')) {
        throw new Error('Valid email address required')
    }

    if(args.password.length <= 5) {
        throw new Error('Valid passwords must be over 6 characters')
    }

    const usernameExists = await context.prisma.user.findUnique({
        where: {
                username: args.username
        }
    })
    .then(user => {
        if(user) {
            throw new Error('This Username is taken')
        }
    })

    const emailExists = await context.prisma.user.findUnique({
        where: {
            email: args.email
        }
    })

    .then(user => {
        if(user) {
            throw new Error('This Email is taken')
        }
    })

    const password = await bcrypt.hash(args.password, saltRounds);
    
    const user = await context.prisma.user.create({
        data: { ...args, password }
    })
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    
    return {
        token,
        user
    }
}

async function login(parent, args, context, info) {

    const user = await context.prisma.user.findUnique(
        { 
            where: { 
                email: args.email 
            }
        })

    if (!user) {
        throw new Error('No user found with that email.')
    }

    const valid = await bcrypt.compare(args.password, user.password).then(isSame => {
        if(!isSame){
            throw new Error('Invalid password')
        } 
    })
    
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user
    }
}

module.exports = {
    signup,
    login
}