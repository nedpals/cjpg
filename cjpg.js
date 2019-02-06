const fs = require('fs'); 
const path = require('path');
const sharp = require('sharp');
const kumander = require('kumander');

const cli = kumander.CLI();

const settings = {
    input: {
        path: '',
        extension: 'JPG'
    },
    output: {
        path: '',
        createFolder: true,
        format: 'jpeg'
    }
};

cli.set("name", "cjpg");
cli.set("description", "Compress large amounts of images from directory.")
cli.set("defaultCommand", "optimize");

cli.option("createFolder", (v) => {
    settings.output.createFolder = (v == 'true');
}, {
    description: "Creates folder using the name of the input folder"
})

cli.option("format", (v) => {
    settings.output.format = v;
}, {
    description: "Specifies output format (jpeg | png)",
    shorthand: "F"
});

cli.option("ext", (v) => {
    settings.input.extension = v;
}, {
    description: "Specifies file extensions to be watched",
    shorthand: "E"
});

cli.command("optimize", ({ _args }) => {
    settings.input.path = path.resolve(_args[0]);
    settings.output.path = path.resolve(_args[1]);

    const { input, output } = settings;

    const extension = (element) => {
        return path.extname(element) === '.' + (input.extension || "JPG"); 
    };
    
    new Promise((resolve, reject) => {
        return fs.readdir(input.path, (err, list) => {
            if (err !== undefined) {
                resolve(list.filter(extension).map(value => value));
            } else {
                reject(err);
            }
        });
    })
        .then(photos => {
            process.stdout.write(`Found ${photos.length} photos.`);
            
            return photos;
        })
        .then(photos => {
            const workingPathArray = input.path.replace('"', '').split("\\");
            const folderName = workingPathArray[workingPathArray.length-1];
            const workingDirectory = output.createFolder ? path.join(path.resolve(output.path),  `/${folderName}`) : output.path;
    
            process.stdout.cursorTo(0);
            process.stdout.write("Processing...");
    
            if (!fs.existsSync(workingDirectory))
                fs.mkdirSync(workingDirectory);
    
            photos.forEach(photo => {
                const file = fs.readFileSync(path.join(input.path, `/${photo}`));
    
                process.stdout.cursorTo(0);
                process.stdout.write(`Processing... ${photo}`);
    
                sharp(file)
                    .toFormat(output.format)
                    .toFile(path.join(workingDirectory, `/${photo}`))
                    .catch(err => console.log(err))
            });
        })
        .catch(err => console.error(err));
}, {
    description: "Optimize images from a specific folder.",
    arguments: 2
})

cli.run(process.argv.slice(2));