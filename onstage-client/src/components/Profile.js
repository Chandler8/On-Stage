import { useQuery, gql } from '@apollo/client';
import { parse } from 'graphql';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const GET_USER = gql`
    query FindUserById ($id: ID!){
        findUser(id: $id) {
            first_name
            last_name
            email
            profile_pic
            username
        }
    }
  `
export default function Profile(props) {

console.log(props)
const userIdInt = parseInt(props.userId)
const { loading, error, data } = useQuery(GET_USER, {
    variables: {
        id: userIdInt
    }
});

const logout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    props.onUserChange(null)
    props.history.push('/');
}


console.log(data)

if (loading) return('Loading...')
if (error) return ('Error!', error.message)
    return (
        <>
            <h2>Nice to see you again, {data?.findUser?.username}</h2>
            <div class="container-styles" id="container">
                <div className='user-info'>
                    <img src={data?.findUser?.profile_pic} className='user-avi' alt='user_avi' />
                    <p>Name: {data?.findUser.first_name} {data?.findUser.last_name}</p>
                    <p>Username: {data?.findUser?.username}</p>
                    <p>Email: {data?.findUser?.email}</p>
                    <button onClick={event => logout(event)}>Logout</button>
                </div>
                
            </div>
        </>
        
    )
}
