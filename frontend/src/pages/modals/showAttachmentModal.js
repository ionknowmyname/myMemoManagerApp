import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";

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
        transform: `translate(-50%, -50%)` /* left, up */,
    },
    closeImg: {
        cursor: "pointer",
        float: "right",
        margin: "20px 20px 20px 0",
        width: "50px",
    },
    forSpan: {
        alignContent: "center",
        alignItems: "center",
    },
});

const ShowAttachmentModal = ({ show, onClose, dataFromDB }) => {
    // const location = useLocation();
    const [tableData, setTableData] = useState({
        path: "",
    });

    useEffect(() => {
        setTableData(dataFromDB);
    }, [dataFromDB]);

    const classes = useStyles();

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

                    <div className="responsive-container">
                        {tableData.path ? (
                            <img src={tableData.path} alt="" />
                        ) : (
                            <span /* style={classes.forSpan} */>
                                Cannot get location of Image
                            </span>
                        )}
                        {/* <span>Path is: {location.pathname}</span>
                        location.pathname is '/users/new' */}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ShowAttachmentModal;
