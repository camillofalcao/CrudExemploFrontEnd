import React from "react";
import { useParams } from "react-router-dom";
import Crud from "../Crud";

const Treinador = () => {

    const {id, acao} = useParams();
    
    const configCampos = {
        titulos: ['Nome'],
        propriedades: ['nome']
    }

    const novoObjeto = () => {
        return { id: '', nome: '' };
    };
    
    const campos = (somenteLeitura, obj, alterarCampo) => {
        return (<>
            <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" readOnly={somenteLeitura} value={obj.nome} onChange={(e) => alterarCampo(e.target.name, e.target.value)} className="form-control" id="nome" name="nome" />
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
            campos={campos}
            novoObjeto={novoObjeto}
        />
    );
};

export default Treinador;
