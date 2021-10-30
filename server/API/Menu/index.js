import express from 'express';

import { MenuModel, ImageModel } from '../../database/allModels';

const Router = express.Router();

/*
Route       /menu/list
Desc        Get all list of menu based on id
Params      _id
Access      Public
Method      GET
 */
Router.get('/list/:_id', async (req, res) => {
  try {
    const { _id } = req.params;

    const menus = await MenuModel.findById(_id);

    return res.json({ menus });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

/*
Route       /menu/image
Desc        Get all menu images based on id
Params      _id
Access      Public
Method      GET
 */
Router.get("/image/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const menus = await ImageModel.findOne(_id);

    return res.json({ menus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default Router;