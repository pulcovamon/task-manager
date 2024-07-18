import { Router, Request, Response } from "express";

const router: Router = Router();

router.route("/task")
  .get((req: Request, res: Response) => {
    res.status(200).json({message: "task list", status: "success"});
  })
  .post((req: Request, res: Response) => {
    res.status(201).json({message: "task created", status: "success"});
  })


router.route("/task/:id(\\d+)")
  .get((req: Request, res: Response) => {
    res.status(200).json({message: `task with id ${req.params.id}`, status: "success"});
  })
  .put((req: Request, res: Response) => {
    res.status(204).send();
  })
  .delete((req: Request, res: Response) => {
    res.status(204).send();
  })

export default router;