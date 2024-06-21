import express, { Request, Response } from 'express';
import payload from 'payload';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const todos = await payload.find({ collection: 'Todos' });
    res.json(todos.docs);
})

router.post('/', async (req: Request, res: Response) => {
    const todo = await payload.create( { collection: 'Todos', data: req.body });
    res.json(todo);
});

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = await payload.update( { collection: 'Todos', id, data: req.body });
    res.json(todo);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await payload.delete({ collection: 'Todos', id });
    res.json({ message: 'Todo deleted '});
});

export default router;