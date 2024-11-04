import { Typography } from "@mui/material";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError();
    console.log(error)
    return(
        <>
            <Typography variant="h1" color="primary">
                Vaya... :(
            </Typography>
            <Typography variant="h3" color="secondary">
                revisar la ruta
            </Typography>
        </>
    )
}