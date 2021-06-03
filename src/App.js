import React from 'react';
import Routes from './app/configs/routes';
import { DataProvider } from './app/configs/context';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#569AFF'
    },
    secondary: {
      main: '#FF6666'
    },
    type: 'dark',
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <DataProvider>
        <Routes />
      </DataProvider>
    </MuiThemeProvider>
  );
}

export default App;
