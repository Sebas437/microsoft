import logo from './logo.svg';
import "./App.css";
import { config } from './Config';
import {PublicClientApplication} from "@azure/msal-browser"
import {Component} from "react"

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error:null,
      isAuthenticated:false,
      user:{}
    };
    this.login =this.login.bind(this)
    //inicialize the MSAL application object
    this.PublicClientApplication = new PublicClientApplication({
      auth:{
        clientId: config.appId,
        redirectUri: config.redirectUri,
        authority: config.authority
      },
      cache:{
        cacheLocation:"sessionStorage",
        storeAuthStateInCookie: true
      }
    });
    }
    async login (){
      try {
        await this.PublicClientApplication.loginPopup(
          {
            scopes: config.scopes,
            prompt:"select_account"
          }
        );
        this.setState({isAuthenticated:true})

      } catch (err) {
        
        this.setState({
          isAuthenticated: false,
          user: {},
          error: err

        });
      }
    }

    logout(){
      this.PublicClientApplication.logout();
    }


    render(){
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {
              this.state.isAuthenticated ? <p>
                success message
              </p> :
              <p>
                <button onClick={() => this.login()}>Login In</button>
              </p>
            }
          </header>
        </div>
      )
    }
    }
  
    export default App