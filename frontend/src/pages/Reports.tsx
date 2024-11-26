import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Menu from "../components/Menu.tsx";
import InformeColeccion from "../components/InformeColeccion.tsx";
import { useState } from "react";

interface itemtype {
  id?: number;
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
}

function Reports() {
  const [data, setData] = useState<itemtype[]>([]);
  const [showCollection, setShowCollection] = useState(false);

  async function getItems() {
    fetch(`http://localhost:3030/getItems`)
      .then(response => response.json())
      .then(response => {
        setData(response.data);
        setShowCollection(true);
      });
  }

  return (
    <>
      <Menu nombre="Informes" />
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Button variant="contained" onClick={getItems} color="secondary">Imprimir informe</Button>
        <br /><br />
        {showCollection ? <InformeColeccion data={data} /> : null}
      </Container>
    </>
  );
}

export default Reports;