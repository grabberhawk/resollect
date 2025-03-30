const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.getAllItems = async (req, res) => {
  try {
    const { search, category, sortBy } = req.query;

    const filters = {};

    if (search) {
      filters.name = { contains: search, mode: "insensitive" };
    }

    if (category && category !== "All Categories") {
      filters.category = category;
    }
    let orderByClause = { id: "asc" };

    if (sortBy === "price") {
      orderByClause = { price: "asc" };
    }

    const items = await prisma.item.findMany({
      where: filters,
      orderBy: orderByClause,
    });

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getItem = async (req, res) => {
    try {
      const item = await prisma.item.findUnique({
        where: { id: parseInt(req.params.id) }
      });
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

exports.createItem = async (req, res) => {
    const { name, category, price, stock, imageUrl } = req.body;
    
    try {
        const newItem = await prisma.item.create({
            data: { name, category, price, stock, imageUrl },
        });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: "Error creating item" });
    }
};


exports.updateItem = async (req, res) => {
  try {
    const item = await prisma.item.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await prisma.item.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
