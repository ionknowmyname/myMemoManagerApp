import { useState } from "react";
import { Grid, Paper, Typography, Box, Tab, Tabs } from "@material-ui/core";

import AddMemo from "./AddMemo";
import Memolist from "./Memolist";

const Dashboard = () => {
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
                        <Tab label="Item 4" />
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
                        Item 4
                    </TabPanel>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
