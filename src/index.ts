const yargs = require('yargs-parser');
import ServerInstance from './api/ServerInstance';

function main() {
    const args = yargs(Bun.argv.slice(2));
    if (args._[0] === undefined) {
            console.log("Useage: unify <command> [arguments]");
        return;
    }

    switch(args._[0]) {
        case 'host':
            const hostServer = new ServerInstance(args);
            hostServer.host();
            break;

        case 'join':
            const listenerServer = new ServerInstance(args);
            listenerServer.listen();
            break;
    }
}

main();
