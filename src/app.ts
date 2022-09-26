import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';


const app: Application = express();

import dailyActivitiesRoute from "./routes/dailyActivities";

app.set("port", 9800);

app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: "*"}));
app.use(express.json());

app.use(dailyActivitiesRoute);




export default app;