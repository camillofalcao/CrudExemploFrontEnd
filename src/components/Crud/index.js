import React from "react";
import CrudAcao from "./CrudAcao";
import CrudLista from "./CrudLista";
import CrudManutencao from "./CrudManutencao";
import { Link } from "react-router-dom";

const Crud = (props) => {
    let acao = props.acao;

    if (!acao) {
        acao = CrudAcao.listar;
    }

    if (acao === CrudAcao.listar) {
        return (
            <div>
                <h1>Cadastro de {props.entidadeNomeAmigavelPlural}</h1>
                <Link className="btn btn-primary" to={`/${props.entidade}/${CrudAcao.inserir}`}>Inserir</Link>
                <CrudLista 
                    entidade={props.entidade}
                    configCampos={props.configCampos}
                    objetos={props.objetos}
                />
            </div>
        );
    } else if (CrudAcao[acao] === undefined) {
        return <div>Ação inválida!</div>;
    } else {
        return <CrudManutencao 
            entidade={props.entidade}
            entidadeNomeAmigavel={props.entidadeNomeAmigavel}
            acao={props.acao}
            novoObjeto={props.novoObjeto}
            id={props.id}
            campos={props.campos}
        />;
    }
};

export default Crud;
