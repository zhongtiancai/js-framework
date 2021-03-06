import {Route,withRouter,Redirect} from 'react-router-dom'
import React from 'react'
const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const AuthButton = withRouter(
    ({ history }) =>
        fakeAuth.isAuthenticated ? (
            <p>
                Welcome!{" "}
                <button
                    onClick={() => {
                        fakeAuth.signout(() => history.push("/"));
                    }}
                >
                    Sign out
                </button>
            </p>
        ) : (
            <p>You are not logged in.</p>
        )
);

class PrivateRoute extends React.Component{
    render() {
        const {component: Component, ...rest} = this.props
        debugger;
        return (
            <Route
                {...rest}
                render={props =>
                    fakeAuth.isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to="/login"
                        />
                    )
                }
            />
        );
    }
}

export {fakeAuth,AuthButton,PrivateRoute}