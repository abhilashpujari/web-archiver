const { program } = require('commander');
const archive = require('../src/commands/archive');
const connectDB = require('../src/config/db');

(async () => {
    // Connect to database
    await connectDB();

    program
        .command('archive')
        .description('Gets the page title and saves the screenshot of the page')
        .action(async () => {
            await archive();
        });

    program.parse(process.argv);
})();


