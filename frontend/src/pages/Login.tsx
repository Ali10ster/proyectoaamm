import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "../index.css"
function Login() {
  const bduser='alister'
  const bdpasswd='1234'
  const handleSubmit = (e:any) => {
    //Para que no mande el formulario, sino que haga lo que yo le diga.
    e.preventDefault()
    //Aquí iría el código que quiero que se ejecute
    }
    
  return (
    <>


      <Paper elevation={12}>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container alignContent={'center'} alignItems={'center'}>
            <Grid size={12}>
              <Typography><h1>Sistema de acceso</h1></Typography>
              <AccountCircleIcon class="tamaño"></AccountCircleIcon>
            </Grid>
            <Grid padding={2} size={12}>
              <TextField label="Usuario" required fullWidth></TextField>
            </Grid>
            <Grid padding={2} size={12}>
              <TextField label="Contraseña" required fullWidth></TextField>
            </Grid>
            <Grid padding={2} size={12}>
              <Button variant="contained" type='submit'fullWidth>Acceder</Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}

export default Login