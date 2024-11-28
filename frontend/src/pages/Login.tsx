import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import { useState } from 'react'
import Button from '@mui/material/Button'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "../index.css"
import { useNavigate } from 'react-router-dom'
//Importamos el useDispatch del react-redux
import { useDispatch} from 'react-redux'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';
import { Tooltip } from '@mui/material'
function Login() {

  const dispatch = useDispatch()
  const [data, setData] = useState({ usuario: '', contraseña: '', showAlert: false, alertSuccess: false })
  const bduser = 'alister';
  const bdpasswd = '1234';
  const navigate = useNavigate()

  const handleChangeUsuario = (e) => {
    setData({
      ...data,
      usuario: e.target.value
    })
    console.log(data)
  }
  const handleChangeContraseña = (e) => {
    setData({
      ...data,
      contraseña: e.target.value
    })
    console.log(data)
  }

  const handleSubmit = (e: any) => {
       fetch(`http://localhost:3030/login?user=${data.usuario}&password=${data.contraseña}`)
       .then(response => response.json())
       .then (response => {
       if (response.data.length !== 0){
           dispatch(authActions.login({
               name: response.data.nombre,
               rol: response.data.rol
           }))
           navigate('/Home');
       }else {
        handleAlertError();
      }
      })
    e.preventDefault();


  };

  const handleAlertError = () => {
    setData({
      ...data,
      showAlert: true,
      alertSuccess: false
    })
  }

  const handleAlertSuccess = () => {
    setData({
      ...data,
      showAlert: true,
      alertSuccess: true
    })
    navigate('/Home');
  }

  return (
    <>


      <Paper elevation={12}>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container alignContent={'center'} alignItems={'center'}>
            <Grid size={12}>
              <Typography variant="h4">Sistema de acceso</Typography>
              <AccountCircleIcon fontSize='large'></AccountCircleIcon>
            </Grid>
            <Grid padding={2} size={12}>
              <TextField label="Usuario" required fullWidth value={data.usuario} onChange={handleChangeUsuario}></TextField>
            </Grid>
            <Grid padding={2} size={12}>
              <TextField type='password' label="Contraseña" required fullWidth value={data.contraseña} onChange={handleChangeContraseña}></TextField>
            </Grid>
            <Grid padding={2} size={12}>
            <Tooltip title="Acceder" placement="bottom" arrow>
                <Button variant="contained" fullWidth type="submit">ACCEDER</Button>
              </Tooltip>
            </Grid>
            <Grid>
              {data.showAlert === true && data.alertSuccess === true ?
                <Alert severity="success">
                  Acceso concedido
                </Alert>
                : data.showAlert === true && data.alertSuccess === false ?
                  <Alert severity="error">
                    Usuario y/o contraseña incorrectos
                  </Alert>
                  :
                  null
              }


            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
 

export default Login