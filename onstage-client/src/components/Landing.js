import React, { Component } from 'react'

import Login from './Auth/Login'
import Signup from './Auth/Signup'

export default class Landing extends Component {
    render() {
        return (
            <div>
                <Login />
                <Signup />
            </div>
        )
    }
}
