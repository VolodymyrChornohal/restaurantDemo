/**
 * Created by Vladimir on 12/14/17.
 */
import { Comment } from './comment';

export interface Dish {
  id: number;
  name: string;
  image: string;
  category: string;
  label: string;
  price: string;
  featured: boolean;
  description: string;
  comments: Comment[];
}
