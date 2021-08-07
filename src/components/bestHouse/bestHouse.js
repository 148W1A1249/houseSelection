import { useEffect, useState } from "react";
import axios from "axios";
import NavbarComponent from "../sites/navbar";
const BestHouse = ()=>{
    const [houseRawData,sethouseRawData] = useState([]);
    const [houseinfo,sethouseinfo] = useState([]);
    const [Data,setData] = useState([]);
    const [SelectHouse,setSelectHouse] = useState("");

    // const [HouseName,setHouseName] = useState("");
    const [LeftSide,setLeftSide] = useState([]);
    const [RightSide,setRightSide] = useState([]);


    const fetchHouseData = async()=>{
        const result = await axios.get("https://607432b1066e7e0017e794b3.mockapi.io/HouseData");
        sethouseRawData(result.data)
    }
    useEffect(()=>{    
        var data = []; 
        var info = [];
        houseRawData.forEach(element=>{
            data.push(...element.LaneSet)
        })
        data.forEach(element=>{
            let housePresent = element.split("-") ;
            if(housePresent[0]==="House"){
                info.push(element)
                sethouseinfo(info);
            }
        })
        setData(data);
    },[houseRawData])
    const BestHouseFind = ()=>{
        Data.find((element,index)=>{
            if(element===SelectHouse){
                let left_side_data = left_side(index-1,Data);
                let right_side_data = right_side(index+1,Data);
                setLeftSide([left_side_data]);
                setRightSide([right_side_data]);
            } 
            return null;
          })
    }
    return<>
     <NavbarComponent/>
    <div className="container mt-3">
        <div className="text-center">
            <button className="btn btn-danger" onClick={fetchHouseData}>get House data</button>            
        </div>

        <div className="card mt-3">
            <div className="card-body">
               <div className="row">
                   <div className="col-md-4">
                        <select className="form-control" value={SelectHouse} onChange={(e)=>{setSelectHouse(e.target.value)}}>
                                <option value="">Select House</option>
                                {
                                    houseinfo.map((obj,i)=>{
                                    return <>
                                        <option value={obj} key={i}>{obj}</option>
                                    </>
                                    })
                                }
                        </select>
                   </div>
                   <div className="col-md-4">
                        <button className="btn btn-danger mt-3 mt-md-0" onClick={BestHouseFind}>Check</button>
                   </div> 
               </div>
            </div>
        </div>
        
        {
            (LeftSide.length>0 && RightSide.length>0) ? <>
             <div className="card mt-4 mb-4" style={{width: "20rem"}}>
                <div className="card-body">
                    <h5 className="card-title text-danger">{SelectHouse}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Check surroundings</h6>
                    <p className="card-text">Our website show True and Perfect content about House. </p>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 border-right mt-3">
                            <h6 className="text-left text-danger">Left Side</h6>
                            <div style={{display:"flex",justifyContent:"space-between"}}><span>Market: </span><span>{(LeftSide[0].Left_Market_Km>=0) ? `${LeftSide[0].Left_Market_Km} km`:`No`}</span></div>
                            <div style={{display:"flex",justifyContent:"space-between"}}><span>Restaurant: </span><span>{(LeftSide[0].left_rest_km>=0) ? `${LeftSide[0].left_rest_km} km`:`No`}</span></div>
                            <div style={{display:"flex",justifyContent:"space-between"}}><span>Parking: </span><span>{(LeftSide[0].Left_Parking_Km>=0) ? `${LeftSide[0].Left_Parking_Km} km`:`No`}</span></div>
                            <div style={{display:"flex",justifyContent:"space-between"}}><span>Cafe: </span><span>{(LeftSide[0].left_teaShop_km>=0) ? `${LeftSide[0].left_teaShop_km} km`:`No`}</span></div>
                            <div style={{display:"flex",justifyContent:"space-between"}}><span>Gym: </span><span>{(LeftSide[0].left_Gym_km>=0) ? `${LeftSide[0].left_Gym_km} km`:`No`}</span></div>
                        </div>
                        <div className="col-lg-6 col-md-6 mt-3">
                        <h6 className="text-left text-danger">Right Side</h6>
                        <div style={{display:"flex",justifyContent:"space-between"}}><span>Market: </span><span>{(RightSide[0].right_Market_Km>=0) ? `${RightSide[0].right_Market_Km} km`:`No`}</span></div>
                            <div style={{display:"flex",justifyContent:"space-between"}}><span>Restaurant: </span><span>{(RightSide[0].right_rest_km>=0) ? `${RightSide[0].right_rest_km} km`:`No`}</span></div>
                            <div style={{display:"flex",justifyContent:"space-between"}}><span>Parking: </span><span>{(RightSide[0].right_Parking_Km>=0) ? `${RightSide[0].right_Parking_Km} km`:`No`}</span></div>
                            <div style={{display:"flex",justifyContent:"space-between"}}><span>Cafe: </span><span>{(RightSide[0].right_teaShop_km>=0) ? `${RightSide[0].right_teaShop_km} km`:`No`}</span></div>
                            <div style={{display:"flex",justifyContent:"space-between"}}><span>Gym: </span><span>{(RightSide[0].right_Gym_km>=0) ? `${RightSide[0].right_Gym_km} km`:`No`}</span></div>
                        </div>
                    </div>
                    <div className="text-left mt-3 text-danger font-weight-bolder">
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <span>Total Radius: </span>
                        <span>
                            {
                            ((LeftSide[0].left_Market_Km>0) ? LeftSide[0].left_Market_Km : 0) + 
                            ((LeftSide[0].left_rest_km>0) ?  LeftSide[0].left_rest_km : 0) + 
                            ((LeftSide[0].left_Parking_Km>0) ? LeftSide[0].left_Parking_Km : 0) + 
                            ((LeftSide[0].left_teaShop_km>0) ? LeftSide[0].left_teaShop_km : 0) + 
                            ((LeftSide[0].left_Gym_km>0) ? LeftSide[0].left_Gym_km : 0)+
                            ((RightSide[0].right_Market_Km>0) ? RightSide[0].right_Market_Km : 0) + 
                            ((RightSide[0].right_rest_km>0) ?  RightSide[0].right_rest_km : 0) + 
                            ((RightSide[0].right_Parking_Km>0) ? RightSide[0].right_Parking_Km : 0) + 
                            ((RightSide[0].right_teaShop_km>0) ? RightSide[0].right_teaShop_km : 0) + 
                            ((RightSide[0].right_Gym_km>0) ? RightSide[0].right_Gym_km : 0)
                            } km
                        </span>
                    </div>
                    </div>
                </div>
            </div>
            </> : null
        }
       
    </div>
    </>
}

export default BestHouse;

function left_side(left_index,Data){
    let Left_parking_count = 0
    let Left_Market_count = 0
    let Left_rest_count = 0
    let Left_Gym_count = 0
    let Left_teaShop_count = 0
    
    let Left_site_count = 0
    
    let Left_Parking_Km = -1;
    let Left_Market_Km = -1;
    let left_rest_km = -1;
    let left_Gym_km = -1;
    let left_teaShop_km = -1;
    
    for(let i=left_index;i>=0;i--){
        if(Data[i]==="Tea shop"){
            Left_teaShop_count++;
            const km = left_index - i + 1;
            if(left_teaShop_km===-1){
                left_teaShop_km = km;
            }
            left_teaShop_km = Math.min(left_teaShop_km,km)
            if(Left_teaShop_count>0&&Left_teaShop_count<2){
               if(Left_site_count<6){
                    Left_site_count++;
               }
            }
        }
        if(Data[i]==="Gym"){
            Left_Gym_count++;
            const km = left_index - i + 1;
            if(left_Gym_km===-1){
                left_Gym_km = km;
            }
            left_Gym_km = Math.min(left_Gym_km,km)
            if(Left_Gym_count>0&&Left_Gym_count<2){
               if(Left_site_count<6){
                    Left_site_count++;
               }
            }
        }
        
        if(Data[i]==="Restaurant"){
            Left_rest_count++;
            const km = left_index - i + 1;
            if(left_rest_km === -1){
                left_rest_km = km;
            }
            left_rest_km = Math.min(left_rest_km,km)
            if(Left_rest_count>0&&Left_rest_count<2){
               if(Left_site_count<6){
                    Left_site_count++;
               }
            }
        }
        
        if(Data[i]==="Parking"){
            Left_parking_count++;
            const km = left_index - i + 1;
            if(Left_Parking_Km===-1){
                Left_Parking_Km = km;
            }
            Left_Parking_Km = Math.min(Left_Parking_Km,km)
            if(Left_parking_count>0&&Left_parking_count<2){
               if(Left_site_count<6){
                    Left_site_count++;
               }
            }
        }
        if(Data[i]==="Market"){
            Left_Market_count++;
            const km = left_index - i + 1;
            if(Left_Market_Km === -1){
                Left_Market_Km = km;
            }
            Left_Market_Km = Math.min(Left_Market_Km,km)
            if(Left_Market_count>0&&Left_Market_count<2){
              if(Left_site_count<6){
                    Left_site_count++;
              }
            }
        }
        
        
        if(Left_site_count>=5){
            break;
        }
    }
    let data = {
                    Left_site_count,
                    left_rest_km,
                    Left_Parking_Km,
                    Left_Market_Km,
                    left_Gym_km,
                    left_teaShop_km
                }
    return data;
}
function right_side(right_index,Data){
    let right_parking_count = 0
    let right_Market_count = 0
    let right_rest_count = 0
    let right_Gym_count = 0
    let right_teaShop_count = 0
    
    let right_site_count = 0
    
    let right_Parking_Km = -1;
    let right_Market_Km = -1;
    let right_rest_km = -1;
    let right_Gym_km = -1;
    let right_teaShop_km = -1;
    
    for(let i=right_index;i<Data.length;i++){
        if(Data[i]==="Tea shop"){
            right_teaShop_count++;
            const km = i - right_index +1;
            if(right_teaShop_km===-1){
                right_teaShop_km = km;
            }
            right_teaShop_km = Math.min(right_teaShop_km,km)
            if(right_teaShop_count>0&&right_teaShop_count<2){
               if(right_site_count<6){
                    right_site_count++;
               }
            }
        }
        if(Data[i]==="Gym"){
            right_Gym_count++;
            const km = i - right_index +1;
            if(right_Gym_km===-1){
                right_Gym_km = km;
            }
            right_Gym_km = Math.min(right_Gym_km,km)
            if(right_Gym_count>0&&right_Gym_count<2){
               if(right_site_count<6){
                    right_site_count++;
               }
            }
        }
        
        if(Data[i]==="Restaurant"){
            right_rest_count++;
            const km = i - right_index +1;
            if(right_rest_km===-1){
                right_rest_km = km;
            }
            right_rest_km = Math.min(right_rest_km,km)
            if(right_rest_count>0&&right_rest_count<2){
               if(right_site_count<6){
                    right_site_count++;
               }
            }
        }
        
        if(Data[i]==="Parking"){
            right_parking_count++;
            const km = i - right_index +1;
            if(right_Parking_Km===-1){
                right_Parking_Km = km;
            }
            right_Parking_Km = Math.min(right_Parking_Km,km)
            if(right_parking_count>0&&right_parking_count<2){
               if(right_site_count<6){
                    right_site_count++;
               }
            }
        }
        if(Data[i]==="Market"){
            right_Market_count++;
            const km = i - right_index +1;
            if(right_Market_Km === -1){
                right_Market_Km = km;
            }
            right_Market_Km = Math.min(right_Market_Km,km)
            if(right_Market_count>0&&right_Market_count<2){
              if(right_site_count<6){
                    right_site_count++;
              }
            }
        }
        
        
        if(right_site_count>=5){
            break;
        }
    }
    let data = {
                    right_site_count,
                    right_rest_km,
                    right_Parking_Km,
                    right_Market_Km,
                    right_Gym_km,
                    right_teaShop_km
                }
    return data;
}