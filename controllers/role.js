const { Role } = require('../db/models');

module.exports = {
  index: async (req, res) => {
    try {
      const role = await Role.findAll();

      return res.status(200).json({
        status: true,
        message: 'Success',
        data: role
      });
    } catch (error) {
      throw error;
    }
  },
  show: async (req,res)=>{
    try {
      const { id } = req.params;

      const modules = await Role.findOne({
        where: { id: `${id}` }
      });

      if(!modules){
        return res.status(404).json({
          status: false,
          message: `Module not found!`,
          data: null
        });
      }

      if (modules){
        return res.status(200).json({
          status: true,
          message: 'success',
          data: modules
        }) 
      } 
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
          message: 'Name and description is required!',
          data: null
        });
      }

      const role = await Role.create({
        name, description
      });

      return res.status(201).json({
        status: true,
        message: 'Role added succesfully',
        data: role
      });
    } catch (error) {
      throw error;
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const updated = await Role.update(req.body, { where: { id: id } });

      if (!updated) {
        return res.status(404).json({
          status: false,
          message: 'Role not Found!',
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Role updated succesfully',
        data: updated
      });
    } catch (error) {
      throw error;
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const destroyed = await Role.update(req.body, { where: { id: id } });

      if (!destroyed) {
        return res.status(404).json({
          status: false,
          message: 'Role not Found!',
          data: null
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Role deleted succesfully',
        data: destroyed
      });
    } catch (error) {
      throw error;
    }
  }
}