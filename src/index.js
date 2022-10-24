import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const theme = createTheme(
  {
    palette: {
      primary: { main: '#5a8391' },
      color: { main: '#FFFFFF', bg: '#555555', bgInterno: '#F3F6FF' },
      alert: { main: '#912c2c' }
    },
    typography: {
      button: {
        textTransform: 'none',
        color: '#FFFFFF'
      },
      allVariants: {
        color: '#555555'
      }
    },
    components: {
      MuiAlert: {
        styleOverrides: {
          filledSuccess: {
            backgroundColor: '#2c9153'
          },
          filledError: {
            backgroundColor: '#912c2c'
          }
        }
      }
    }
  },
  ptBR,
);

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient()

root.render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
