import React, {Component, PropTypes} from 'react';
import ReactLogo from '../images/react.png';
import Kibana from '../components/kibana/Kibana';
import HomePage from './HomePage/HomePage';
import Auth from './user/Auth';
import {Route, Link, Switch} from 'react-router-dom'
import ChartListPage from "./kibana/charts/ChartListPage/ChartListPage";
import IndexType from "./IndexType/IndexType";
// import Discover from "../images/menuIcon/discover.png"
// import Relationship from "../images/menuIcon/relationship.png"
// import Visualize from "../images/menuIcon/visualize.png"

class App extends Component {
    render() {
        let {history} = this.props;
        return (
            <div className="app-index">
                {/*左边导航*/}
                <div className="app-index-left">
                    <div className="user-operation">
                        <div className="logo"><img src={ReactLogo}/></div>
                        <div className="user-name">一清</div>
                        <div className="exit-button" onClick={() => Auth.logout(function (h) {
                            history.push('/login');
                        }, history)}>退出
                        </div>
                    </div>
                    <div className="function-list">
                        <ul>
                            <li><Link to="/app"><span className="discover"/>Discover</Link></li>
                            <li><Link to="/app/visualize"><span className="visualize"/>Visualize</Link></li>
                            <li><Link to="/app/123"><span className="relationship"/>Relationship</Link></li>
                            {/*<li><Link to="/app/234">Change Data</Link></li>*/}
                            {/*<li><Link to="/app/345">About</Link></li>*/}
                        </ul>
                    </div>
                </div>
                {/*右边内容*/}
                <div className="app-index-right">
                    <IndexType/>
                    <Switch>
                        <Route exact path="/app" component={HomePage}/>
                        <Route path="/app/visualize/:type" component={Kibana}/>
                        <Route path="/app/visualize" component={ChartListPage}/>
                        <Route component={Kibana}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App