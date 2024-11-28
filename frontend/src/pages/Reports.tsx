import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Menu from "../components/Menu.tsx";
import InformeColeccion from "../components/InformeColeccion.tsx";
import { Tooltip } from "@mui/material";
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
      <Menu page="Informes" />
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Tooltip title="Imprimir informe" placement="bottom" arrow>
          <Button variant="contained" onClick={getItems} color="primary">Imprimir informe</Button>
        </Tooltip>
        <br /><br />
        {showCollection ? <InformeColeccion data={data} /> : null}
      </Container>
    </>
  );
}

export default Reports;