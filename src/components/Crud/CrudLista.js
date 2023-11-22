import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import CrudAcao from './CrudAcao';
import {apiAuthGet} from '../../apis';
import { useNavigate, useLocation } from "react-router-dom";

const CrudLista = (props) => {
    const[objetos, setObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        apiAuthGet(props.entidade, (dados) => {
            setObjetos(dados);
            setCarregando(false);
        }, (erro) => console.log(erro), 
        navigate, location.pathname);
    },[carregando, props, navigate, location]);


    if (carregando) {
        return <div>Carregando...</div>;
    }

    const titulos = props.configCampos.titulos;
    const propriedades = props.configCampos.propriedades;
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {
                            titulos.map(x => <th scope="col">{x}</th>)
                        }
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        objetos.map(obj => {
                            return (
                                <tr>
                                    {
                                        propriedades.map(prop => {
                                            return <td>{obj[prop]}</td>
                                        })
                                    }
                                    <td>
                                        <Link to={`/${props.entidade}/${CrudAcao.consultar}/${obj.id}`} className="btn btn-secondary">Consultar</Link>
                                        <Link to={`/${props.entidade}/${CrudAcao.alterar}/${obj.id}`}className="btn btn-warning">Alterar</Link>
                                        <Link to={`/${props.entidade}/${CrudAcao.excluir}/${obj.id}`}className="btn btn-danger">Excluir</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
        </div>
    );
};

export default CrudLista;