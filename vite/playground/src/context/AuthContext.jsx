import React, { createContext, useEffect, useReducer } from 'react'

const initialState = {
    user: JSON.parse(localStorage.getItem('poll-user')) || null,
    isFetching: false,
    error: false
}

export const ContextAuth = createContext(initialState);



const AuthReducer = (state, action)=>{
    switch (action.type) {
        case "LOGIN_START":
            return {isFetching: true}
        case "LOGIN_SUCCESS":
            return {isFetching: false, user: action.payload}
        case "LOGIN_ERROR":
            return {isFetching: false, user: null, error: true}
        case "LOGOUT":
            return {user: null, isFetching: false, error: false}
        default:
            return state
    }
}
        

export const AuthContext = ({children}) => {

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(()=>{
    localStorage.setItem("poll-user", JSON.stringify(state.user))
}, [state.user])

  return (
    <ContextAuth.Provider value={{
        user: state.user,
        error: state.error,
        isFetching: state.isFetching,
        dispatch
        }}>
        {children}
    </ContextAuth.Provider>
  )
}