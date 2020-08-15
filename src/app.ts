import express, { Request, Response, NextFunction, Application } from "express";
import morgan from "morgan";

const app: Application = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((err, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log("server on!");
});
