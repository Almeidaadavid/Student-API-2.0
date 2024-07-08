import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import LogoCadastro from './assets/icon-cadastro.png';

function App() {
  const BaseUrl = "https://localhost:7218/api/students";
  const [data, setData] = useState([]);
  const [modalIncluir, setModalIncluir] = useState(false);

  const [AlunoSelecionado, setAlunoSelecionado] = useState({
    id: '',
    name: '',
    email: '',
    age: '',
  });

  const handlechange = e => {
    const {name, value} = e.target;
    setAlunoSelecionado ({
      ...AlunoSelecionado, [name]:value
    });
    console.log(AlunoSelecionado);
  }

  const abrirFecharModalIncluir=() => {
    setModalIncluir(!modalIncluir);
  }

  const PedidoGet = async() => {
    await axios.get(BaseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const PedidoPost = async() => {
    delete AlunoSelecionado.id;
    AlunoSelecionado.age = parseInt(AlunoSelecionado.age);
    await axios.post(BaseUrl, AlunoSelecionado)
      .then(response => {
        setData(data.concat(response.data));
        abrirFecharModalIncluir();
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    PedidoGet();
  },[])

  return (
    <div className="aluno-container">
      <br/>
      <h3>Cadastro de Alunos</h3>
      <header>
        <img src={LogoCadastro} alt='cadastro'/>
        <button className='btn btn-success' onClick={() => abrirFecharModalIncluir()}>Incluir novo aluno</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((aluno=> (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.name}</td>
              <td>{aluno.email}</td>
              <td>{aluno.age}</td>
              <td>
                <button className='btn btn-primary'>Editar</button> {" "}
                <button className='btn btn-danger'>Excluir</button>
              </td>
            </tr>
          )))}
        </tbody>
      </table>

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir Alunos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome: </label>
            <br />
            <input type="text" name='name' onChange={handlechange} className="form-control" />
            <br />
            <label>Email: </label>
            <br />
            <input type="text" name='email' onChange={handlechange} className="form-control" />
            <br />
            <label>Idade: </label>
            <br />
            <input type="text" name='age' onChange={handlechange} className="form-control" />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
        <button className="btn btn-primary" onClick={() => PedidoPost() }>Incluir</button> {" "}
        <button className="btn btn-danger”" onClick={() => abrirFecharModalIncluir()} >Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
