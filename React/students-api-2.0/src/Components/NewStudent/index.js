import React from "react";
import './styles.css';
import { FiCornerDownLeft, FiUser, FiUserPlus} from 'react-icons/fi';
import {Link, useParams} from 'react-router-dom'



export default function NewStudent() {
    debugger
    const {studentID} = useParams();

    const DefineAddOrUpdate = () => {
        if (studentID === "0") {
            return 'Incluir'
        };
        return 'Atualizar'
    }

    const DefineTitle = () => {
        let Title = DefineAddOrUpdate();
        if (Title === 'Incluir') {
            return `${Title} novo aluno`;
        }
        return `${Title} aluno`;
    }

    return(
        <div className="new-student-container">
            <div className="content">
                <section className="form">
                    <FiUserPlus size={105} color="#17202a" />
                    <h1>{DefineTitle()}</h1>
                    <Link className='back-link' to="/students">
                        <FiCornerDownLeft size={25} color="#17202a" />
                    </Link>
                    <form>
                        <input placeholder="Nome"></input>
                        <input placeholder="Email"></input>
                        <input placeholder="Idade"></input>
                        <button className="button" type="submit">{DefineAddOrUpdate()}</button>
                    </form>
                </section>
            </div>
        </div>
    )
}