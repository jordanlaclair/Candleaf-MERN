import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";
import { Auth0Provider } from "@auth0/auth0-react";
import { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

let domain: string;
let clientID: string;
if (
	process.env.REACT_APP_AUTH0_DOMAIN &&
	process.env.REACT_APP_AUTH0_CLIENT_ID
) {
	domain = process.env.REACT_APP_AUTH0_DOMAIN;
	clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
} else {
	throw new Error("Client ID or Domain variables are not set");
}

ReactDOM.render(
	<React.StrictMode>
		<Auth0Provider
			domain={domain}
			clientId={clientID}
			redirectUri={window.location.origin}
		>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<App />
				</PersistGate>
			</Provider>
		</Auth0Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
