import Menu from "../components/Menu.tsx";
import TablaPrestamos from "../components/TablaPrestamos.tsx";

function GestionPrestamos() {
  return (
    <>
      <Menu page="Gestión Prestamos" />
      <TablaPrestamos />
    </>
  );
}

export default GestionPrestamos;