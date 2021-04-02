import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/style.css";

import Routing from "./Router";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvaider } from "../contexts/authContext";

const client = new QueryClient();

function App() {
	return (
		<>
			<AuthContextProvaider>
				<QueryClientProvider client={client}>
					<Router>
						<Routing />
					</Router>
				</QueryClientProvider>
			</AuthContextProvaider>
		</>
	);
}

export default App;
