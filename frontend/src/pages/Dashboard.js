import { useState, useContext /* useEffect */ } from "react";
import { Grid, Paper, Typography, Box, Tab, Tabs } from "@material-ui/core";
// import axios from "axios";

import AddMemo from "./AddMemo";
import Memolist from "./Memolist";
import ResolvedMemolist from "./ResolvedMemolist";
import { UserContext } from "../UserContext";

const Dashboard = () => {
    const user = useContext(UserContext);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const paperStyle = {
        width: 1200,
        height: "90vh",
        margin: "0 auto",
    }; /* , alignItems: "center" */
    // const alignItemsStyle={alignItems: "center"}

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    ////////////////////////// FROM MEMOLIST ///////////////////////////
    /* 
    
    const getData = async () => {
        const endpoint = "http://localhost:8000/newMemo/memo";
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };

        const response = await axios.get(endpoint, config); // , memo

        console.log(response.data);
        // console.log(response);
        // setTableData(response.data);
    };

    useEffect(() => {
        getData();

        // setSatusStatus(response.data.select);
    }, []); 
    
    */
    ///////////////////////////////////////////////////////////////////

    return (
        <Grid container>
            <Grid item xs={12} sm={12}>
                <Paper style={paperStyle}>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Memo List" />
                        <Tab label="Add New Memo" />
                        <Tab label="Item 3" />
                        <Tab label="Resolved Memo" />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <Memolist doHandleChange={handleChange} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <AddMemo doHandleChange={handleChange} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item 3
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ResolvedMemolist />
                    </TabPanel>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
