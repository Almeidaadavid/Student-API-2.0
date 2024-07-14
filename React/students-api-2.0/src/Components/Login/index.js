import React, { useState, useEffect } from 'react';
import './styles.css';
import LogoImage from '../../Assets/logoimage.png';
import { useHistory } from 'react-router-dom'
import api from "../../Services/api";

export default function Login() {
    return (
        <div className='login-container'>
            <section className='form'>
                <img src={LogoImage} alt='login' id='imagelogo' />
                <form>
                    <h1>Cadastro de alunos</h1>
                    <input placeholder='E-mail'></input>
                    <input type='password' placeholder='Password'></input>
                    <button className='button' type='submit'>Login</button>
                </form>
            </section>
        </div>
    );
}