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


//check user's name and password
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

//get file's content
router.get('/*/file/:filename', (async (req, res) => {
    const username = req.path.split('/file')[0];
    
    const filePath = path.resolve(`./${username}/${req.params.filename}`);
    fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })

}))

//get folder's content
let idCount = 0;
router.get('/:username', async (req, res) => {
    const content = [];
    const username = req.params.username;
    const folderPath = path.resolve(`./${username}`);

    try {
        const files = await fs.promises.readdir(folderPath);

        for (let file of files) {
            const stats = await fs.promises.stat(path.resolve(`./${username}/${file}`));
            content.push({
                id: `${idCount}`,
                name: `${file}`,
                type: `${file.split('.')[1]}`,
                isDir: stats.isDirectory(),
                size: `${stats.size} bytes`
            });

            idCount++;
        }

        res.json(content);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

//to rename a file
router.patch('/:username/file/:filename', async (req, res) => {
    const folderPath = path.resolve(`./${req.params.username}`)
    const oldPath = path.join(folderPath, `${req.params.filename}`)
    const newPath = path.join(folderPath, `${req.body.newname}`)
    console.log(req.params);
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.sendStatus(200)
        }
    })
})

//delete a file
router.delete('/*/file/:filename', (req, res) => {
    const username = req.path.split('/file')[0];
    console.log(username);
    console.log(username);
    const filename = req.params.filename;
    const filePath = path.resolve(`./${username}/${filename}`);

    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
            } else {
                console.log('The file has been deleted successfully');
                res.send('OK');
            }
        });
    } else {
        res.status(404).send('File not found');
    }
});

//show folder's content
router.get('/:username/:foldername', async (req, res) => {
    const content = [];
    const username = req.params.username;
    const foldername = req.params.foldername;
    const folderPath = path.resolve(`./${username}/${foldername}`);

    try {
        const files = await fs.promises.readdir(folderPath);

        for (let file of files) {
            const stats = await fs.promises.stat(path.join(folderPath, `${file}`));
            content.push({
                id: `${idCount}`,
                name: `${file}`,
                type: `${file.split('.')[1]}`,
                isDir: stats.isDirectory(),
                size: `${stats.size} bytes`
            });

            idCount++;
        }

        res.json(content);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
    //     fs.readdir(folderPath,(err,files)=>{
    // if(err){res.status(404).send('not found')}
    // else {res.send(files)};
});
router.delete('/:username/*', async (req, res) => {
    const username = req.params.username;
    const folder = req.path.split(`/${username}/`)[1];
    folderPath = path.resolve(`./${username}/${folder}`)
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.log('error:', err)
        } else {
            if (files.length === 0) {
                fs.rmdir(folderPath, (rmdirErr) => {
                    if (err) { console.log('error:', rmdirErr) }
                    else { res.sendStatus(200)}
                })
            } else {
                res.sendStatus(400);
            }
        }
    })
})
app.listen(port, () => {
    console.log(`this server is running on ${port}`);
});
