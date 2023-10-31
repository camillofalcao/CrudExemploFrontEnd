import React, {useState} from "react";
import { useParams } from "react-router-dom";
import Crud from "../Crud";

const Treinador = () => {

    const {id, acao} = useParams();
    
    const configCampos = {
        titulos: ['Nome', 'E-mail'],
        propriedades: ['nome', 'email']
    }

    const[objetos, setObjetos] = useState([
        { id: '1', nome: 'Ana', email: 'ana@email.com' },
        { id: '2', nome: 'Bruno', email: 'bruno@email.com' }
    ]);

    const novoObjeto = () => {
        return { id: '', nome: '', email: '' };
    };

    const retornarPorId = (id) => {
        return objetos.find(x => x.id === id);
    };

    const inserir = (obj) => {
        obj.id = obj.nome + obj.email;
        setObjetos([...objetos, obj]);
    }

    const alterar = (obj) => {
        const novosObjetos = objetos.filter(x => x.id !== obj.id);
        setObjetos([...novosObjetos, obj]);
    }

    const excluir = (id) => {
        const novosObjetos = objetos.filter(x => x.id !== id);
        setObjetos([...novosObjetos]);
    }

    const campos = (somenteLeitura, obj, alterarCampo) => {
        return (<>
            <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" readOnly={somenteLeitura} value={obj.nome} onChange={(e) => alterarCampo(e.target.name, e.target.value)} className="form-control" id="nome" name="nome" />
            </div>
            <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" readOnly={somenteLeitura} value={obj.email} onChange={(e) => alterarCampo(e.target.name, e.target.value)} className="form-control" id="email" name="email" />
            </div>
        </>);
    }

    return (
        <Crud 
            entidade = "treinador"
            entidadeNomeAmigavel = "Treinador"
            entidadeNomeAmigavelPlural = "Treinadores"
            id = {id}
            acao = {acao}
            configCampos = {configCampos}
            objetos={objetos}
            campos={campos}
            novoObjeto={novoObjeto}
            retornarPorId={retornarPorId}
            inserir={inserir}
            alterar={alterar}
            excluir={excluir}
        />
    );
};

export default Treinador;
