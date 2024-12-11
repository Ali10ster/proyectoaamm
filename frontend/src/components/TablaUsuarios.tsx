
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { Box, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';

export default function TablaUsuarios() {
    /**
     * Definicion de variables y tipos
     */
    const [inicio, setInicio] = useState(true);
    const [tableData, setTableData] = useState<itemType[]>([])

    interface itemType {
        id?: number
        nombre: string
        login: string
        password: string
        rol: string
    }

    const itemInitialState: itemType = {
        nombre: '',
        login: '',
        password: '',
        rol: ''
    }

    const [item, setItem] = useState(itemInitialState)

    /**
     * Cargado de datos
     */
    useEffect(() => {
        if (inicio) {
            getData();
            setInicio(false)
        }
    }, [inicio]);

    /**
     * Funciones relacionadas a los datos
     */
    async function getData() {
        fetch(`http://localhost:3030/getItemsUsers`)
            .then(response => response.json())
            .then(response => {
                setTableData(response.data)
            })
    }

    async function handleInsertItem(e: any) {
        e.preventDefault()
        fetch(`http://localhost:3030/addItemUsers?nombre=${item.nombre}&login=${item.login}&password=${item.password}&rol=${item.rol}`)
            .then(response => response.json())
            .then(response => {
                if (response === 1) {
                    getData()
                    vaciarCampos()
                    alert('Datos guardados con éxito')
                 }
            })
    }

    function cargarDatosTabla(){
        setInicio(true)
    }

    /**
     * Funciones de cambio de estado del item 
     * 
     */
    const handleChangeName = (e: any) => {
        setItem({
            ...item,
            nombre: e.target.value
        })
    }

    const handleChangeLogin = (e: any) => {
        setItem({
            ...item,
            login: e.target.value
        })
    }

    const handleChangePassword = (e: any) => {
        setItem({
            ...item,
            password: e.target.value
        })
    }

    const handleChangeRol = (e: any) => {
        setItem({
            ...item,
            rol: e.target.value
        })
    }

    function vaciarCampos(){
        setItem(itemInitialState)
    }

    return (
        <>
        
            <Paper elevation={10} sx={{padding: 2}} square={false}>
            <Box component={'form'} onSubmit={handleInsertItem}>
                <Grid container alignContent={'center'} justifyContent={'center'} marginTop={2} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 5.5 }}>
                    <Grid>
                        <TextField required label='Nombre' onChange={handleChangeName} value={item.nombre}/>
                    </Grid>
                    <Grid>
                        <TextField required label='Usuario' onChange={handleChangeLogin} value={item.login}/>
                    </Grid>
                    <Grid>
                        <TextField required label='Contraseña' onChange={handleChangePassword} value={item.password}/>
                    </Grid>
                    <Grid>
                        <TextField required label='rol' onChange={handleChangeRol} value={item.rol}/>
                    </Grid>
                    <Button variant='contained' type="submit">
                        Insertar usuario
                    </Button>
                </Grid>
            </Box>
            <Grid container direction={'column'} spacing={2} sx={{ marginTop: { xs: '10px' } }} >
                <Grid sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                    <TableContainer >
                        <Table aria-label='Tabla de Usuarios'>
                            <TableHead>
                                <TableRow>
                                    <TableCell >Nombre</TableCell>
                                    <TableCell>Usuario</TableCell>
                                    <TableCell>Contraseña</TableCell>
                                    <TableCell>Rol</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row: itemType) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.nombre}</TableCell>
                                        <TableCell>{row.login}</TableCell>
                                        <TableCell>{row.password}</TableCell>
                                        <TableCell>{row.rol}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            </Paper>
        </>
    )
}
