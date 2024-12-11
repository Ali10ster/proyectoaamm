import Menu from "../components/Menu.tsx";
import TablaUsuarios from "../components/TablaUsuarios.tsx";

function GestionUsuarios() {
  return (
    <>
      <Menu page="Gestión usuarios" />
      <TablaUsuarios />
    </>
  );
}

export default GestionUsuarios;