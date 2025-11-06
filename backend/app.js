import express from "expres";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});