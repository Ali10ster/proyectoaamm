import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
function Login() {
  
    return (
      <>
      <Typography variant='h1'>Pagína login Alister Alberto Martin Miranda</Typography>
      <Container role="main">
        <Typography variant='h2' color='success'>Usamos h2</Typography>
        <Typography variant='h3' color='secondary'>Usamos h3</Typography>
        <Typography variant='h4' color='error'>Usamos h4</Typography>
        <Typography variant='subtitle1' color='info'>Usamos subtitle</Typography>
        <Button variant='text'>Boton 1</Button>
        <Button variant='contained'>Boton 2</Button>
        <Button variant='outlined'>Boton 3</Button>
      </Container>
      </>
    )
  }
  
  export default Login