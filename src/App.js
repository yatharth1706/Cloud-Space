import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react";
import "bootstrap/dist/css/bootstrap.min.css";

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
    </div>
  );
}

export default withAuthenticator(App);
