import React from "react";
import { Route, Redirect } from "react-router-dom";
interface PropTypes {
	isAuth: boolean;
	component: any;
	path: string;
	exact: boolean;
}
const ProtectedRoute = ({
	isAuth,
	component: Component,
	...rest
}: PropTypes) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuth) {
					return <Component />;
				} else {
					return (
						<Redirect
							exact
							to={{ pathname: "/", state: { from: props.location } }}
						/>
					);
				}
			}}
		/>
	);
};

export default ProtectedRoute;
