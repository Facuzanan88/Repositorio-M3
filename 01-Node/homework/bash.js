// pwd --> print working directory  --> imprime el directorio actual
// date --> devuelve la fecha actual 
// ls --> list --> lista todos los archivos del directorio actual
// echo --> me responde con la misma data que yo ingreso
// cat --> devuelve todo el contenido de un archivo
// head --> devuelve las primeras lineas de un archivo 
// tail --> devuelve las ultimas lineas de un archivo
// curl --> client url --> muestra el contenido de una pagina

const commands = require('./commands');

function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {  // echo hola mundo  // cat bash.js
    var args = data.toString().trim().split(' '); // [echo, hola, mundo]  --> [hola, mundo] // [bash.js]
    var cmd = args.shift(); // [echo] // [cat]

    if (!commands.hasOwnProperty(cmd)) {
        process.stdout.write('Comando no valido');
    }
    else {
        commands[cmd](args, done);
    }
});
