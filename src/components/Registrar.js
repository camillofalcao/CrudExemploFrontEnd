import React, {useState} from 'react';
import {useQuery} from '../useQuery';
import { useNavigate, useParams } from 'react-router-dom';
import { registrarUsuario } from '../auth';

const Registrar = () => {
    const {acao} = useParams();
    const query = useQuery();
    const navigate = useNavigate();
    const [objeto, setObjeto] = useState({email: '', senha: ''});
    
    const sucesso = (result) => {
        navegar();
    }

    const erro = (e) => {
        console.log(e);
    }

    const criarUsuario = (e) => {
        e.preventDefault();

        if (acao === 'admin') {
            registrarUsuario(objeto.email, objeto.senha, true, sucesso, erro)
        } else {
            registrarUsuario(objeto.email, objeto.senha, false, sucesso, erro)
        }
    };

    const navegar = () => {
        let url = query.get('redirect');

        if (!url) {
            url = '/';
        }

        navigate(url);
    };

    const alterarCampo = (nome, valor) => {
        let obj = {...objeto};
        obj[nome] = valor;
        setObjeto(obj);
    };

    return (
        <div className="mx-5">
            <h1>Criar novo usuário</h1>
            {/* <button onClick={() => navigate(query.get('redirect'))}>Navegar</button> */}
            <form>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" className="form-control" value={objeto.nome} onChange={(e) => alterarCampo(e.target.name, e.target.value)} id="email" name="email" aria-describedby="emailHelp" placeholder="Entre com o e-mail" />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" className="form-control" value={objeto.senha} onChange={(e) => alterarCampo(e.target.name, e.target.value)} id="senha" name="senha" placeholder="Digite a sua senha" />
                </div>
                <button type="submit" className="btn btn-primary mt-2" onClick={criarUsuario}>Criar</button>
            </form>
        </div>
    );
};

export default Registrar;
