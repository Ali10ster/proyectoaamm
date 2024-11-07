import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './store/index';
import './index.css'

const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4a1942',
    },
    secondary: {
      main: '#b561a7',
    },
    background: {
      default: '#eaeaea',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
