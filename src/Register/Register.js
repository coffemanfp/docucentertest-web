import React from 'react'
import './Register.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { createURL, fetchWrapper } from '../_helpers/fetch-wrapper'

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const onSubmit = user => {
        fetchWrapper.post(createURL('auth/register'), user)
            .then(token => {
                localStorage.setItem('token', token.token)
                navigate('/dashboard')
            })
            .catch(error => {
                alert(error)
            })
    }
    const errorMessages = {
        "name-required": "Name required",
        "name-pattern": "Name invalid",
        "surname-required": "Surname required",
        "surname-pattern": "Surname invalid",
        "username-required": "Username required",
        "username-pattern": "Username invalid",
        "password-required": "Password required",
        "password-pattern": "Password invalid",
    }
    const errorsHandler = (n, t) => {
        const errorAlertText = errorMessages[`${n}-${t}`]
        return errorAlertText && <p role="alert" className="sign-in-form__input-error">{errorAlertText}</p>
    }

    return (
        <div className="register">
            <h1 className="register__title">Welcome to the register!</h1>
            <p className="register__subtitle">Who are you?</p>
            <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='Name' type="text" name="name" id="name" className="register__input"
                    {...register("name", { required: true })} />
                {errorsHandler("name", errors.name?.type)}

                <input placeholder='Surname' type="text" name="surname" id="surname" className="register__input"
                    {...register("surname", { required: true })} />
                {errorsHandler("surname", errors.surname?.type)}

                <input placeholder='Username' type="text" name="username" id="username" className="register__input"
                    {...register("username", { required: true })} />
                {errorsHandler("username", errors.username?.type)}

                <input placeholder='Password' type="password" name="password" id="password" className="register__input"
                    {...register("password", { required: true })}
                />
                {errorsHandler("password", errors.password?.type)}

                <button type="submit" className="register__submit">Register</button>
                <p className="register__text">Already have an account? <Link to="../login" className="register__link">Login!</Link></p>
            </form>
        </div>
    )
}
