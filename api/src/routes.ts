import { Router, Request, Response } from "express";
import { Task } from "./models/task";
import sequelize from "./config/database";
import bodyParser from "body-parser";

const router: Router = Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.route("/task")
  .get((req: Request, res: Response) => {
    Task.findAll()  
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching tasks", error });
    })
  })
  .post((req: Request, res: Response) => {
    try {
      req.body
      Task.create();
      res.status(201).json({message: "task created", status: "success"});
    }
    catch (error) {
      res.status(500).json({message: `Task was not created due to error: ${error}`});
    }
  })


router.route("/task/:id(\\d+)")
  .get((req: Request, res: Response) => {
    res.status(200).json({message: `task with id ${req.params.id}`, status: "success"});
  })
  .put((req: Request, res: Response) => {
    res.status(204);
  })
  .delete((req: Request, res: Response) => {
    res.status(204);
  })

router.use((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send();
})

export default router;