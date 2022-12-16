import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { ChangeEvent, createRef, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TypeOfTag } from 'typescript';
import UserLogin from '../../models/UserLogin';
import { login } from '../../services/Service';
import { addToken } from '../../store/tokens/action';
import './Login.css'

function Login() {

    /*

    A maior parte dos Hooks precisarão de uma variável para acessar o seu valor e uma função para modificar os seus dados

    1 - Criaremos o Hook useState do tipo UserLogin, definindo os seus valores iniciais

    2 - Método para recuperar as informações do usuário

    3 - Chamar o método dentro dos TextFields

    4 - Criaremos o Hook useLocalStorage para armazenar o Token que vamos trazer da API

    5 - Finalizaremos o método onSubmit, fazendo a comunicação com a API e armazenando o Token

    6 - Por fim utilizaremos o Hook useEffect, que vai verificar o token e redirecionar para a página /home, utilizando o Hook useNavigate

    */

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [token, setToken] = useState('')
    const [userLogin, setUserLogin] = useState<UserLogin>({
        usuario: '',
        senha: ''
    })
    
    function updateModel(e: ChangeEvent<HTMLInputElement>) {

        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(token != ''){
            dispatch(addToken(token))
            navigate('/home')
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        try{

            await login('/auth/logar', userLogin, setToken)
            
            toast.success('🦄 Usuario Logado com Sucesso!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });

        }catch(error){

            toast.error('🦄 Dados incorretos, verifique os campos!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }

    return (
        <>
            <Grid container justifyContent='center' alignItems='center'>

                <Grid item alignItems='center' xs={6}>
                    <Box paddingX={20}>
                        <form onSubmit={onSubmit}>

                            <Typography variant='h3' component='h3' gutterBottom color='textPrimary' align='center' className='textos1'>Entrar</Typography>

                            <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth></TextField>

                            <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' fullWidth type='password'></TextField>

                            <Box marginTop={2} textAlign='center'>

                                <Button type='submit' variant='contained' color='primary'>Logar</Button>

                            </Box>

                        </form>
                        <Box display='flex' justifyContent='center' marginTop={2}>
                            <Box marginRight={1}>

                                <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>

                            </Box>

                            <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>

                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6} className='imagem'></Grid>
            </Grid>
        </>
    )
}

export default Login;