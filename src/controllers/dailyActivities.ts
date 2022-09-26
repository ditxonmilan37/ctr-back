import { Request, Response } from "express";
import { connect } from "../routes/database";
import xml from 'xml';


import { postActivities } from "../interface/dailyActivities";

export const setActivities = async (req: Request, res: Response) => {
    const conn = await connect();

    const dataObj = req.body;

    dataObj.activities.map((item: any) => {


        let dateNew = String(dataObj.date).substring(0, 3);
        let dateReg;
        //console.log(dateNew)
        if (dateNew == "Hoy") {
            dateReg = String(dataObj.date).substring(5);
        } else if (dateNew == "Aye") {
            dateReg = String(dataObj.date).substring(6);
        } else {
            dateReg = dataObj.date
        }



        //console.log(dateReg);

        let SqlString = "SELECT * FROM ctr_daily_activities cda WHERE cda.code = ? AND cda.title = ? AND cda.description = ? AND cda.date= ?";

        conn.query(SqlString, [dataObj.code, item.title, item.description, dateReg], (err, rows, fields) => {

            if (!err) {
                //console.log(rows)
                //console.log(JSON.stringify(rows).length)
                if (JSON.stringify(rows).length > 2) {

                    let SqlString = "UPDATE ctr_daily_activities cda SET cda.dedication = ?  WHERE cda.code = ? AND cda.title = ? AND cda.description = ? AND cda.date= ?";

                    conn.query(SqlString, [item.dedication, dataObj.code, item.title, item.description, dateReg], (err, rows, fields) => {
                        if (!err) {
                            //console.log(rows)
                        } else {
                            //console.log(err)
                        }
                    })
                } else {
                    if (item.dedication != '00:00') {
                        let SqlString = "INSERT INTO ctr_daily_activities (people, email, code, title, description, dedication, date, status, created_at, updated_at) values (?,?,?,?,?,?,?,?,?,?)";

                        conn.query(SqlString, [dataObj.people, dataObj.email, dataObj.code, item.title, item.description, item.dedication, dateReg, 1, new Date().toISOString().slice(0, 10), new Date().toISOString().slice(0, 10)], (err, rows, fields) => {
                            if (!err) {
                                //console.log(rows)
                            } else {
                                //console.log(err)
                            }
                        })
                    }
                }

            } else {

            }
        })




    })

    setTimeout(() => {
        res.json({
            status: 200,
            statusBol: true,
            msg: "Actividades ingresadas",

        });
        conn.end();
    }, 3000)


}


export const getActivitiesAll = async (req: Request, res: Response) => {
    const conn = await connect();

    let SqlString = "SELECT * FROM view_ctr_daily_activities_all_list";

    conn.query(SqlString, (err, rows, fields) => {
        if (!err) {
            res.json({
                status: 200,
                statusBol: true,
                msg: "Lista de actividades completa",
                data: rows
    
            });
            conn.end();
            
        } else {
            res.json({
                status: 400,
                statusBol: false,
                //msg: "Lista de actividades completa",
                error: err
    
            });
            conn.end();
            
        }
    })
    
   


}


export const getActivitiesAllExcel = async (req: Request, res: Response) => {
    const conn = await connect();

    let SqlString = "SELECT * FROM view_ctr_daily_activities_all_list";

    conn.query(SqlString, (err, rows, fields) => {
        if (!err) {
            let data = `<?xml version="1.0" encoding="UTF-8"?>`;
            data += `<registers>`;
          

            JSON.parse(JSON.stringify(rows)).map((item) =>{

                data += `<item> 
                <id>${item.id}</id>
                <people>${item.people}</people>
                <email>${item.email}</email>
                <code>${item.code}</code>
                <title>${item.title}</title>
                <description>${item.description}</description>
                <dedication>${item.dedication}</dedication>
                <date>${item.date}</date>
                <status>${item.status}</status>
                <created_at>${item.created_at}</created_at>
                <updated_at>${item.updated_at}</updated_at>
             </item>`;
            })

            
          
            data += `</registers>`;
          
            res.header("Content-Type", "application/xml");
            res.status(200).send(data);
            conn.end();

        } else {
            res.json({
                err
            });
            conn.end();
        }
    })


}

export const getActivitiesReport = async (req: Request, res: Response) => {
    const conn = await connect();

    let SqlString = "SELECT * FROM view_ctr_report_activities cra WHERE cra.responsible = ? AND cra.date = ?";

    const responsible = req.query.responsible;
    const date = req.query.date;

    conn.query(SqlString, [responsible, date], (err, rows, fields) => {
        if (!err) {
            res.json({
                status: 200,
                statusBol: true,
                msg: "Reporte de actividades",
                data: rows
    
            });
            conn.end();
        } else {
            res.json({
                status: 400,
                statusBol: false,
                //msg: "Lista de actividades completa",
                error: err
    
            });
            conn.end();
        }
    })


}
