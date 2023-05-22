const { Module } = require('../db/models');

module.exports = {
  index: async (req, res) => {
    try {
      const modules = await Module.findAll();

      return res.status(200).json({
        status: true,
        message: 'success',
        data: modules
      });
    } catch (error) {
      throw error;
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;

      const modules = await Module.findOne({
        where: { id: `${id}` }
      });

      (modules) ? res.status(200).json({
        status: true,
        message: 'success',
        data: modules
      }) : res.status(404).json({
        status: false,
        message: `Module not found!`,
        data: null
      });
    } catch (error) {
      throw error;
    }
  },
  store: async (req, res) => {
    try {
      const { name, description } = req.body;

      if (!name || !description) {
        return res.status(400).json({
          status: false,
          message: 'Module Name and Description is required!',
          data: null
        });
      }

      const modules = await Module.create({
        name: name,
        description: description
      });

      return res.status(201).json({
        status: true,
        message: 'Module added successfully',
        data: modules
      });
    } catch (error) {
      throw error;
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const updated = await Module.update(req.body, { where: { id: id } });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `Module not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Module update successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Module.destroy({ where: { id: id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `Module not found!`,
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Module deleted successfully',
        data: null
      });
    } catch (error) {
      throw error;
    }
  }
}