import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
const port = 8000

app.use(cors())
app.use(express.json())


const DbConnect = () => {
    try{
        mongoose.connect("mongodb+srv://hraj9503:Harsh1309@cluster0.knaanr7.mongodb.net/harshFullStack")
        console.log("Database Connected")
    }
    catch(err){
        console.log(err)
    }
}
DbConnect()

const userSchema = new mongoose.Schema({
    title: String,
    description: String,
    img: String
})

const userSchema2 = new mongoose.Schema({
    title: String,
    img: String
})

const userSchema3 = new mongoose.Schema({
    title: String,
    img: String,
    name: String
})

const User = mongoose.model("User", userSchema)
const User2 = mongoose.model("User2", userSchema2)
const User3 = mongoose.model("User3", userSchema3)


app.post("/add", async (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const img = req.body.img

    const user = new User({
        title: title,
        description: description,
        img: img
    })
    try{
        await user.save()
        res.send("data inserted")
    }
    catch(err){
        console.log(err)
    }
})

app.post("/add2", async (req, res) => {
    const title = req.body.title
    const img = req.body.img

    const user2 = new User2({
        title: title,
        img: img
    })
    try{
        await user2.save()
        res.send("data inserted 2")
    }
    catch(err){
        console.log(err)
    }
})

app.post("/add3", async (req, res) => {
    const title = req.body.title
    const img = req.body.img
    const name = req.body.name

    const user3 = new User3({
        title: title,
        img: img,
        name: name
    })
    try{
        await user3.save()
        res.send("data inserted 3")
    }
    catch(err){
        console.log(err)
    }
})

app.put("/update1/:id", async (req, res) => {
    const id = req.params.id
    const title = req.body.title
    const description = req.body.description
    const img = req.body.img
    try{
            const updatedUser = await User.findById(id)
            updatedUser.title = title
            updatedUser.description = description
            updatedUser.img = img
            updatedUser.save()
            res.send("updated")
    }
    catch(err){
        console.log(err)
    }
})

app.put("/update2/:id", async (req, res) => {
    const id = req.params.id
    const title = req.body.title
    const img = req.body.img
    try{
        const updatedUser = await User2.findById(id)
            updatedUser.title = title
            updatedUser.img = img
            updatedUser.save()
            res.send("updated 2")
        }
    catch(err){
        console.log(err)
    }
})

app.put("/update3/:id", async (req, res) => {
    const id = req.params.id
    const title = req.body.title
    const img = req.body.img
    const name = req.body.name

    try {
        const updatedUser = await User3.findById(id)
        updatedUser.title = title
        updatedUser.img = img
        updatedUser.name = name
        await updatedUser.save()
        res.send("updated 3")
    } catch (err) {
        console.log(err)
    }
})

app.get("/", (req,res) =>{
    res.send("Api is working")
})








app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
}
)