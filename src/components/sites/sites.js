import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavbarComponent from "./navbar";

function SitesContainer() {
    const [block1,setblock1] = useState("N");
    const [block2,setblock2] = useState("N");
    const [block3,setblock3] = useState("N");
    const [block4,setblock4] = useState("N");
    const [block5,setblock5] = useState("N");
    const [data,setdata] = useState([]);
    var sites =["House","Restaurant","Market","Parking","Tea Shop","GYM"];
    // var houseId=5;

    useEffect(()=>{
        async function fetchHouseData(){
            const result = await axios.get("https://607432b1066e7e0017e794b3.mockapi.io/HouseData");
            setdata([...result.data]);            
        }
        fetchHouseData();
    },[]);
    
    const SubmitBlockDetails = (e)=>{
        e.preventDefault();
        let count=0;
        
        data.forEach(element=>{
            element.LaneSet.forEach(obj=>{
                let housePresent = obj.split("-");
                if(housePresent[0]==="House"){
                    count++;
                }
            })
        })
        let b1 = block1;
        let b2 = block2;
        let b3 = block3;
        let b4 = block4;
        let b5 = block5;
        if(b1==="House"){ 
            count = count + 1 ;        
            b1 = block1+"-"+count;
        }
        if(b2==="House"){ 
            count = count + 1 ;          
            b2 = block2+"-"+count;
        }
        if(b3==="House"){  
            count = count + 1 ;         
            b3 = block3+"-"+count;
        }
        if(b4==="House"){ 
            count = count + 1 ;          
            b4 = block4+"-"+count;
        }
        if(b5==="House"){ 
            count = count + 1 ;          
            b5 = block5+"-"+count;
        }
        const blockData = [b1,b2,b3,b4,b5];
        axios({
            method: 'post',
            url: 'https://607432b1066e7e0017e794b3.mockapi.io/HouseData',
            data: {
                LaneSet: blockData
            }
          })
          .then(response => {
            window.location.reload();
          })          
          
    }
  return <>
  <NavbarComponent/>
    
    <div className="container">
        <div className="card mt-5">
            <div className="card-body">
            <h3 className="text-center text-danger"><u>Select Site Name</u></h3>
                <form>
                <div className="row mt-5">
                    <div className="col-lg-2 m-2">
                    <select className="form-control" value={block1} onChange={(e)=>{setblock1(e.target.value)}}>
                        <option value="">Select site name</option>
                        {
                            sites.map((obj,i)=>{
                            return <>
                                <option value={obj} key={i}>{obj}</option>
                            </>
                            })
                        }
                    </select>
                    </div>  
                    <div className="col-lg-2 m-2">
                    <select className="form-control" value={block2} onChange={(e)=>{setblock2(e.target.value)}}>
                        <option value="">Select site name</option>
                        {
                            sites.map((obj,i)=>{
                            return <>
                                <option value={obj} key={i}>{obj}</option>
                            </>
                            })
                        }
                    </select>
                    </div> 
                    <div className="col-lg-2 m-2">
                    <select className="form-control" value={block3} onChange={(e)=>{setblock3(e.target.value)}}>
                        <option value="">Select site name</option>
                        {
                            sites.map((obj,i)=>{
                            return <>
                                <option value={obj} key={i}>{obj}</option>
                            </>
                            })
                        }
                    </select>
                    </div> 
                    <div className="col-lg-2 m-2">
                    <select className="form-control" value={block4} onChange={(e)=>{setblock4(e.target.value)}}>
                        <option value="">Select site name</option>
                        {
                            sites.map((obj,i)=>{
                            return <>
                                <option value={obj} key={i}>{obj}</option>
                            </>
                            })
                        }
                    </select>
                    </div> 
                    <div className="col-lg-2 m-2">
                    <select className="form-control" value={block5} onChange={(e)=>{setblock5(e.target.value)}}>
                        <option value="">Select site name</option>
                        {
                            sites.map((obj,i)=>{
                            return <>
                                <option value={obj} key={i}>{obj}</option>
                            </>
                            })
                        }
                    </select>
                    </div>   
                    <div className="mt-2 ml-2">
                        <button className="btn btn-danger" onClick={SubmitBlockDetails}>Add</button>
                    </div>        
                </div>            
                </form>
                <h6 className="card-subtitle text-muted mt-3 ml-2">Note: For every line there have 5 blocks please select a site name for each block. If there is no site please leave it as a black.</h6>
            </div>
            
        </div>
    </div>

    <div className="container mt-3 text-right">
    <Link to="/chekHouse" className="btn btn-danger">check for best house</Link>
    </div>

    <div className="container mt-3">
        <h3 className="text-center text-danger mb-3"><u>House Recommendation Table</u></h3>
        <div  style={{overflowX:"auto"}}>
            <table className="table table-dark">
                <thead>
                    <tr>
                    <th scope="col">Lane ID</th>
                    <th scope="col">Block1</th>
                    <th scope="col">Block2</th>
                    <th scope="col">Block3</th>
                    <th scope="col">Block4</th>
                    <th scope="col">Block5</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((obj)=>{
                            return <tr>
                            <td>{obj.id}</td>
                            <td>{obj.LaneSet[0]}</td>
                            <td>{obj.LaneSet[1]}</td>
                            <td>{obj.LaneSet[2]}</td>
                            <td>{obj.LaneSet[3]}</td>
                            <td>{obj.LaneSet[4]}</td>
                        </tr>
                        })
                    }
                </tbody>
            </table>  
        </div>
    </div>
  </>
}

export default SitesContainer;