
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
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
export default function TablaPrestamos() {
    /**
     * Definicion de variables y tipos
     */
    const [inicio, setInicio] = useState(true);
    const [tableData, setTableData] = useState<itemType[]>([])

    interface itemType {
        id?: number
        articulo: string
        persona: string
        fecha: string
    }

    const itemInitialState: itemType = {
        articulo: '',
        persona: '',
        fecha: ''
    }

    const [item, setItem] = useState(itemInitialState)
    const userData = useSelector((state: RootState) => state.authenticator);

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
        fetch(`http://localhost:3030/getItemsPrestamos`)
            .then(response => response.json())
            .then(response => {
                setTableData(response.data)
            })
    }

    async function handleInsertItem(e: any) {
        e.preventDefault()
        fetch(`http://localhost:3030/addItemsPrestamos?articulo=${item.articulo}&persona=${item.persona}&fecha=${item.fecha}`)
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
    const handleChangeArticulo = (e: any) => {
        setItem({
            ...item,
            articulo: e.target.value
        })
    }

    const handleChangePersona = (e: any) => {
        setItem({
            ...item,
            persona: e.target.value
        })
    }

    const handleChangeFecha = (e: any) => {
        setItem({
            ...item,
            fecha: e.target.value
        })
    }

    function vaciarCampos(){
        setItem(itemInitialState)
    }

    return (
        <>
        
            <Paper elevation={10} sx={{padding: 2}} square={false}>
            <Box component={'form'} onSubmit={handleInsertItem}>
            {userData.userRol === "admin" ?
                <Grid container alignContent={'center'} justifyContent={'center'} marginTop={2} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 5.5 }}>
                    <Grid>
                        <TextField required label='Articulo' onChange={handleChangeArticulo} value={item.articulo}/>
                    </Grid>
                    <Grid>
                        <TextField required label='Persona' onChange={handleChangePersona} value={item.persona}/>
                    </Grid>
                    <Grid>
                        <TextField required type='date' onChange={handleChangeFecha} value={item.fecha}/>
                    </Grid>
                    <Button variant='contained' type="submit">
                        Crear prestamo
                    </Button>
                </Grid>
                :null}
            </Box>
            <Grid container direction={'column'} spacing={2} sx={{ marginTop: { xs: '10px' } }} >
                <Grid sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                    <TableContainer >
                        <Table aria-label='Tabla de Prestamos'>
                            <TableHead>
                                <TableRow>
                                    <TableCell >Articulo</TableCell>
                                    <TableCell>Persona</TableCell>
                                    <TableCell>Fecha</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row: itemType) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.articulo}</TableCell>
                                        <TableCell>{row.persona}</TableCell>
                                        <TableCell>{row.fecha}</TableCell>
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
