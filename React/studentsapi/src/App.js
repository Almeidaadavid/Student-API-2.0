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
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [updateData, setUpdateData] = useState(true);

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
  }

  const abrirFecharModalIncluir=() => {
    setModalIncluir(!modalIncluir);
  }

  const abrirFecharModalEditar=() => {
    console.log(`SetModalEditar: ${!modalEditar}`)
    setModalEditar(!modalEditar);
  }

  const abrirFecharModalExcluir=() => {
    setModalExcluir(!modalExcluir);
  }

  const PedidoGet = async() => {
    await axios.get(BaseUrl)
      .then(response => {
        console.log(`DataGet: ${response}`);
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
        console.log(`DataPost: ${response.data}`);
        setData(data.concat(response.data));
        setUpdateData(true);
        abrirFecharModalIncluir();
      }).catch(error => {
        console.log(error);
      })
  }

  const PedidoPut = async() => {
    console.log(`AlunoAntesdoPut: ${AlunoSelecionado}`);
    AlunoSelecionado.age = parseInt(AlunoSelecionado.age);
    await axios.put(`${BaseUrl}/${AlunoSelecionado.id}`, AlunoSelecionado).then(response => {
      console.log(`DataPut: ${response.data}`);
      let resposta = response.data;
      let dadosAuxiliares = data;
      dadosAuxiliares.map(aluno => {
        if(aluno.id === AlunoSelecionado.id) {
          aluno.name = resposta.name;
          aluno.email = resposta.email;
          aluno.age = resposta.age;
        }
       });
       setUpdateData(true);
       abrirFecharModalEditar();
    }).catch(error => {
      console.log(error);
    })
  }

  const PedidoDelete = async() => {
    await axios.delete(`${BaseUrl}/${AlunoSelecionado.id}`).then(response => {
      setData(data.filter(aluno => aluno.id !== response.data));
      setUpdateData(true);
      abrirFecharModalExcluir();
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    if(updateData) {
      PedidoGet();
      setUpdateData(false);
    }
  }, [updateData]);

  const SelecionarAluno = (aluno, opcao) => {
    setAlunoSelecionado(aluno);
    opcao === 'Editar' ? abrirFecharModalEditar() : abrirFecharModalExcluir();
  }

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
                <button className='btn btn-primary' onClick={() => SelecionarAluno(aluno,"Editar")}>Editar</button> {" "}
                <button className='btn btn-danger' onClick={() => SelecionarAluno(aluno,"Excluir")}>Excluir</button>
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
        <button className="btn btn-danger" onClick={() => abrirFecharModalIncluir()} >Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Aluno</ModalHeader>
        <ModalBody>
        <div className="form-group">
          <label>ID: </label>
          <input type="text" className='form-control'readOnly value={AlunoSelecionado && AlunoSelecionado.id} />
          <br />
          <label>Nome: </label><br />
          <input type="text" className="form-control" name="name" onChange={handlechange} value={AlunoSelecionado && AlunoSelecionado.name}/>
           
          <br />
          <label>Email: </label><br />
          <input type="text" className="form-control" name="email" onChange={handlechange} value={AlunoSelecionado && AlunoSelecionado.email}/>
          <br />
          <label>Idade: </label><br />
          <input type="text" className="form-control" name="age" onChange={handlechange} value={AlunoSelecionado && AlunoSelecionado.age}/>
          <br />
        </div>
        </ModalBody>
        <ModalFooter>
        <button className="btn btn-primary" onClick={() => PedidoPut()}>Editar</button>{" "}
        <button className="btn btn-danger" onClick={() => abrirFecharModalEditar()} >Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalHeader>Excluir Aluno</ModalHeader>
        <ModalBody>
          Confirma a exclusão deste(a) aluno(a) : {AlunoSelecionado && AlunoSelecionado.name} ?
        </ModalBody>
        <ModalFooter>
        <button className="btn btn-danger" onClick={() => PedidoDelete()}>Excluir</button>{" "}
        <button className="btn btn-secondary" onClick={() => abrirFecharModalExcluir()} >Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
