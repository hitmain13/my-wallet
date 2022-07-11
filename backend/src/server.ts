import Express from 'express';

const app = Express();

const port = 3030;

app.listen(port, () => console.log("Server on port 3030"));

app.get('/', (_, res) => {
    res.send({"message": "Hello"});
})

app.post('/json', (_, res) => {
    return res.json({ message: "Meu primeiro json! Post bem sucedido"});

});