import "./App.css";
import Routes from "./Routes";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { indigo, pink } from "@material-ui/core/colors";

function App() {
    const theme = createMuiTheme({
        palette: {
            primary: {
                light: "#757de8",
                main: "#3f51b5",
                dark: "#002984",
                contractText: "#fff",
            },
            secondary: {
                light: "#ff79b0",
                main: "#ff4081",
                dark: "#c60055",
                contractText: "#000",
            },
            openTitle: indigo["400"],
            protectedTitle: pink["400"],
            type: "light",
        },
    });

    return (
        <>
            <MuiThemeProvider theme={theme}>
                <Routes />
            </MuiThemeProvider>
        </>
    );
}

export default App;
