import React from 'react';
import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Workshop=()=>{
   const [newUser,setNewUser]=useState({ 
      Name_of_the_Faculty:"", 
      Designation:"", 
      Nature_of_the_Program:"", 
      Title_of_the_Program:"", 
      Duration_From:"", 
      Duration_To:"", 
      Participation:"", 
      Name_of_the_Organization_and_Place:"", 
      Location_of_Organization:"", 
      Amount_Provided_by_the_HEI:"", 
      Certificates_pdf:""
   })
   console.log(newUser)
const navigate = useNavigate()
const handleChange=(e)=>{
   setNewUser((prev)=>({...prev,[e.target.name]:e.target.value}))
}

const handleClick = async e=>{
   e.preventDefault()
   console.log("Hi")
   try{
      await axios.post("http://localhost:2005/new",newUser)
      navigate("/")
   }catch(err){
      console.log(err)
   }
}

    return(
        <>
        <div className="report-container" style={{justifyContent:'center'}}>
          <div class="report-header">
            <h1 class="recent-Articles">WORKSHOP</h1>
          </div>
          <div className="row justify-content-center"style={{justifyContent:'center'}}>
            <div className="form-group">
              <label>Name of the Faculty</label>
              <input type="text" placeholder="Enter Your Name" required onChange={handleChange} name="Name_of_the_Faculty" />
            </div>

            <div className="form-group">
               <label>Designation</label>
               <input type="text" placeholder="Enter Your Designation" required onChange={handleChange} name="Designation"/>
            </div>

            <div className="form-group">
              <label>Nature of the Program</label>
              <select name="Nature_of_the_Program" className="form-select" required onChange={handleChange}>
                <option value="">Select Program Name</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="FDP">FDP</option>
                <option value="SDP">SDP</option>
                <option value="STTP">STTP</option>
                <option value="Webinar">Webinar</option>
              </select>
            </div>

            <div className="form-group">
               <label>Title of the Program</label>
               <input type="text" placeholder="Program Title" required onChange={handleChange} name="Title_of_the_Program"/>
            </div>

            <div className="form-group">
               <label>Duration From</label>
               <input type="date" required onChange={handleChange} name="Duration_From"/>
            </div>

            <div className="form-group">
               <label>Duration To</label>
               <input type="date" required onChange={handleChange} name="Duration_To"/>
            </div>

            <div className="form-group">
              <label>Participation</label>
              <select name="Participation" className="form-select" required onChange={handleChange}>
                <option value="">Select Participation...</option>
                <option value="Internal">Internal</option>
                <option value="External">External</option>
              </select>
            </div>

            <div className="form-group">
               <label>Name of the Organization and Place</label>
               <input type="text" placeholder="Enter Respective Name" required onChange={handleChange} name="Name_of_the_Organization_and_Place"/>
            </div>

            <div className="form-group">
               <label>Location of Organization</label>
               <input type="text" placeholder="Enter Your Location" required onChange={handleChange} name="Location_of_Organization"/>
            </div>

            <div className="form-group">
               <label>Amount Provided by the HEI</label>
               <input type="text" placeholder="Enter the Amount" required onChange={handleChange} name="Amount_Provided_by_the_HEI"/>
            </div>

            <div className="form-group">
               <label>Certificates-pdf</label>
               <input type="file" name="Certificates_pdf" id='fileInput' accept='.png,.jpg,.jpge,.pdf'  onChange={handleChange}/>
            </div>

            <button type='submit' className='btn' onClick={handleClick}>Register</button>
         </div>
         </div>
        </>
    )
}
export default Workshop;