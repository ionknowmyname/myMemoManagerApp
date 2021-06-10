import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import moment from "moment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import AttachmentIcon from "@material-ui/icons/Attachment";

import ViewDetailsModal from "./modals/ViewDetailsModal";
import EditMemoModal from "./modals/EditMemoModal";
import ShowAttachmentModal from "./modals/ShowAttachmentModal";

const Memolist = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tableData, setTableData] = useState([]); // all data
    const [singleData, setSingleData] = useState({}); // for view,edit,picture modals
    const [singleDataFromDB, setSingleDataFromDB] = useState({}); // for edit data from DB

    const [statusStatus, setStatusStatus] = useState([]);

    const [viewModalShow, setViewModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [pictureModalShow, setPictureModalShow] = useState(false);
    ///////////////////////////////////////////////////////

    const getData = async () => {
        const endpoint = "http://localhost:8000/newMemo/memo";

        const config = {
            headers: {
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
        };

        // if token, add to header
        /* if (props.token) {
            config.headers["x-auth-token"] = props.token;
        } */

        /* const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"), // x-auth-token
            },
        }; */

        const response = await axios.get(endpoint, config); // , memo

        console.log(response.data);
        // console.log(response);
        setTableData(response.data);

        tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

        ////
        /* if (response.data.select === "PENDING") {
            setSatusStatus("PENDING");
        } */

        //tableData.map((dataSelect) => console.log(dataSelect.select));

        //setStatusStatus(response.data.select);
        //console.log("statusStatus: ", statusStatus);
    };

    useEffect(() => {
        getData();

        // setSatusStatus(response.data.select);
    }, []);

    /* 
    const toggleModal = () => {
        if (!modalShow) {
            setModalShow(true);
            console.log("toggleModal: ", modalShow);
        } else {
            setModalShow(false);
        }
    };

    useEffect(() => {
        toggleModal();

        console.log("check new useEffect on modalshow");
    }, []); 
    */

    //////////////// VIEW MODAL REGION ////////////////////////
    //#region

    const ViewModal = (id, index) => {
        /* 
            Method: select by id from the front and pass as 
            props into the View modal; no need for backend 
        */

        console.log("view modal id: ", id);
        //toggleModal();

        const singleMemo = tableData.find((data) => data._id === id);
        const index1 = tableData.indexOf(singleMemo);
        const selectedMemo = tableData[index1];
        console.log("selected memo: ", selectedMemo);
        selectedMemo.index = index + 1; // adds index to the selectedMemo object

        setSingleData(selectedMemo);

        // console.log("From ViewModal function: ", singleData);

        setViewModalShow((prev) => !prev);
        console.log("clicked the eyes");
        console.log("set modal with prev for view: ", viewModalShow);
    };

    //#endregion
    ///////////////////////////////////////////////////////////

    //////////////// EDIT MODAL REGION ////////////////////////
    //#region

    const EditModal = (id) => {
        /* 
            Method 1: select id from the front and post id to the backend, 
            match id at backend and retrieve data and send to frontend,
            set data to state, then pass as props to Edit modal
            ______________________________________________________________

            Method 2: select by id from the front and pass as 
            props into the Edit modal, no need for backend 
            ______________________________________________________________

            Method 1 is harder, for practice, method 2 already working
        */

        console.log("edit modal id: ", id);
        const endpoint = "http://localhost:8000/newMemo/queryMemo";
        const config = {
            // mode: "no-cors",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        };
        const queryId = id;
        axios
            .post(endpoint, { _id: queryId }, config)
            .then((res) => {
                console.log(res);
                setSingleDataFromDB(res.data);

                console.log("singleDataFromDB: ", singleDataFromDB);
                setEditModalShow((prev) => !prev);
                console.log("clicked the pencil");
            })
            .catch((err) => console.log(err));

        // await the memo

        //////////////////   Method 2 START /////////////////////////
        /* const singleMemo = tableData.find((data) => data._id === id);
        const index1 = tableData.indexOf(singleMemo);
        const selectedMemo = tableData[index1];
        console.log("selected memo: ", selectedMemo); 
        setSingleData(selectedMemo);
        */

        /*   WORKING PART
        tableData.map((data) => data._id === id && setSingleData(data));

        setEditModalShow((prev) => !prev);
        console.log("clicked the pencil");
        console.log("set modal with prev for edit: ", editModalShow);

        */
        ////////////////////// METHOD 2 END //////////////////////////////
    };

    //#endregion
    ///////////////////////////////////////////////////////////

    //////////////// VIEW PICTURE MODAL REGION ////////////////
    //#region

    const PictureModal = (id) => {
        // alert(tdata._id);
        console.log("picture modal id: ", id);

        tableData.map((data) => data._id === id && setSingleData(data));

        setPictureModalShow((prev) => !prev);
        console.log("clicked the attachment");
        console.log("set modal with prev for picture: ", pictureModalShow);
    };

    //#endregion
    ///////////////////////////////////////////////////////////

    /////////////////// FROM TEMPLATE ///////////////////////////
    //#region
    const columns = [
        { id: "M/No", label: "M/No", minWidth: 50 },
        { id: "title", label: "Title", minWidth: 100 },
        {
            id: "from",
            label: "From",
            minWidth: 100,
            align: "left",
            //format: (value) => value.toLocaleString("en-US"),
        },
        { id: "to", label: "To", minWidth: 100 },
        { id: "date", label: "Date" },
        { id: "loggedDate", label: "Logged date" },
        { id: "status", label: "Status", maxWidth: 30 },
        {
            id: "action",
            label: "Action",
            maxWidth: 50,
            align: "left",
        },
    ];

    const useStyles = makeStyles({
        root: {
            width: "100%",
        },
        container: {
            maxHeight: 640,
        },
    });

    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    //#endregion
    //////////////////////////////////////////////////////////

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    // align={column.align}
                                    // style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((tdata, index) => (
                            <TableRow key={tdata._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{tdata.memoTitle}</TableCell>
                                <TableCell>{tdata.memoFrom}</TableCell>
                                <TableCell>{tdata.memoTo}</TableCell>
                                <TableCell>
                                    {moment(tdata.createdAt).format(
                                        "DD MMM, YYYY"
                                    )}
                                </TableCell>
                                <TableCell>{tdata.loggedDate}</TableCell>
                                <TableCell>
                                    {statusStatus === "URGENT" ? (
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
                                </TableCell>
                                <TableCell>
                                    <Tooltip
                                        title="View details"
                                        placement="left-start"
                                        arrow
                                        interactive
                                    >
                                        <Button
                                            onClick={() => {
                                                ViewModal(tdata._id, index);
                                            }}
                                        >
                                            <span>
                                                <VisibilityIcon color="primary" />
                                            </span>
                                        </Button>
                                    </Tooltip>

                                    <Tooltip
                                        title="Edit memo"
                                        placement="left-start"
                                        arrow
                                        interactive
                                    >
                                        <Button
                                            onClick={() => {
                                                EditModal(tdata._id);
                                            }}
                                        >
                                            <span className="iconTag">
                                                <EditIcon color="primary" />
                                            </span>
                                        </Button>
                                    </Tooltip>

                                    <Tooltip
                                        title="Show attached file"
                                        placement="left-start"
                                        arrow
                                        interactive
                                    >
                                        <Button
                                            onClick={() => {
                                                PictureModal(tdata._id);
                                            }}
                                        >
                                            <span className="iconTag">
                                                <AttachmentIcon color="primary" />
                                            </span>
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />

            {/* /////////////////////////////////////////////////////////////////////////////// */}
            <ViewDetailsModal
                show={viewModalShow}
                onClose={() => setViewModalShow((prev) => !prev)}
                dataFromDB={singleData}
            />

            <EditMemoModal
                show={editModalShow}
                onClose={() => setEditModalShow((prev) => !prev)}
                dataFromDB={singleDataFromDB}
            />

            <ShowAttachmentModal
                show={pictureModalShow}
                onClose={() => setPictureModalShow((prev) => !prev)}
                dataFromDB={singleData}
            />
        </Paper>
    );
};

export default Memolist;
