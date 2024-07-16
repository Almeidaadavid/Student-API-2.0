import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import "../../Global.css";
import LogoCadastro from "../../Assets/usericon.png";
import { FiXCircle, FiUserPlus, FiEdit, FiUserX } from "react-icons/fi";
import api from "../../Services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState([]);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (token) {
      api
        .get("api/students", authorization)
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
          setError("Não foi possível buscar a lista de alunos.");
        });
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  async function logout() {
    try {
      const darkMode = localStorage.getItem("isDarkTheme");
      localStorage.clear();
      localStorage.setItem("isDarkTheme", darkMode);
      navigate("/");
    } catch (err) {
      alert("Não foi possível fazer o logout.");
    }
  }

  async function EditStudent(id) {
    try {
      navigate(`/student/new/${id}`);
    } catch (err) {
      alert("Erro ao editar aluno" + err.message);
    }
  }

  async function DeleteStudent(id, name) {
    try {
        if (window.confirm(`Deseja deletar o aluno de nome = ${name} ?`)) {
            await api.delete(`api/students/${id}`, authorization)
            setStudents(students.filter(student => student.id !== id));
        }
    } catch (err) {
      alert("Erro ao deletar aluno" + err.message);
    }
  }

  const searchStudents = (searchValue) => {
    setSearchInput(searchValue);

    if (searchValue === "") {
      setFilter(students);
      return;
    }

    const FilterData = students.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setFilter(FilterData);
  };

  return (
    <div className="student-container">
      <header>
        <div className="header-left">
          <img src={LogoCadastro} alt="Cadastro" />
          <span>
            Bem Vindo, <strong>{email}</strong>!
          </span>
        </div>
        <div className="header-right">
          <Link className="button header-link" to="/student/new/0">
            <FiUserPlus size={20} color="#FFF" />
          </Link>
          <button
            type="button"
            onClick={logout}
            className="button logout-button"
          >
            <FiXCircle size={20} color="#FFF" />
          </button>
        </div>
      </header>
      <form>
        <input
          type="text"
          className="filter-input"
          placeholder="Filtrar por nome..."
          id="filter-input"
          onChange={(e) => searchStudents(e.target.value)}
        />
      </form>
      <h1>Relação de alunos</h1>
      {error && <p className="error-message">{error}</p>}
      {searchInput.length > 1 ? (
        <ul>
          {filter.map((student) => (
            <li key={student.id}>
              <div className="info">
                <span>
                  <strong>Nome:</strong> {student.name}
                </span>
                <span>
                  <strong>Email:</strong> {student.email}
                </span>
                <span>
                  <strong>Idade:</strong> {student.age}
                </span>
              </div>
              <div className="button-group">
                <button type="button" title="Editar aluno" className="opa">
                  <FiEdit
                    size={25}
                    onClick={() => EditStudent(student.id)}
                    color="#17202a"
                  />
                </button>
                <button
                  type="button"
                  title="Excluir aluno"
                  onClick={() => DeleteStudent(student.id, student.name)}
                >
                  <FiUserX size={25} color="#17202a" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              <div className="info">
                <span>
                  <strong>Nome:</strong> {student.name}
                </span>
                <span>
                  <strong>Email:</strong> {student.email}
                </span>
                <span>
                  <strong>Idade:</strong> {student.age}
                </span>
              </div>
              <div className="button-group">
                <button type="button" title="Editar aluno" className="opa">
                  <FiEdit
                    size={25}
                    onClick={() => EditStudent(student.id)}
                    color="#17202a"
                  />
                </button>
                <button
                  type="button"
                  title="Excluir aluno"
                  onClick={() => DeleteStudent(student.id, student.name)}
                >
                  <FiUserX size={25} color="#17202a" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
