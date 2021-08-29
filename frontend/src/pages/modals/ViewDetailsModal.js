// import { Modal, Button } from "react-bootstrap";

import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
// import Fade from "@material-ui/core/Fade";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import moment from "moment";

import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import PrintIcon from "@material-ui/icons/Print";

import axios from "axios";

const useStyles = makeStyles({
    root: {
        margin: 0,
        background: "#fff",
        position: "absolute",
        top: "50%",
        left: "50%",
        // marginRight: '-50%',
        width: "70%",
        height: "80vh",
        transform: `translate(-50%, -38%)` /* left, up */,
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
        height: "50px",
        margin: "auto",
        top: "100px",
        background: "#F2F2F2",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    tables: {
        margin: "auto",
        width: "95%",
        borderSpacing: "0",
        borderCollapse: "collapse",
    },

    spaces: {
        width: "95%",
        height: "60px",
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
});

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

const ViewDetailsModal = ({ show, onClose, dataFromDB }) => {
    //const [open, setOpen] = useState(false);
    const [tableData, setTableData] = useState({
        _id: "",
        memoTitle: "",
        memoFrom: "",
        memoTo: "",
        loggedDate: "",
        memoRemark: "",
        select: "",
        index: "",
    });

    useEffect(() => {
        setTableData(dataFromDB);
    }, [dataFromDB]);

    const resolvedClick = () => {
        window.confirm("Are you sure you want to resolve this memo?");
        // confirm method returns true if user clicks OK

        // use window. coz confirm is a global method & is disabled by eslint
        if (window.confirm) {
            console.log("true");
            onClose();

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const toResolve = {
                ID: tableData._id,
                isResolved: true,
            };

            axios.put(
                "http://localhost:8000/newMemo/resolvedMemo",
                toResolve,
                config
            );
        }
    };

    const reassignClick = () => {
        console.log("dataFromDB: ", dataFromDB);
        console.log("tableData: ", tableData);

        if (localStorage.token) {
            // handleClick();
            localStorage.setItem("modalValues", "treat");
        }
    };

    const classes = useStyles();

    if (!show) return null;
    return (
        //<Modal>
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
                    <Tooltip
                        title="Close"
                        placement="left-start"
                        arrow
                        interactive
                    >
                        <Button
                            disabled
                            className={classes.closeImg}
                            startIcon={<PrintIcon />}
                        ></Button>
                    </Tooltip>

                    <div className={classes.heading}>MEMO DETAILS</div>

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
                        <table className={classes.tables}>
                            <tbody>
                                <tr>
                                    <td>
                                        M/No: <strong>{tableData.index}</strong>
                                    </td>
                                    <td></td>
                                    <td>
                                        Title:{" "}
                                        <strong>{tableData.memoTitle}</strong>
                                    </td>
                                    <td colSpan="3">{}</td>
                                </tr>
                                <tr>
                                    <td>
                                        From:{" "}
                                        <strong>{tableData.memoFrom}</strong>
                                    </td>
                                    <td></td>
                                    <td>
                                        To: <strong>{tableData.memoTo}</strong>
                                    </td>
                                    <td></td>
                                    <td>
                                        Date:{" "}
                                        <strong>{tableData.loggedDate}</strong>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td className="double">
                                        Details:{" "}
                                        <strong>{tableData.memoRemark}</strong>
                                    </td>
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
                                                onClick={resolvedClick}
                                            >
                                                Resolve
                                            </Button>
                                        </div>
                                        <div className={classes.actionBtn}>
                                            <Button
                                                variant="contained"
                                                style={{
                                                    backgroundColor: "#2E87A9",
                                                    color: "#fff",
                                                }}
                                                onClick={reassignClick}
                                            >
                                                Re-assign
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ViewDetailsModal;
