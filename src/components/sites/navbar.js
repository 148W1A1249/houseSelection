import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png"
const NavbarComponent =()=>{
    return<>
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <Link className="navbar-brand" to="/">
            <img src={logo} width="30" height="30" className="d-inline-block align-top mr-2" alt=""/>
            House Search
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto mr-5">
            <Link to="/" className="nav-item nav-link active">Home <span className="sr-only">(current)</span></Link>
            <Link to="/chekHouse" className="nav-item nav-link">Best House</Link>
            </div>
        </div>
        </nav>
    </>
}

export default NavbarComponent;