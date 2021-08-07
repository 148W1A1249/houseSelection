import './App.css';
import SitesContainer from './components/sites/sites';
import BestHouse from './components/bestHouse/bestHouse';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

function App() {
  return <>
   <Router>
     <Switch>
       <Route path="/" component={SitesContainer} exact={true} />
       <Route path="/chekHouse" component={BestHouse} exact={true} />
     </Switch>
   </Router>
  </>
}

export default App;