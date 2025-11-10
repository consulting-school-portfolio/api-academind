const express = require("express");
const app = express();
app.use(express.json());

let todos = [];
let id = 1;

// GET tous les éléments
app.get("/api/items", (req, res) => {
  return res.json(todos);
});

// GET un élément par ID
app.get("/api/items/:id", (req, res) => {
  const resource = todos.find((r) => r.id === parseInt(req.params.id));
  if (!resource) return res.status(404).json({ error: "Non trouvé" });
  return res.json(resource);
});

// POST créer un élément
app.post("/api/items", (req, res) => {
  // Validation des champs
  const { name, description, price } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({
      error: {
        field: "name",
        message: 'Le champ "name" est requis et doit être une chaîne non vide.',
      },
    });
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length === 0
  ) {
    return res.status(400).json({
      error: {
        field: "description",
        message:
          'Le champ "description" est requis et doit être une chaîne de caractères.',
      },
    });
  }

  if (
    !price ||
    typeof parseInt(price) !== "number" ||
    parseInt(price) <= 0 ||
    price.trim().length === 0 ||
    isNaN(price)
  ) {
    return res.status(400).json({
      error: {
        field: "price",
        message:
          'Le champ "price" est requis et doit être un nombre et supérieur à 0.',
      },
    });
  }

  // Création de la ressource
  const resource = {
    id: id++,
    name: name.trim(),
    description: description?.trim(),
    price: price.trim(),
  };

  todos.push(resource);
  res.status(201).json(resource);
});

// PUT mettre à jour un élément
app.put("/api/items/:id", (req, res) => {
  const resource = todos.find((r) => r.id === parseInt(req.params.id));
  if (!resource) return res.status(404).json({ error: "Non trouvé" });

  const { name, description, price } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({
      error: {
        field: "name",
        message: 'Le champ "name" est requis et doit être une chaîne non vide.',
      },
    });
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length === 0
  ) {
    return res.status(400).json({
      error: {
        field: "description",
        message:
          'Le champ "description" est requis et doit être une chaîne de caractères.',
      },
    });
  }

  if (!price || typeof parseInt(price) !== "number" || parseInt(price) <= 0) {
    return res.status(400).json({
      error: {
        field: "price",
        message:
          'Le champ "price" est requis et doit être un nombre et supérieur à 0.',
      },
    });
  }

  resource.name = req.body.name.trim();
  resource.description = req.body.description.trim();
  resource.price = req.body.price;
  return res.json(resource);
});

// DELETE supprimer un élément
app.delete("/api/items/:id", (req, res) => {
  const index = todos.findIndex((r) => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Non trouvé" });
  todos.splice(index, 1);
  return res.status(200).json({ message: "Élément supprimé avec succès" });
});

module.exports = app;
