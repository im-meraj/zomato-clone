import express from 'express';

import { FoodModel } from '../../database/allModels';

const Router = express.Router();

/*
Route       food/r/:_id
Desc        Get all food based on particular restaurant
Params      id
Access      Public
Method      GET
 */
Router.get("/r/:_id", async (req, res) => {
    try {
        const {_id} = req.params;
        const food = await FoodModel.find({ restaurant: _id });
        return res.json({food});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/*
Route       food/r/:category
Desc        Get all food based on a particular category
Params      category
Access      Public
Method      GET
 */
Router.get("/r/:category", async (req, res) => {
    try {
        const {category} = req.params;
        const food = await FoodModel.find({ category: { $regex: category, $options: "i"}, });
        return res.json({food});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default Router;