import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import './ListaTema.css';
import Tema from '../../../models/Tema';
import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../services/Service';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import TokenState from '../../../store/tokens/tokenReducer';

function ListaTema() {

  const [temas, setTemas] = useState<Tema[]>([])
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (token == '') {
      toast.error('Você precisa estar logado! >:^(', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored',
        progress: undefined
      })
      navigate('/login')
    }
  }, [token])

  async function getTema() {
    await busca('/tema', setTemas, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getTema()
  }, [temas.length])

  return (
    <>

      {
        temas.map(tema => (
          <Box m={2} >
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Tema
                </Typography>
                <Typography variant="h5" component="h2">
                  {tema.descricao}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5} >

                  <Link to="" className="text-decorator-none">
                    <Box mx={1}>
                      <Link to={`/formularioTema/${tema.id}`} className='text-decorator-none'>
                        <Button variant="contained" className="marginLeft" size='small' color="primary" >
                          atualizar
                        </Button>
                      </Link>
                    </Box>
                  </Link>
                  <Link to="" className="text-decorator-none">
                    <Box mx={1}>
                      <Link to={`/deletarTema/${tema.id}`} className='text-decorator-none'>
                        <Button variant="contained" size='small' color="secondary">
                          deletar
                        </Button>
                      </Link>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>
        ))
      }


    </>
  );
}


export default ListaTema;