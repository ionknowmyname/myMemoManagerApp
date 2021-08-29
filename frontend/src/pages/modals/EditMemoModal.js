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
import { useHistory } from "react-router-dom";

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

        marginTop: "40px",
        background: "#fff",
        position: "absolute",
        top: "50%",
        left: "50%",
        // marginRight: '-50%',
        width: "70%",
        height: "80vh",
        transform: `translate(-50%, -42%)` /* left, up */,
        // zIndex:
    },
    form: {
        marginTop: "20px",
    },

    closeImg: {
        cursor: "pointer",
        float: "right",
        margin: "5px 5px 2px 0",
        width: "30px",
    },
    heading: {
        clear: "both",
        // position: 'absolute',
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

    spaces: {
        width: "95%",
        height: "68px",
        margin: "auto",
        border: "1px solid red",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    /* actionBtn: {
        display: "inline-block",
        padding: "5px 20px ",
        margin: "5px 50px 5px 5px",
    }, */
}));

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

    const classes = useStyles();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        /* 
        let formData = new FormData();
        formData.append("ID", tableData._id);
        formData.append("memoFrom", memoFrom);
        formData.append("memoTo", memoTo);
        formData.append("memoTitle", memoTitle);
        formData.append("memoRemark", memoRemark);
        formData.append("select", select);

        console.log("For formData ", formData); 
        */

        const toUpdate = {
            ID: tableData._id,
            memoFrom: memoFrom,
            memoTo: memoTo,
            memoTitle: memoTitle,
            memoRemark: memoRemark,
            select: select,
        };

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        axios
            .post("http://localhost:8000/newMemo/memoUpdate", toUpdate, config) // formData
            .then((res) => {
                console.log("for response updated to backend ", res); // consoles in the node terminal

                // clearing out form
                setMemoFrom("");
                setMemoTo("");
                setMemoTitle("");
                setMemoRemark("");

                if (res.status === 200) {
                    // window.location.href = "/dashboard";
                    onClose();
                    history.push("/dashboard");
                }
            })
            .catch((err) => console.log(err));

        console.log("dataFromDB: ", dataFromDB);
        console.log("tableData: ", tableData);
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
                            className={classes.form}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                disabled
                                id="outlined-basic1"
                                label="From"
                                name="memoFrom"
                                className="formText"
                                onChange={(e) => setMemoFrom(e.target.value)}
                                // value={memoFrom}
                                defaultValue={tableData.memoFrom}
                                variant="filled"
                            />

                            <TextField
                                disabled
                                id="outlined-basic2"
                                name="memoTo"
                                label="To"
                                className="formText"
                                onChange={(e) => setMemoTo(e.target.value)}
                                // value={memoTo}
                                defaultValue={tableData.memoTo}
                                variant="filled"
                            />
                            <TextField
                                disabled
                                id="outlined-basic3"
                                name="memoTitle"
                                label="Title"
                                className="formText"
                                onChange={(e) => setMemoTitle(e.target.value)}
                                //value={memoTitle}
                                multiline
                                rows={6}
                                defaultValue={tableData.memoTitle}
                                variant="filled"
                            />
                            <TextField
                                id="outlined-basic4"
                                name="memoRemark"
                                label="Remark"
                                className="formText"
                                onChange={(e) => setMemoRemark(e.target.value)}
                                //value={memoRemark}
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
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditMemoModal;
