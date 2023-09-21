import { BunFile } from 'bun';
import { Elysia } from 'elysia';
import { watch } from 'fs';

class ServerInstance {
    args: any;
    listeners: Array<string>;
    app: Elysia;

    constructor(args: any) {
        this.args = args;
        this.listeners = [];

        this.app = new Elysia()
            // GET - initalise new listener
            // POST - recieve updated document
            // fetch(POST) - send updated document

            .get('/', (req) => { 
                if (req.headers.host === null)  return 'Invalid Request, connection refused';
                this.listeners.push(req.headers.host);
                this.sync()

                return `Listening to file '${args.file}' hosted on port ${this.app.server?.hostname}:${this.app.server?.port}`;
            })
            .post('/', (req) => {
                this.writeFile(req.body);
                return 'Sync accepted.'
            })
    }

    host() {
        const port: string = this.args.port ?? "8000";
        this.app.listen(port)

        console.log(`Unify server hosted on port ${this.app.server?.hostname}:${this.app.server?.port}`)
        watch(this.args.file, () => {
            this.sync().then(() => console.log(`${new Date(Date.now()).toISOString()}: Syncing file ${this.args.file}`))
        })
    }

    async listen() {
        const port: string = "3000";
        this.app.listen(port);

        const response = await fetch(`localhost:${this.args.port ?? "8000"}`, {
            headers: {
                'host': `${this.app.server?.hostname}:${this.app.server?.port}`
            }
        });

        console.log(await response.text());
    }

    async sync() {
        const file: BunFile = Bun.file(this.args.file);
        for (let listener of this.listeners) {
            fetch(listener, {
                method: "POST",
                body: JSON.stringify({filename: this.args.file, content: await file.text()}),
                headers: { "Content-Type": "application/json" },
            })
        }
    }


    async writeFile(req: any) {
        const filename: string = req.filename.split('\\').pop().split('/').pop();
        Bun.write(filename, req.content);
    }
}

export default ServerInstance;