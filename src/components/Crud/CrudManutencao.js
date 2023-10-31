import React, {useState, useEffect} from "react";
import CrudAcao from "./CrudAcao";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {apiAuthGetPorId, apiAuthPost, apiAuthPut, apiAuthDelete} from '../../apis';

const CrudManutencao = (props) => {
    const [objeto, setObjeto] = useState(null);
    const [carregando, setCarregando] = useState(true);
    
    const {id} = props;

    const navigate = useNavigate();
    const location = useLocation();

    const inserir = (obj, sucesso, erro) => {
        apiAuthPost(props.entidade, obj, result => sucesso(result), e => erro(e), navigate, location.pathname);
    }

    const alterar = (obj, sucesso, erro) => {
        apiAuthPut(props.entidade, id, obj, result => sucesso(result), e => erro(e), navigate, location.pathname);
    }

    const excluir = (id, sucesso, erro) => {
        apiAuthDelete(props.entidade, id, result => {
        }, erro => console.log(erro), navigate, location.pathname);
    }

    const sucesso = (result) => {
        console.log(result);
    }

    const erro = (error) => {
        //console.log(e);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
    }
    
    const tratarClique = (e) => {
        e.preventDefault();
        if (props.acao === CrudAcao.inserir) {
            inserir(objeto, sucesso, erro);
        } else if (props.acao === CrudAcao.alterar) {
            alterar(objeto, sucesso, erro);
        } else if (props.acao === CrudAcao.excluir) {
            excluir(objeto.id, sucesso, erro);
        }

        navigate(`/${props.entidade}`);
    };

    const getBotaoAcao = () => {
        if (props.acao === CrudAcao.inserir) {
            return <button className="btn btn-primary" onClick={tratarClique}>Salvar</button>
        } else if (props.acao === CrudAcao.alterar) {
            return <button className="btn btn-warning" onClick={tratarClique}>Salvar</button>
        } else if (props.acao === CrudAcao.excluir) {
            return <button className="btn btn-danger" onClick={tratarClique}>Excluir</button>
        } else {
            return null;
        }
    }

    const alterarCampo = (nome, valor) => {
        let objNovo = {...objeto};
        objNovo[nome] = valor;
        setObjeto(objNovo);
    };

    useEffect(() => {
        const retornarPorId = (id, sucesso, erro) => {
            apiAuthGetPorId(props.entidade, id, dados => sucesso(dados),e => erro(e), navigate, location.pathname);
        };

        if (props.acao === CrudAcao.inserir) {
            setObjeto(props.novoObjeto());
            setCarregando(false);
        }
        else {
            retornarPorId(props.id, (obj => {
                setObjeto(obj);
                setCarregando(false);
            }));            
        }
    }, [carregando, props]);

    if (carregando) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h3 className={props.acao === CrudAcao.excluir ? "text-danger" : ""}>{getTitulo(props.acao, props.entidadeNomeAmigavel)}</h3>
            <form>
                {props.campos(props.acao === CrudAcao.consultar, objeto, alterarCampo)}
                <div>
                    {getBotaoAcao()}
                    <Link className="btn btn-secondary" to={`/${props.entidade}`}>Voltar</Link>
                </div>
            </form>
        </div>
    );
};

const getTitulo = (acao, entidadeNomeAmigavel) => {
    let acaoNome;
    
    if (acao === CrudAcao.alterar) {
        acaoNome = "Alterando";
    } else if (acao === CrudAcao.consultar) {
        acaoNome = "Consultando";
    }else if (acao === CrudAcao.inserir) {
        acaoNome = "Inserindo";
    } else if (acao === CrudAcao.excluir) {
        acaoNome = "Excluindo";
    } else {
        acaoNome = "";
    }

    return `${acaoNome} ${entidadeNomeAmigavel}`;
};

export default CrudManutencao;
