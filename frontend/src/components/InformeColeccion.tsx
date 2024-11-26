
import MaterialTable, { Column } from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

interface ItemType {
  id?: number;
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
}

interface dataProp {
  data: ItemType[];
}

function InformeColeccion({ data }: dataProp) {
  const theme = useTheme();
  const columns: Array<Column<ItemType>> = [
    { title: "Nombre", field: "nombre", filtering: false },
    { title: "Marca", field: "marca" },
    { title: "Tipo", field: "tipo" },
    { title: "Precio", field: "precio", type: "numeric", filtering: false }
  ];

  const tableData = data.map((row) => ({
      nombre: row.nombre,
      marca: row.marca,
      tipo: row.tipo,
      precio: row.precio
    }
  ));

  return (
    <MaterialTable
      title={<Typography variant="h5" sx={{fontWeight: "bold"}}>COLECCION</Typography>}
      columns={columns} data={tableData}
      renderSummaryRow={({ column, data }) =>
        column.field === "precio"
          ? {
            value: data.reduce((agg, row) => agg + row.precio, 0)
          }
          : undefined
      }
      options={{
        exportMenu: [
          {
            label: "Exportar a PDF",
            exportFunc: (cols, datas) => ExportPdf(cols, datas, "InformeColeccion")
          },
          {
            label: "Exportar a CSV",
            exportFunc: (cols, datas) => ExportCsv(cols, datas, "InformeColeccion")
          }
        ],
        draggable: true,
        columnsButton: true,
        filtering: true,
        headerStyle: {
          fontSize: "17px",
          fontWeight: "bold"
        }
      }}
    />
  );
}

export default InformeColeccion;
 