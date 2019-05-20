import { Server } from "@overnightjs/core";
import * as bodyParser from "body-parser";
import { UserController } from "./controllers/UserController";
export default class MainServer extends Server {

    constructor() {
        super();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            // tslint:disable-next-line:no-console
            console.log("Server listening on port: " + port);
        });
    }

    private setupControllers(): void {
        const userController = new UserController();

        // This must be called, and can be passed a single controller or an array of
        // controllers. Optional router object can also be passed as second argument.
        super.addControllers([userController]);
    }
}
