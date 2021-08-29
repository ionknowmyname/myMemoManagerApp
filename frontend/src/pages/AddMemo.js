import { useState } from "react";
import {
    TextField,
    Button,
    Card,
    CardContent,
    MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        /* "& > *": {
            margin: theme.spacing(1),
            width: "40ch",
        }, */
        marginTop: "10px",
        background: "#fff",
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "70%",
        height: "82vh",
        transform: `translate(-50%, -50%)`,
    },
    form: {
        // marginTop: "20px",
    },
    submit: {
        paddingTop: "20px",
        paddingBottom: "20px",
    },

    heading: {
        clear: "both",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "95%",
        height: "50px",
        margin: "auto",
        top: "50px",
        background: "#F2F2F2",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
}));

/* const paperStyle = {
    padding: 0,
    width: 550,
    margin: "0 auto",
    marginTop: 5,
}; */

const AddMemo = ({ doHandleChange }) => {
    const classes = useStyles();

    const [date, setDate] = useState("");
    const [loggedDate, setLoggedDate] = useState("");
    const [memoFrom, setMemoFrom] = useState("");
    const [memoTo, setMemoTo] = useState("");
    const [memoTitle, setMemoTitle] = useState("");
    const [memoRemark, setMemoRemark] = useState("");
    const [select, setSelect] = useState("");
    const [file, setFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const handleImageChange = (e) => {
        console.log(e.target.files[0]);

        setFile(e.target.files[0]);
        setIsFilePicked(true);
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

        /* Also works instead of FormDat

        const registered = {
            date: date,
            loggedDate: loggedDate,
            memoFrom: memoFrom,
            memoTo: memoTo,
            memoTitle: memoTitle,
            memoRemark: memoRemark,
            select: select,
            file: file,
        };
        console.log("For Registered ", registered); 
        
        */
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
        <div className={classes.default}>
            <Card className={classes.root}>
                <CardContent>
                    {/* <div className="formUpdate" style={{ paddingTop: "1px" }}> */}
                    <div className={classes.heading}>ADD NEW MEMO</div>

                    <div className="responsive-container">
                        <form
                            className={classes.form}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <div
                                style={{
                                    paddingTop: "40px",
                                    paddingLeft: "20px",
                                }}
                            >
                                <TextField
                                    id="date"
                                    label="Date"
                                    variant="filled"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    style={{ paddingRight: "10px" }}
                                    name="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    id="date"
                                    label="Logged Date"
                                    variant="filled"
                                    style={{ paddingRight: "10px" }}
                                    type="date"
                                    defaultValue="2017-05-24"
                                    name="loggedDate"
                                    value={loggedDate}
                                    onChange={(e) =>
                                        setLoggedDate(e.target.value)
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="From"
                                    name="memoFrom"
                                    style={{ paddingRight: "10px" }}
                                    onChange={(e) =>
                                        setMemoFrom(e.target.value)
                                    }
                                    value={memoFrom}
                                    variant="filled"
                                />
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

                            <div
                                style={{
                                    paddingTop: "20px",
                                    paddingLeft: "20px",
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    name="memoTitle"
                                    label="Title"
                                    style={{ paddingRight: "10px" }}
                                    onChange={(e) =>
                                        setMemoTitle(e.target.value)
                                    }
                                    value={memoTitle}
                                    multiline
                                    rows={6}
                                    variant="filled"
                                />
                                <TextField
                                    id="outlined-basic"
                                    name="memoRemark"
                                    label="Remark"
                                    style={{ paddingRight: "10px" }}
                                    onChange={(e) =>
                                        setMemoRemark(e.target.value)
                                    }
                                    value={memoRemark}
                                    multiline
                                    rows={6}
                                    variant="filled"
                                />
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Select Priority"
                                    value={select}
                                    onChange={(e) => setSelect(e.target.value)}
                                    helperText="Please select memo status"
                                >
                                    <MenuItem value="PENDING">PENDING</MenuItem>
                                    <MenuItem value="URGENT">URGENT</MenuItem>
                                </TextField>
                                <div style={{ paddingTop: "20px" }}>
                                    <input
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={handleImageChange}
                                        id="contained-button-file"
                                        single="true"
                                        type="file"
                                        name="file"
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
                                    {isFilePicked ? (
                                        // <div>
                                        <p>Filename: {file.name}</p>
                                    ) : (
                                        // </div>
                                        <p>Select a file to show details</p>
                                    )}
                                    <Button
                                        variant="contained"
                                        onClick={(e) => handleSubmit(e)}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>

                            {/* <div className={classes.submit}></div> */}
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddMemo;
