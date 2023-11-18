import React, {useState, useEffect} from "react";
import CrudAcao from "./CrudAcao";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {apiAuthGetPorId, apiAuthPost, apiAuthPut, apiAuthDelete} from '../../apis';

const CrudManutencao = (props) => {
    const [objeto, setObjeto] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [info, setInfo] = useState(null);
    const [msgErro, setMsgErro] = useState(null);
    
    const {id} = props;

    const navigate = useNavigate();
    const location = useLocation();

    const inserir = (obj, sucesso, erro) => {
        const msg = `O(A) ${props.entidade} foi inserido(a) com sucesso!`;

        apiAuthPost(props.entidade, obj, result => sucesso(result, msg, () => navigate(`/${props.entidade}`)), e => erro(e));
    }

    const alterar = (obj, sucesso, erro) => {
        const msg = `O(A) ${props.entidade} foi alterado(a) com sucesso!`;
        
        apiAuthPut(props.entidade, id, obj, result => sucesso(result, msg, () => navigate(`/${props.entidade}`)), e => erro(e), navigate, location.pathname);
    }

    const excluir = (id, sucesso, erro) => {
        const msg = `O(A) ${props.entidade} foi excluído(a) com sucesso!`;

        apiAuthDelete(props.entidade, id, result => sucesso(result, msg, () => navigate(`/${props.entidade}`)), erro => console.log(erro), navigate, location.pathname);
    }

    const sucesso = (result, msg, redirecionar) => {
        setInfo(msg);
        
        setTimeout(() => {
            if (redirecionar) {
                redirecionar();
            } else {
                setInfo(null);
            }            
        }, 1500);
    }

    const erro = (error) => {
        let msg;

        //console.log(e);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
                msg = `Erro: ${error.response.data}`;
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            //console.log(error.request);
            msg = `Erro: nenhum retorno do servidor`;
          } else {
            // Something happened in setting up the request that triggered an Error
            //console.log('Error', error.message);
            msg = `Erro: ${error.message}`;
          }
          //console.log(error.config);

        setMsgErro(msg);
    }
    
    const tratarClique = (e) => {
        e.preventDefault();
        
        if (msgErro) {
            setMsgErro(null);
        }

        if (props.acao === CrudAcao.inserir) {
            inserir(objeto, sucesso, erro);
        } else if (props.acao === CrudAcao.alterar) {
            alterar(objeto, sucesso, erro);
        } else if (props.acao === CrudAcao.excluir) {
            excluir(objeto.id, sucesso, erro);
        }
        
        //navigate(`/${props.entidade}`);
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

    const compInfo = info ? (<div className="alert alert-info">{info}</div>) : null;
    const compErro = msgErro ? (<div className="alert alert-danger">{msgErro}</div>) : null;

    return (
        <div>
            <h3 className={props.acao === CrudAcao.excluir ? "text-danger" : ""}>{getTitulo(props.acao, props.entidadeNomeAmigavel)}</h3>
            {compInfo}
            {compErro}
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
