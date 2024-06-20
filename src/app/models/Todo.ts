import mongoose, { Schema, Document } from 'mongoose';

interface ITodo extends Document {
  title: string;
  description?: string;
  status?: string;
  dueDate?: string;
}

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'pending' },
  dueDate: { type: Date },
});

export default mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);
