import React from "react";
import { useParams } from "react-router-dom";
import Crud from "../Crud";

const Atleta = () => {

    const {id, acao} = useParams();
    
    const configCampos = {
        titulos: ['Nome', 'Altura'],
        propriedades: ['nome', 'altura']
    }

    const novoObjeto = () => {
        return { id: '', nome: '', altura: 0, peso: 0 };
    };
    
    const campos = (somenteLeitura, obj, alterarCampo) => {
        return (<>
            <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" readOnly={somenteLeitura} value={obj.nome} onChange={(e) => alterarCampo(e.target.name, e.target.value)} className="form-control" id="nome" name="nome" />
            </div>
            <div className="form-group">
                <label htmlFor="altura">Altura</label>
                <input type="number" readOnly={somenteLeitura} value={obj.altura} onChange={(e) => alterarCampo(e.target.name, e.target.value)} className="form-control" id="altura" name="altura" />
            </div>
            <div className="form-group">
                <label htmlFor="peso">Peso</label>
                <input type="number" readOnly={somenteLeitura} value={obj.peso} onChange={(e) => alterarCampo(e.target.name, e.target.value)} className="form-control" id="peso" name="peso" />
            </div>
        </>);
    }

    return (
        <Crud 
            entidade = "atleta"
            entidadeNomeAmigavel = "Atleta"
            entidadeNomeAmigavelPlural = "Atletas"
            id = {id}
            acao = {acao}
            configCampos = {configCampos}
            //objetos={objetos}
            campos={campos}
            novoObjeto={novoObjeto}
            // retornarPorId={retornarPorId}
            // inserir={inserir}
            // alterar={alterar}
            // excluir={excluir}
        />
    );
};

export default Atleta;
