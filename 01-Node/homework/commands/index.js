let fs = require('fs');
const axios = require('axios');

module.exports = {
    date: function (args, done) {
        //     process.stdout.write(Date());
        done(Date());
    },
    pwd: function (args, done) {
        //  process.stdout.write(process.cwd());
        done(process.cwd());
    },
    ls: function (args, done) {
        fs.readdir('.', 'utf-8', function (err, files) {
            if (err) throw err;
            process.stdout.write('\n');
            lines = '';

            files.forEach(file => {
                //  process.stdout.write(file + '\n');
                lines = lines + file + '\n';
            })
            done(lines)
        })
    },
    echo: function (args, done) {
        // process.stdout.write(args.join(' ') + '\n');
        done(args.join(' ') + '\n')
    },
    cat: function (args, done) { // [bash.js]
        fs.readFile(args[0], 'utf-8', function (err, file) { // bash.js
            if (err) throw err;
            /* process.stdout.write(file);
            process.stdout.write('\nprompt > '); */
            done(file);
        })
    },
    head: function (args, done) { // [bash.js]
        fs.readFile(args[0], 'utf-8', function (err, file) { // bash.js
            if (err) throw err;
            const lines = file.split('\n').slice(0, 3); // [line1, line2, line3, line4, ...] --> [line1, line2, line3]
            /* process.stdout.write(lines.join('\n'));
            process.stdout.write('\nprompt > '); */
            done(lines.join('\n'));
        })
    },
    tail: function (args, done) { // [url]
        fs.readFile(args[0], 'utf-8', function (err, file) { // bash.js
            if (err) throw err;
            const lines = file.split('\n').slice(-3); // [line1, line2, line3, line4, ...] --> [line1, line2, line3]
            /* process.stdout.write(lines.join('\n'));
            process.stdout.write('\nprompt > '); */
            done(lines.join('\n'));
        })
    },
    curl: function (args, done) { // [url]
        axios(args[0])
            .then(data => {
                // process.stdout.write(data.data.toString()); // transformamos en String lo que recibimos 
                // process.stdout.write('\nprompt > ');
                done(data.data.toString());
            })
            .catch(err => {
                console.log(err)
                /* process.stdout.write(err); // transformamos en String lo que recibimos 
                process.stdout.write('\nprompt > '); */
            })
        process.stdout.write('\nprompt > ');
    },
}   
