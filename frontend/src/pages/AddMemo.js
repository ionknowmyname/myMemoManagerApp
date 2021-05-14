import { useState } from "react";
import {
    TextField,
    Button,
    Container,
    Paper,
    MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const AddMemo = ({ doHandleChange }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            "& > *": {
                margin: theme.spacing(1),
                width: "40ch",
            },
        },
    }));

    const classes = useStyles();
    const paperStyle = {
        padding: 0,
        width: 550,
        margin: "0 auto",
        marginTop: 30,
    };

    const [date, setDate] = useState("");
    const [loggedDate, setLoggedDate] = useState("");
    const [memoFrom, setMemoFrom] = useState("");
    const [memoTo, setMemoTo] = useState("");
    const [memoTitle, setMemoTitle] = useState("");
    const [memoRemark, setMemoRemark] = useState("");
    const [select, setSelect] = useState("");
    const [file, setFile] = useState();

    const handleImageChange = (e) => {
        console.log(e.target.files[0]);

        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("memoFrom", memoFrom);
        formData.append("memoTo", memoTo);
        formData.append("memoTitle", memoTitle);
        formData.append("memoRemark", memoRemark);
        formData.append("date", date);
        formData.append("select", select);
        formData.append("loggedDate", loggedDate);
        formData.append("file", file);

        const registered = {
            date,
            loggedDate,
            memoFrom,
            memoTo,
            memoTitle,
            memoRemark,
            select,
            file,
        };
        console.log("For Registered ", registered);
        console.log("For formData ", formData);

        const config = {
            headers: {
                "Content-type": "application/json", // "multipart/form-data"
                // enctype: "multipart/form-data",
            },
        };
        axios
            .post("http://localhost:8000/newMemo/memo", formData, config) // delete config so browser can add correct header
            .then((res) => {
                console.log("for response posted to backend ", res); // consoles in the node terminal

                // clearing out form
                setMemoFrom("");
                setMemoTo("");
                setMemoTitle("");
                setMemoRemark("");

                if (res.status === 200) {
                    window.location.href = "/dashboard";

                    /* 
                    <Typography>Already Registered? Go to 
                        <Link href='#' onClick={() => { doHandleChange('event', 2) }}> Login</Link>
                    </Typography>
                     */
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <Container>
            <Paper style={paperStyle}>
                <div className="formUpdate" style={{ paddingTop: "50px" }}>
                    <form
                        className={classes.root}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <div style={{ paddingTop: "20px" }}>
                            <TextField
                                id="date"
                                label="Date"
                                variant="filled"
                                className="formDate"
                                type="date"
                                defaultValue="2017-05-24"
                                name="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                        <div style={{ paddingTop: "20px" }}>
                            <TextField
                                id="date"
                                label="Logged Date"
                                variant="filled"
                                className="formDate"
                                type="date"
                                defaultValue="2017-05-24"
                                name="loggedDate"
                                value={loggedDate}
                                onChange={(e) => setLoggedDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div style={{ paddingTop: "20px" }}>
                            <TextField
                                id="outlined-basic"
                                label="From"
                                name="memoFrom"
                                className="formText"
                                onChange={(e) => setMemoFrom(e.target.value)}
                                value={memoFrom}
                                variant="filled"
                            />
                        </div>
                        <div style={{ paddingTop: "20px" }}>
                            <TextField
                                id="outlined-basic"
                                name="memoTo"
                                label="To"
                                className="formText"
                                onChange={(e) => setMemoTo(e.target.value)}
                                value={memoTo}
                                variant="filled"
                            />
                        </div>
                        <div style={{ paddingTop: "20px" }}>
                            <TextField
                                id="outlined-basic"
                                name="memoTitle"
                                label="Title"
                                className="formText"
                                onChange={(e) => setMemoTitle(e.target.value)}
                                value={memoTitle}
                                multiline
                                rows={6}
                                variant="filled"
                            />
                        </div>

                        <div style={{ paddingTop: "20px" }}>
                            <TextField
                                id="outlined-basic"
                                name="memoRemark"
                                label="Remark"
                                className="formText"
                                onChange={(e) => setMemoRemark(e.target.value)}
                                value={memoRemark}
                                multiline
                                rows={6}
                                variant="filled"
                            />
                        </div>

                        <div>
                            <div style={{ paddingTop: "30px" }}>
                                {/* 
                                <div>
                                    <input
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={handleImageChange}
                                        id="contained-button-file"
                                        single="true"
                                        type="file"
                                        name="filename"
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            component="span"
                                        >
                                            Upload file
                                            <input type="file" hidden />
                                        </Button>
                                    </label>
                                </div> 
                                */}

                                <div class="form-group">
                                    <input
                                        type="file"
                                        name="file"
                                        id="pic"
                                        onChange={handleImageChange}
                                        class="form-control-file"
                                    />
                                </div>
                            </div>

                            <TextField
                                id="standard-select-currency"
                                select
                                label="Select"
                                value={select}
                                onChange={(e) => setSelect(e.target.value)}
                                helperText="Please select memo status"
                            >
                                <MenuItem value="PENDING">PENDING</MenuItem>
                                <MenuItem value="URGENT">URGENT</MenuItem>
                            </TextField>
                        </div>

                        <div className="" style={{ paddingTop: "30px" }}>
                            <Button
                                variant="contained"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </Paper>
        </Container>
    );
};

export default AddMemo;
