const express=require("express")
const bodyParser = require("body-parser")
const refexp=require("express")
const refmysql=require("mysql2")
const cors=require('cors')

const app=refexp()
const dbase=refmysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"Aish27",
    "port":"3306",
    "database":"mec_report_management"
})
dbase.connect(()=>{
    console.log("Your Database is Connected!!!")
})
const application= express()
application.use(bodyParser.urlencoded({extended:true}))
application.use(bodyParser.json())
application.use(cors())
application.listen(2005,()=>{
    console.log("Test is Running...")
})
application.get('/fetch',async(req,res)=>{
    const sql="select * from data_setaf_workshop"
    dbase.query(sql,(err,records)=>{
        if(err){
            res.status(404).json({"error":err.message})
            return
        }
        if(records.length==0){
            res.json(201).json({"message":"data not found"})
            return
        }
        res.status(200).json({records})
    })
})

application.post("/new",async(req,res)=>{
    const{Name_of_the_Faculty, Designation, Nature_of_the_Program, Title_of_the_Program, Duration_From, Duration_To, Participation, Name_of_the_Organization_and_Place, Location_of_Organization, Amount_Provided_by_the_HEI, Certificates_pdf}=req.body
    const sql="insert into data_setaf_workshop values(?,?,?,?,?,?,?,?,?,?,?)"
    dbase.query(sql,[Name_of_the_Faculty, Designation, Nature_of_the_Program, Title_of_the_Program, Duration_From, Duration_To, Participation, Name_of_the_Organization_and_Place, Location_of_Organization, Amount_Provided_by_the_HEI, Certificates_pdf],(err,ack)=>{
        if(err){
            res.status(404).json({"error":err.message})
            return
        }
        res.status(200).json({message:"PARTICIPANT ADDED SUCESSFULLY"})
    })
})

application.put("/change/:number",async(req,res)=>{
    const{Name_of_the_Organization_and_Place, Location_of_Organization}=req.body
    const sql="update data_setaf_workshop set Name_of_the_Organization_and_Place=?, Location_of_Organization=? where S_No=?"
    dbase.query(sql,[Name_of_the_Organization_and_Place, Location_of_Organization,req.params.number],(err,ack)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        res.status(200).json({message:"EVENT NAME AND VENUE UPDATED"})

    })
})

application.delete('/delkey/:key',async(req,res)=>{
    const sql="delete from data_setaf_workshop where S_No=?"
    dbase.query(sql,[req.params.key],(err,ack)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(ack.affectedRows==0){
            res.status(404).json({message:"Records not available to delete"})
            return
        }
        res.status(201).json({message:"Records deleted"})
    })
})