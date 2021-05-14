import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Redirect,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Login}>
                        <Login />
                    </Route>

                    <Route path="/memo/signup" exact component={Signup}>
                        <Signup />
                    </Route>

                    <Route path="/memo/login" exact component={Login}>
                        <Login />
                    </Route>

                    <Route path="/dashboard" exact component={Dashboard}>
                        <Dashboard />
                    </Route>

                    {/*
                    <Route path="/logout" exact component={Logout}>
                        <Logout />
                    </Route> */}
                    {/* <Redirect to="/" />{" "} */}
                    {/* to redirect any other route to home */}
                </Switch>
            </Router>
        </div>
    );
};

export default Routes;
