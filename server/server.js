const express = require('express');
const router = express.Router();
const app = express();
const fs = require('fs');
const path = require('path');
const port = 4000;
const cors = require('cors');

const users = [{ username: 'shoham', password: '1234' }, { username: 'eyal', password: '5678' }];

app.use(cors());
app.use(express.json());
app.use("/", router)

router.post('/', (req, res) => {
    const request = req.body;
    let userExist = false;
    users.forEach((userObj) => {
        if (request.username == userObj.username && request.password == userObj.password) {
            userExist = true;
        }
    })
    userExist ? res.sendStatus(200) : res.sendStatus(404);
});

// router.get('/:username', (async (req, res) => {
//     const content = [];
//     const username = req.params.username;
//     const folderPath = path.resolve(`./${username}`);
//     fs.readdir(folderPath,(err,files)=>{
//         // console.log(files);
//         if(err){console.log('Error:',err); res.status(500).send(err)}
//         else {
//             files.forEach((file) => {
//                 console.log(file);
//                 fs.stat(path.resolve(`./${username}/${file}`), (err, stats) => {
//                     if(err) {
//                        return res.sendStatus(400)
//                     } else {
//                         content.push (
//                         {
//                           name: `${file.split('.')[0]}`,
//                           type: `${file.split('.')[1]}`,
//                           isDir: `${stats.isDirectory()}`,
//                           size: `${stats.size}`
//                         })
//                     }
//                 })
//             })
            
//         };
//     });
//     console.log(content)
//     res.json(content);
// }))

router.get('/:username', async (req, res) => {
    const content = [];
    const username = req.params.username;
    const folderPath = path.resolve(`./${username}`);
    let idCount = 0;

    try {
        const files = await fs.promises.readdir(folderPath);

        for (const file of files) {
            const stats = await fs.promises.stat(path.resolve(`./${username}/${file}`));

            content.push({
                id: `${idCount}`,
                name: `${file.split('.')[0]}`,
                type: `${file.split('.')[1]}`,
                isDir: `${stats.isDirectory()}`,
                size: `${stats.size} bytes`
            });

            idCount++;
        }

        console.log(content);
        res.json(content);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:username/file/:filename',((req,res)=>{
    const username=req.params.username;
    const filename=req.params.filename;
    filePath=path.resolve(`./${username}/file/${filename}`);
    if(fs.existsSync(filePath)){
        fs.unlink((filePath,err)=>{
            if(err){
                console.log(err) 
                res.status(404).send("404 not found")}
        else{
            console.log('the file has been deleted succssfully');
            res.send('OK');
    }})
    }
}))

app.listen(port, () => {
    console.log(`this server is running on ${port}`);
});

// const sourceFile = '../bla.txt';
// const destinationFolder = '.';

// // Construct the destination path using path.join
// const destinationFile = path.join(destinationFolder, path.basename(sourceFile));

// // Copy the file
// fs.copyFile(sourceFile, destinationFile, (err) => {
//   if (err) {
//     console.error(`Error copying file: ${err}`);
//   } else {
//     console.log(`File copied successfully to ${destinationFile}`);
//   }
// });
