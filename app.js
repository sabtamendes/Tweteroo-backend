import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const user = [];
const tweets = [];

app.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body;

    if (!username || !avatar) {
        res.status(400).send({ message: "Insira todos os campos corretamente!" });
        return;
    }

    const data =
    {
        username,
        avatar
    }
    user.push(data);

    res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {

    const { user: username } = req.headers;
    const { tweet } = req.body;

    if (!username || !tweet) {
        res.status(400).send({ message: "Insira todos os campos corretamente!" });
        return;
    }
    const data =
    {
        username,
        tweet
    }
    tweets.push(data);

    res.status(201).send("OK");
});


app.get("/tweets", (req, res) => {

    tweets.forEach((t) => {

        const { avatar } = user.find((i) => i.username === t.username);

        t.avatar = avatar;
    });

    const lastTenTweets = tweets.slice(tweets.length - 10);

    res.send(lastTenTweets);
});

app.get("/tweets/:username", (req, res) => {

    const nameUser = req.params.username;

    const allTweetsUser = tweets.filter((i) => i.username === nameUser)

    res.send(allTweetsUser)
})

app.listen(5000);
