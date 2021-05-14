import { useState } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Icon from '@material-ui/core/Icon';
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
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
        padding: 0,
        width: 350,
        margin: "0 auto",
        marginTop: 30,
    };

    // Add to DB
    /*   const addToDB = async (task) => {
        // adding to backend server
        const res = await fetch('http://localhost:5000/tasks', { 
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(task) 
        })

        const data = await res.json()
        setTasks([...tasks, data])

    }
 */

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitUser = (e) => {
        e.preventDefault();

        if (!username || !password) {
            // phone not required
            alert("Please make sure all fields are filled");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        const registered = { username, password };
        console.log("For Registered ", registered);

        const config = { headers: { "Content-type": "application/json" } };
        axios
            .post("http://localhost:8000/users/register", registered, config)
            .then((res) => {
                console.log("for response posted to backend ", res); // consoles in the node terminal

                // clearing out form
                setUsername("");
                setPassword("");

                if (res.status === 200) {
                    window.location.href = "/memo/login";
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Typography>
                    <h3>SIGN UP</h3>
                </Typography>
                <form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    onSubmit={submitUser}
                >
                    <TextField
                        id="outlined-basic"
                        label="Full Name*"
                        variant="outlined"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        id="outlined-basic4"
                        label="Password*"
                        name="password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={submitUser}
                    >
                        Save
                    </Button>

                    <Typography>
                        Already Registered? Go to
                        <Link to="/memo/login"> Login</Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    );
};

export default Signup;
