import { useState } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            "& > *": {
                margin: theme.spacing(1),
                width: "34ch",
            },
        },
    }));

    const classes = useStyles();
    const paperStyle = {
        paddingTop: 0,
        width: 350,
        margin: "0 auto",
        marginTop: 30,
    };

    // const btnStyle = { margin: '8px 0'}

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const checkUser = (e) => {
        e.preventDefault();

        if (!username || !password) {
            // phone not required
            alert("Please make sure all fields are filled");
            return;
        }

        const user = { username, password };
        console.log("coming from front ", user);

        // const config = { headers: { "Content-type": "application/json" } };
        axios
            .post("http://localhost:8000/users/login", user /* , config */)
            .then((res) => {
                console.log("for response posted to backend: ", res); // consoles in the node terminal
                if (res.status === 200) {
                    // localStorage.setItem("token", 'Bearer ' + res.data.token);
                    localStorage.setItem("token", res.data.token);
                    // window.location.href = "/dashboard";

                    history.push("/dashboard");
                } else {
                    alert("Wrong Username/Password");

                    // clearing out form
                    setUsername("");
                    setPassword("");
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Typography>
                    <h3>LOGIN</h3>
                </Typography>
                <form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    onSubmit={checkUser}
                >
                    <TextField
                        id="filled-basic"
                        label="Username*"
                        variant="filled"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password*"
                        type="password"
                        name="password"
                        variant="filled"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        endIcon={<LockOpenIcon />}
                        // stlye={btnStyle}
                        onClick={checkUser}
                    >
                        Login
                    </Button>
                    <Typography>
                        Do you have an account?
                        <Link to="/memo/signup"> Sign Up</Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    );
};

export default Login;
