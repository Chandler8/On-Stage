import { useMutation, gql } from '@apollo/client';
import Error from '../Error';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { AUTH_TOKEN } from '../../constants';
import axios from 'axios';

const LOGIN_MUTATION = gql`
    mutation LoginMutation(
        $email: String!
        $password: String!
    ) {
        login(
            email: $email
            password: $password
        ) {
            token
            user {
                id
            }
        }
    }
`

const SIGNUP_MUTATION = gql`
    mutation SignupMutation(
        $first_name: String!
        $last_name: String!
        $email: String!
        $profile_pic: String!
        $username: String!
        $password: String!
    ) {
        signup (
            first_name: $first_name
            last_name: $last_name
            email: $email
            profile_pic: $profile_pic
            username: $username
            password: $password
        ) {
            token
            user {
                id
            }
        }
    }
`

export default function Login(props) {

    const history = useHistory();
    const [formState, setFormState] = useState({
        login: true,
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        isLoggedIn: false
    });

    const [login, { error: loginError }] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: formState.email,
            username: formState.username,
            password: formState.password
        },
        onCompleted: ({ login }) => {
            localStorage.setItem(AUTH_TOKEN, login.token);
            props.onUserChange(login.user.id)
            history.push(`/profile`);
        }
    })

    const [signup, { error: signupError }] = useMutation(SIGNUP_MUTATION, {
        variables: {
            first_name: formState.first_name,
            last_name: formState.last_name,
            email: formState.email,
            profile_pic: formState.profile_pic,
            username: formState.username,
            password: formState.password
        },
        onCompleted: ({ signup }) => {
            if(formState.confirmPassword === formState.password) {
              localStorage.setItem(AUTH_TOKEN, signup.token);
              props.onUserChange(signup.user.id)
              history.push(`/profile`);
            }
        }
    })


  const fileUpload = (event) => {
        event.preventDefault();
    
        const files = event.target.files;
        const formData = new FormData();
        formData.append('file', files[0])
        formData.append('upload_preset', 'stagewood_assessment')
    
        axios
            .post('https://api.cloudinary.com/v1_1/dzrts5flo/image/upload', formData)
            .then(response => {
                console.log(response.data.secure_url)
                setFormState({ ...formState, profile_pic: response.data.secure_url })
                console.log(formState.profile_pic)
            })
            .catch(err => console.log(err))
    }

    return (
      <div className='site-container'>
      <div className="container" id="container">
      
      <div class="form-container sign-in-container">
      <form onSubmit={
         (event) => {
                    if(formState.login) {
                        event.preventDefault();
                        login().catch(err => console.log(err))
                    } else {
                        event.preventDefault();
                        signup().catch(err => console.log(err))
                    }
                }
                }
      >
        <h1>{formState.login ? 'Sign in' : 'Sign up'}</h1>
        <span
          onClick={(e) =>
                setFormState({
                    ...formState,
                    login: !formState.login
                })
                }>
          {formState.login ? 'or create a new account' : 'or sign in to your account'}</span>
        {!formState.login && (
            <>
            <input
            value={formState.first_name}
            onChange={(e) =>
              setFormState({
                ...formState,
                first_name: e.target.value
              })
            }
            type="text"
            placeholder="Your first name"
          />
           <input
            value={formState.last_name}
            onChange={(e) =>
              setFormState({
                ...formState,
                last_name: e.target.value
              })
            }
            type="text"
            placeholder="Your last name"
          />
          <input
            value={formState.username}
            onChange={(e) =>
              setFormState({
                ...formState,
                username: e.target.value
              })
            }
            type="text"
            placeholder="Your username"
          />
          <input
            onChange={(e) => fileUpload(e)}
            type="file"
            placeholder="Your profile picture URL"
          />
          </>
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
         {!formState.login &&
            <input
          value={formState.confirmPassword}
          onChange={(e) =>
            setFormState({
              ...formState,
              confirmPassword: e.target.value
            })
          }
          type="password"
          placeholder="Confirm password"
        />}
        {!formState.login && formState.password !== formState.confirmPassword && <div style={{ color: 'red' }}>Passwords do not match!</div>}  
        <div className="flex mt3">
            <button
              type='submit'
                className="pointer mr2 button"
            >
                {formState.login ? 'login' : 'create account'}
            </button>
            </div>
            <Error error={signupError || loginError}/>
            </form>
        </div>
        
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
            <h1>Nice to see you again!</h1>
          </div>
        </div>
      </div>
      </div>
        
    </div>
    )
}
