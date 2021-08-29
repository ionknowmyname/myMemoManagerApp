import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Redirect,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { UserContext } from "./UserContext";

const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <UserContext.Provider value="testing context">
                        <Route path="/" exact component={Login} />
                        {/* <Login /> */}

                        <Route path="/memo/signup" exact component={Signup}>
                            <Signup />
                        </Route>

                        <Route path="/memo/login" exact component={Login}>
                            <Login />
                        </Route>

                        <Route path="/dashboard" exact component={Dashboard}>
                            <Dashboard />
                        </Route>
                    </UserContext.Provider>
                </Switch>
            </Router>
        </div>
    );
};

export default Routes;
