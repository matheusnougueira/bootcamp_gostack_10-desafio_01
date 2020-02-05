const express = require('express');
const port = 3030;

const server = express();
server.use(express.json());

const projects = [];

// Middleware que verifica se o projeto existe
function checkProjectExists(req, res, next) {
  const { id } = req.params;

  project = projects.find(p => p.id == id);

  if (!project) {

    return res.status(400).json({ Error: `Project not found` })
  };

  return next();
};

// Middleware que conta as requisições
function logRequests(req, res, next) {
  console.count("Requisição")

  return next();
}

server.use(logRequests);

// Criando projetos
server.post('/projects', (req, res) => {

  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

// Retornando todos projetos
server.get('/projects', (req, res) => {

  return res.json(projects);
});

// Alterando somente o title do projeto pelo id 
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

// Deletando projeto com id informado
server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const project = projects;

  project.splice(id, 1);

  return res.send();
});

// Adicionando uma nova tarefa no projeto especificado pelo id
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(port, console.log(`Server inciado na porta ${port}`));
