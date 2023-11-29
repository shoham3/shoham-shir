const express = require ('express');
const router = express.Router();
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path')
const port = 4003;

const users = [{name: 'shoham', password: '1234', id: 1}, {name: 'eyal', password: '5678', id: 2}];

app.use(cors());
app.use(express.json());

app.use("/home",router);

function findUserById (id) {
    let currentUser;
    users.forEach((user) => {
        if(user.id === id) {
            currentUser = user;
        }
    })
    return currentUser;
}

router.post('/', (req, res) => {
    const request = req.body;
    let user;
    let userExist = false;
    users.forEach((userObj) => {
        if (request.username == userObj.name && request.password == userObj.password) {
            userExist = true;
            user = userObj;
        }
    })
    userExist ? res.sendStatus(200) : res.send(user);
})

router.get('/users/:id/home/content',((req,res) => {
    const content = [];
    console.log("hi");
   const userId = req.params.id;
   const username = findUserById(userId).name
   folderpath = path.resolve(`./${username}`)
    fs.readdir(folderpath, (err, files) => {
        if(err) {
            return res.sendStatus(404);
        } else {
            files.forEach((file) => {
                fs.stat(`./${username}/${file}`, (err, stats) => {
                    if(err) {
                       return res.sendStatus(400)
                    } else {
                        content.push (
                        {
                          name: `${file.split('.')[0]}`,
                          type: `${stats.type}`,
                          isDir: `${stats.isDirectory()}`,
                          size: `${stats.size}`
                        })
                    }
                })
            })
        }
    })
    console.log(content);
    res.json(content);
}))

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})