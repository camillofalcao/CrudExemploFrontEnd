import Cookies from 'universal-cookie';
import {jwtDecode} from 'jwt-decode';
import { apiPost, apiAuthPost } from '../apis';

const cookies = new Cookies();

export const estaAutenticado = () => {
    const token = cookies.get('jwt_auth');

    return token !== null && token !== undefined;
};

export const getToken = () => {
    const token = cookies.get('jwt_auth');    
    return token;
}

export const nomeUsuarioLogado = () => {
    if (estaAutenticado()) {
        return localStorage.getItem('usuario_nome');
    } else {
        return '';
    }
};

export const permissoesUsuarioLogado = () => {
    if (estaAutenticado()) {
        return localStorage.getItem('usuario_permissao');
    } else {
        return '';
    }
};

export const usuarioPossuiPermissao = (permissao) => {
    const permissoes = ';' + localStorage.getItem('usuario_permissao') + ';';

    return permissoes.includes(';' + permissao + ';');
}

export const registrarUsuario = (usuario, senha, admin, sucesso, erro) => {
    
    if (admin) {
        apiAuthPost('usuario/criaradmin', {Email: usuario, Password: senha}, (result) => {
            const token = result;
            const decoded = jwtDecode(token);

            const {unique_name, roles} = decoded;

            localStorage.setItem('usuario_nome', unique_name);
            localStorage.setItem('usuario_permissao', roles);
            
            cookies.set('jwt_auth', token, {
                expires: new Date(decoded.exp * 1000), //de segundos para milisegundos
                sameSite: 'strict'
            });

            sucesso(unique_name, roles);
        }, erro);
    } else {
        apiPost('usuario/criar', {Email: usuario, Password: senha}, (result) => {
            const token = result;
            const decoded = jwtDecode(token);

            const {unique_name, roles} = decoded;

            localStorage.setItem('usuario_nome', unique_name);
            localStorage.setItem('usuario_permissao', roles);
            
            cookies.set('jwt_auth', token, {
                expires: new Date(decoded.exp * 1000), //de segundos para milisegundos
                sameSite: 'strict'
            });

            sucesso(unique_name, roles);
        }, erro);
    }
};

export const login = (usuario, senha, sucesso, erro) => {
    apiPost('usuario/login', {Email: usuario, Password: senha}, (result) => {
        
        const token = result;
        const decoded = jwtDecode(token);

        const {unique_name, roles} = decoded;

        localStorage.setItem('usuario_nome', unique_name);
        localStorage.setItem('usuario_permissao', roles);

        cookies.set('jwt_auth', token, {
            expires: new Date(decoded.exp * 1000), //de segundos para milisegundos
            sameSite: 'strict'

        });

        sucesso(unique_name, roles);
    }, erro);    
};


export const logout = () => {
    cookies.remove('jwt_auth', { sameSite: 'strict' });
    localStorage.removeItem('usuario_nome');
    localStorage.removeItem('usuario_permissao');
};
