import { Controller, Delete, Get, Middleware, Post, Put } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";

@Controller("api/users")
export class UserController {

    private users = Array<User>(
        {id: 1, name: "Akhil"},
        {id: 2, name: "Anil"},
        {id: 3, name: "Prakash"},
        {id: 4, name: "Meera"},
    );

    @Get(":id")
    public get(req: Request, res: Response): any {
             // tslint:disable-next-line:no-console
        console.log(req.params.id);
        return res.status(200).json(this.users.find((x) => x.id === parseInt(req.params.id, 10)));
    }

    @Get()
   // @Middleware(middleware)
    private getAll(req: Request, res: Response): void {
        res.status(200).json(this.users);
    }

    @Post()
    private add(req: Request, res: Response): void {
        res.status(200).json({msg: "add_called by user"});
    }

    @Put("update-user")
  //  @Middleware([middleware1, middleware2])
    private update(req: Request, res: Response): void {
        res.status(200).json({msg: "update_called"});
    }

    // Next param is optional
    @Delete("delete/:id")
    private delete(req: Request, res: Response, next: NextFunction): void {
        const index = this.users.indexOf(this.users.find((x) => x.id === parseInt(req.params.id, 10)));
        this.users.splice(index, 1);
        res.status(200).json({msg: "delete_called"});
    }

    // async/await work normally :)
    @Get("practice/async")
    private async getWithAsync(req: Request, res: Response): Promise<void> {
        let msg;
        try {
            msg = await this.someMethodWhichReturnsAPromise(req);
        } catch (err) {
            msg = err;
        } finally {
            res.status(200).json({msg});
        }
    }

    private someMethodWhichReturnsAPromise(req: Request) {
        return new Promise((resolve, reject) => {resolve("This is async"); });
    }
}
