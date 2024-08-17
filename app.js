import { express } from "express"

import {getWriters , getWriter , createWriter} from "./database.js"

const App = express();

App.use(express.json())

App.get("/writers" ,  async (req , res) => {
    const writers = await getWriters();
    res.send(writers)
})

App.get("/writers/:id" ,  async (req , res) => {
    const id = req.params.id;
    const writer = await getWriter(id);
    res.send(writer)

})

App.post("/writers/create" , async (req , res) => {
    const {id , name , famous_novels} = req.body;
    const create = await createWriter(id, name, famous_novels);
    res.status(201).send(create)
})

App.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

App.listen(8080 , () => {
    console.log("the server is running at port 8080")
})