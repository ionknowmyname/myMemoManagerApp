// import { Modal, Button } from "react-bootstrap";

import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    Button,
    // Container,
    // Paper,
    MenuItem,
} from "@material-ui/core";
import moment from "moment";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
// import Fade from "@material-ui/core/Fade";

import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
    root: {
        /* "& > *": {
            margin: theme.spacing(1),
            width: "34ch",
        }, */

        margin: 0,
        background: "#fff",
        position: "relative",
        top: "50%",
        left: "50%",
        // marginRight: '-50%',
        width: "70%",
        height: "80vh",
        transform: `translate(-50%, -50%)`,
        // zIndex:
    },

    closeImg: {
        cursor: "pointer",
        float: "right",
        margin: "20px 20px 20px 0",
        width: "50px",
    },
    heading: {
        clear: "both",
        // position: 'absolute',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "95%",
        height: "58px",
        margin: "auto",
        top: "100px",
        background: "#F2F2F2",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    /* tables: {
        margin: "auto",
        width: "95%",
        borderSpacing: "0",
        borderCollapse: "collapse",
    }, */

    spaces: {
        width: "95%",
        height: "75px",
        margin: "auto",
        border: "1px solid red",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    actionBtn: {
        display: "inline-block",
        padding: "5px 20px ",
        margin: "5px 50px 5px 5px",
    },
}));

const EditMemoModal = ({ show, onClose, dataFromDB }) => {
    //const [open, setOpen] = useState(false);
    const [tableData, setTableData] = useState({});

    const [memoFrom, setMemoFrom] = useState("");
    const [memoTo, setMemoTo] = useState("");
    const [memoTitle, setMemoTitle] = useState("");
    const [memoRemark, setMemoRemark] = useState("");
    const [select, setSelect] = useState("");

    useEffect(() => {
        setTableData(dataFromDB);
    }, [dataFromDB]);

    /* 
    
    const useStyles = makeStyles((theme) => ({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    })); 
    
    */

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("memoFrom", memoFrom);
        formData.append("memoTo", memoTo);
        formData.append("memoTitle", memoTitle);
        formData.append("memoRemark", memoRemark);

        formData.append("select", select);

        // console.log("For Registered ", registered);
        console.log("For formData ", formData);

        const config = {
            headers: {
                "Content-type": "application/json",
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
                }
            })
            .catch((err) => console.log(err));
    };

    if (!show) return null;
    return (
        <div className={classes.default}>
            <Card className={classes.root}>
                <CardContent>
                    <Tooltip
                        title="Close"
                        placement="left-start"
                        arrow
                        interactive
                    >
                        <Button
                            onClick={onClose}
                            className={classes.closeImg}
                            startIcon={<CloseIcon />}
                        ></Button>
                    </Tooltip>

                    <div className={classes.heading}>EDIT MEMO DETAILS</div>

                    <div className={classes.spaces}>
                        <span>
                            Logged date:{" "}
                            <strong>
                                {moment(tableData.createdAt).format(
                                    "DD MMM, YYYY"
                                )}
                            </strong>
                        </span>
                        <span>
                            Status:{" "}
                            {tableData.select === "URGENT" ? (
                                <Button
                                    variant="contained"
                                    style={{
                                        backgroundColor: "#FF0000",
                                        color: "#fff",
                                    }}
                                >
                                    URGENT
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    style={{
                                        backgroundColor: "#FFFF00",
                                        color: "#fff",
                                    }}
                                >
                                    PENDING
                                </Button>
                            )}
                        </span>
                    </div>

                    <div className="responsive-container">
                        <form
                            className={classes.root}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                disabled
                                id="outlined-basic"
                                label="From"
                                name="memoFrom"
                                className="formText"
                                onChange={(e) => setMemoFrom(e.target.value)}
                                value={memoFrom}
                                defaultValue={tableData.memoFrom}
                                variant="filled"
                            />
                            <TextField
                                disabled
                                id="outlined-basic"
                                name="memoTo"
                                label="To"
                                className="formText"
                                onChange={(e) => setMemoTo(e.target.value)}
                                value={memoTo}
                                defaultValue={tableData.memoTo}
                                variant="filled"
                            />
                            <TextField
                                id="outlined-basic"
                                name="memoTitle"
                                label="Title"
                                className="formText"
                                onChange={(e) => setMemoTitle(e.target.value)}
                                value={memoTitle}
                                multiline
                                rows={6}
                                defaultValue={tableData.memoTitle}
                                variant="filled"
                            />
                            <TextField
                                id="outlined-basic"
                                name="memoRemark"
                                label="Remark"
                                className="formText"
                                onChange={(e) => setMemoRemark(e.target.value)}
                                value={memoRemark}
                                multiline
                                rows={6}
                                defaultValue={tableData.memoRemark}
                                variant="filled"
                            />

                            {/* /////////////////////////////// */}

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

                            <div
                                className=""
                                style={{
                                    paddingTop: "30px",
                                    paddingBottom: "30px",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Submit
                                </Button>
                            </div>

                            {/* <tbody>
                                <tr>
                                    <td>M/No: </td>
                                    <td></td>
                                    <td>Title: </td>
                                    <td colSpan="3">{}</td>
                                </tr>
                                <tr>
                                    <td>From: </td>
                                    <td></td>
                                    <td>To: </td>
                                    <td></td>
                                    <td>Date: </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td className="double">Details: </td>
                                    <td className="double" colSpan="5"></td>
                                </tr>
                                <tr>
                                    <td>Actions: </td>
                                    <td colSpan="5">
                                        <div className={classes.actionBtn}>
                                            <Button
                                                variant="contained"
                                                style={{
                                                    backgroundColor: "#2E87A9",
                                                    color: "#fff",
                                                }}
                                                onClick={(e) => {
                                                    console.log(
                                                        "dataFromDB: ",
                                                        dataFromDB
                                                    );
                                                    if (localStorage.token) {
                                                        // handleClick();
                                                        localStorage.setItem(
                                                            "modalValues",
                                                            "treat"
                                                        );
                                                    }
                                                }}
                                            >
                                                Treat
                                            </Button>
                                        </div>
                                        <div className={classes.actionBtn}>
                                            <Button
                                                variant="contained"
                                                style={{
                                                    backgroundColor: "#2E87A9",
                                                    color: "#fff",
                                                }}
                                            >
                                                Re-assign
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody> */}
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>

        /* 
            
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Transition modal</h2>
                        <p id="transition-modal-description">
                            react-transition-group animates me.
                        </p>
                    </div>
                </Fade>
            </Modal> 

            */

        /* 
            
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras
                        justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at
                        eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal> 
            
            */
    );
};

export default EditMemoModal;
