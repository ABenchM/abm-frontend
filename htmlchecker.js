// Import the module
var readdirp = require('readdirp');
var fs = require('fs')


const exec = require('child_process').spawn;




var settings = {
    root: 'src/',
    entryType: 'all',
    // Filter files with html extension
    fileFilter: ['*.html'],
    // Filter by directory
    directoryFilter: ['!.git', '!*modules', '!dist', '!e2e', '!test']
};
// In this example, this variable will store all the paths of the files and directories inside the providen path
var allFilePaths = [];

// Iterate recursively through a folder
readdirp(settings)
    .on('data', function (entry) {
        // execute everytime a file is found in the providen directory

        // Store the fullPath of the file/directory in our custom array 
        fs.stat(entry.fullPath, function (err, stat) {

            if (stat && stat.isFile()) {
                var file = fs.readFileSync(entry.fullPath, 'utf8');

                var child = exec('htmllint', [`${entry.fullPath}`]);
                child.stdout.on('data', function (data) {
                    process.stdout.write(data);
                }
                );

            }

            allFilePaths.push(
                entry.fullPath
            );
        }
        );
        
    })
    .on('warn', function (warn) {
    console.log("Warn: ", warn);
})
    .on('error', function (err) {
        console.log("Error: ", err);
    })
    .on('end', function () {

        // console.log(allFilePaths);

    })
    ;
