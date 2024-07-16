import React, { useEffect, useState } from "react";
import './styles.css';
import { FiCornerDownLeft, FiUser, FiUserPlus } from 'react-icons/fi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from "../../Services/api";

export default function NewStudent() {
    const { studentID } = useParams();
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        if (studentID !== "0") {
            loadStudent();
        }
    }, [studentID]);

    async function loadStudent() {
        try {
            setLoading(true);
            const response = await api.get(`/api/students/${studentID}`, authorization);
            setID(response.data.id);
            setName(response.data.name);
            setEmail(response.data.email);
            setAge(response.data.age);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching student:', err);
            setError('Erro ao recuperar aluno.');
            setLoading(false);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const studentData = {
            id: studentID,
            name,
            email,
            age
        };

        try {
            setLoading(true);
            let response;
            if (studentID === "0") {
                response = await api.post('/api/students', studentData, authorization);
            } else {
                response = await api.put(`/api/students/${studentID}`, studentData, authorization);
            }
            setLoading(false);
            navigate('/students');
        } catch (err) {
            console.error('Error saving student:', err);
            setError('Erro ao salvar aluno.');
            setLoading(false);
        }
    }

    const defineAddOrUpdate = () => {
        return studentID === "0" ? 'Incluir' : 'Atualizar';
    }

    const defineTitle = () => {
        const title = defineAddOrUpdate();
        return `${title} ${title === 'Incluir' ? 'novo' : ''} aluno`;
    }

    return (
        <div className="new-student-container">
            <div className="content">
                <section className="form">
                    <FiUserPlus size={105} color="#17202a" />
                    <h1>{defineTitle()}</h1>
                    <Link className='back-link' to="/students">
                        <FiCornerDownLeft size={25} color="#17202a" />
                    </Link>
                    <form onSubmit={handleSubmit}>
                        <input
                            placeholder="Nome"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Idade"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            required
                        />
                        <button className="button" type="submit" disabled={loading}>
                            {loading ? 'Carregando...' : defineAddOrUpdate()}
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                </section>
            </div>
        </div>
    )
}
