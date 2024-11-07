//Importamos el useSelector del react-redux
import { useSelector } from 'react-redux'
// Importamos lo que necesitamos para el tipo del selector()
import { RootState} from '../store/index'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Home(){
    
 //Almacenamos en la variable userData lo que obtenemos del store usando el hook useSelector
 const userData = useSelector((state: RootState) => state.authenticator)
 //Comprobamos por la consola qué obtenemos del store
 console.log(userData)
 const navigate = useNavigate()
 const dispatch = useDispatch()

 const handleClick = (e: any) => {
    navigate('/');
    dispatch(authActions.logout())

 }
return <>
<Typography>Home de Alister Martín: Soy el usuario {userData.userName} y tengo el rol de {userData.userRol}</Typography>
<Button variant="contained" type='submit' onClick={handleClick}>SALIR</Button>
</>
}