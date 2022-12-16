import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Box } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addToken } from '../../../store/tokens/action'
import TokenState from '../../../store/tokens/tokenReducer'
import './Navbar.css'

function Navbar() {

    const navigate = useNavigate()
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )
    const dispatch = useDispatch()

    function goLogout() {
        dispatch(addToken(''))
        toast.info('🦄 Usuario Deslogado!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        navigate('/login')
    }

    var navbarComponent

    if (token !== '') {
        navbarComponent = <AppBar position="static">
            <Toolbar variant="dense">
                <Box className='cursor' >
                    <Typography variant="h5" color="inherit">
                        BlogPessoal
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="start">
                    <Box mx={1} className='cursor'>
                        <Link to='/home' className='text-decorator-none cursor'>
                            <Typography variant="h6" color="inherit">
                                home
                            </Typography>
                        </Link>
                    </Box>
                    <Box mx={1} className='cursor'>
                        <Link to='/posts' className='text-decorator-none cursor'>
                            <Typography variant="h6" color="inherit">
                                postagens
                            </Typography>
                        </Link>

                    </Box>
                    <Box mx={1} className='cursor'>
                        <Link to='/temas' className='text-decorator-none cursor'>
                            <Typography variant="h6" color="inherit">
                                temas
                            </Typography>
                        </Link>

                    </Box>
                    <Box mx={1} className='cursor'>
                        <Link to='/formularioTema' className='text-decorator-none cursor'>
                            <Typography variant="h6" color="inherit">
                                cadastrar tema
                            </Typography>
                        </Link>
                    </Box>
                    <Box mx={1} className='cursor' onClick={goLogout}>
                        <Typography variant="h6" className='cursor'>
                            logout
                        </Typography>
                    </Box>
                </Box>

            </Toolbar>
        </AppBar>
    }

    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar