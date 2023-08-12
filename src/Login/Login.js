import React, { useEffect } from 'react'
import './Login.scss'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { fetchWrapper, createURL } from '../_helpers/fetch-wrapper'
import { useSelector } from 'react-redux'

export default function Login() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const loginStatus = useSelector(state => state.auth.status)
    const onSubmit = user => {
        fetchWrapper.post(createURL('auth/login'), user)
            .then(token => {
                localStorage.setItem('token', token.token)
                navigate('/dashboard')
            })
            .catch(error => {
                alert(error.message || error)
            })
    }

    return (
        <div className="login">
            <h1 className="login__title">Welcome to the Login!</h1>
            <p className="login__subtitle">I'm glad to see you again!</p>

            <form className="login__form" onSubmit={handleSubmit(onSubmit)} >
                <input placeholder='Nickname' type="text" name="email_or_nickname" id="email_or_nickname" className="login__input"
                    {...register("username", { required: true })} />
                <input placeholder='Password' type="password" name="password" id="password" className="login__input"
                    {...register("password", { required: true })} />
                <a href="#" className="login__link" id="sign-in_issues">Having trouble in sign in?</a>

                <button type="submit" className="login__submit">Sign in</button>
                <p className="login__text">Don't have an account? <Link to="../register" className="login__link">Register!</Link></p>
            </form>
        </div>
    )
}