const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
}));

let data = [
    {id:1,
    input:"Made by Adan Atif",
}
];

app.get('/todosGET', (req, res) => {
  res.json(data);
});

app.post('/todosADD', (req, res) => {
    try {
        const newTodo = {
            id: data.length + 1,
            input: req.body.input,
          };
          data.push(newTodo);
          res.json(newTodo); 
    } catch (error) {
        console.log("----------------------------");
        console.log(error);
        console.log("----------------------------");
    }
  });



app.delete('/todosDELETE', async(req, res) => {
    try {
       const idValue = parseInt(req.query.id)
       data = data.filter((post) => post.id !== idValue)
      res.json(data)
    } catch (error) {
        console.log("----------------------------");
        console.log(error);
        console.log("---------------------------");
    }
});
app.put('/todosUPDATE', async(req, res) => {
    try {
        const id = parseInt(req.query.id);
        const datatodo = data.find(todo => todo.id === id);
        if (!datatodo) {
          return res.status(404).json({ error: 'Todo not found' });
        }else{
       datatodo.input = req.body.input;
        res.json(datatodo);
        }
    } catch (error) {
        console.log("----------------------------");
        console.log(error);
        console.log("---------------------------");
    }
});

app.listen(8000)