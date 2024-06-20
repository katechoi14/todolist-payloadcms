import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '../_utilities/mongodb';
import Todo from '../models/Todo';
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    await connectToDatabase();

    switch (method) {
        case 'GET':
            try {
                const todos = await Todo.find({});
                res.status(200).json(todos);
            } catch (error) {
                res.status(400).json( { success: false });
            }
            break;
        case 'POST':
            try {
                const todo = await Todo.create(req.body);
                res.status(200).json(todo);
            } catch (error) {
                res.status(400).json( { success: false });
            }
            break;
        case 'DELETE':
            try {
                const { id } = req.query;
                await Todo.findByIdAndDelete(id);
                res.status(200).json( { success: true });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default: 
            res.status(400).json({ success: false });
            break;
    }
}