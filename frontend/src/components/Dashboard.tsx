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

export default function Dashboard() {
    /**
     * Definicion de variables y tipos
     */
    const [inicio, setInicio] = useState(true);
    const [tableData, setTableData] = useState<itemType[]>([])

    interface itemType {
        id?: number
        nombre: string
        marca: string
        tipo: string
        precio: number
    }

    const itemInitialState: itemType = {
        nombre: '',
        marca: '',
        tipo: '',
        precio: 0.0
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
        fetch(`http://localhost:3030/getItems`)
            .then(response => response.json())
            .then(response => {
                setTableData(response.data)
            })
    }

    async function handleDeleteItem(row: itemType) {
        fetch(`http://localhost:3030/deleteItem?id=${row.id}`)
            .then(response => response.json())
            .then(response => {
                if (response === 1) {
                    cargarDatosTabla()
                }
            })
    }

    async function handleInsertItem() {
        fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio})`)
            .then(response => response.json())
            .then(response => {
                if (response === 1) {
                    cargarDatosTabla()
                    vaciarCampos()
                }
            })
    }

    function cargarDatosTabla(){
        setInicio(true)
    }

    /**
     * Funciones de cambio de estado del item 
     */
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItem({
            ...item,
            nombre: e.target.value
        })
    }

    const handleChangeMarca = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItem({
            ...item,
            marca: e.target.value
        })
    }

    const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItem({
            ...item,
            tipo: e.target.value
        })
    }

    const handleChangePrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItem({
            ...item,
            precio: parseFloat(e.target.value)
        })
    }

    function vaciarCampos(){
        setItem(itemInitialState)
    }

    return (
        <>
            <Paper elevation={10} sx={{padding: 2}} square={false}>
            <Grid container direction={'column'} spacing={2} sx={{ marginTop: { xs: '10px' } }} >
                <Grid sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                    <TableContainer >
                        <Table aria-label='Tabla de colección'>
                            <TableHead>
                                <TableRow>
                                    <TableCell >Nombre</TableCell>
                                    <TableCell>Marca</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Precio</TableCell>
                                    <TableCell>Eliminar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row: itemType) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.nombre}</TableCell>
                                        <TableCell>{row.marca}</TableCell>
                                        <TableCell>{row.tipo}</TableCell>
                                        <TableCell>{row.precio}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleDeleteItem(row)}>
                                                <DeleteForever />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                 <Box component={'form'}>
                <Grid container alignContent={'center'} justifyContent={'center'} marginTop={2} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 5.5 }}>
                    <Grid>
                        <TextField required label='Nombre' onChange={handleChangeName} value={item.nombre}/>
                    </Grid>
                    <Grid>
                        <TextField required label='Marca' onChange={handleChangeMarca} value={item.marca}/>
                    </Grid>
                    <Grid>
                        <TextField required label='Tipo' onChange={handleChangeType} value={item.tipo}/>
                    </Grid>
                    <Grid>
                        <TextField required label='Precio' type='number' onChange={handleChangePrecio} value={item.precio}/>
                    </Grid>
                    <Button variant='contained' onClick={handleInsertItem}>
                        Insertar dato
                    </Button>
                </Grid>
            </Box>
            </Grid>
            </Paper>
        </>
    )
}