import React from "react";
import './styles.css';
import { Link } from "react-router-dom";
import '../../Global.css';
import LogoCadastro from "../../Assets/usericon.png";
import { FiXCircle, FiUserPlus, FiEdit, FiUserX } from 'react-icons/fi';

export default function Students() {
    return (
        <div className="student-container">
            <header>
                <div className="header-left">
                    <img src={LogoCadastro} alt="Cadastro" />
                    <span>Bem Vindo, <strong>David</strong>!</span>
                </div>
                <div className="header-right">
                    <Link className="button header-link" to="/student/new/0">
                        <FiUserPlus size={20} color="#FFF" />
                    </Link>
                    <button type='button' className="button logout-button">
                        <FiXCircle size={20} color="#FFF" />
                    </button>
                </div>
            </header>
            <form>
                <input type="text" className="filter-input" placeholder="Nome" />
                <button type="button" className="filter-button">
                    Filtrar aluno por nome
                </button>
            </form>
            <h1>Relação de alunos</h1>
            <ul>
                <li>
                    <div className="info">
                        <span><strong>Nome:</strong> David</span>
                        <span><strong>Email:</strong> david@david.com</span>
                        <span><strong>Idade:</strong> 25</span>
                    </div>
                    <div className="button-group">
                        <button type="button" className="opa">
                            <FiEdit size={25} color="#17202a" />
                        </button>
                        <button type="button">
                            <FiUserX size={25} color="#17202a" />
                        </button>
                    </div>
                </li>
                <li>
                    <div className="info">
                        <span><strong>Nome:</strong> David</span>
                        <span><strong>Email:</strong> david@david.com</span>
                        <span><strong>Idade:</strong> 25</span>
                    </div>
                    <div className="button-group">
                        <button type="button">
                            <FiEdit size={25} color="#17202a" />
                        </button>
                        <button type="button">
                            <FiUserX size={25} color="#17202a" />
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    );
}
