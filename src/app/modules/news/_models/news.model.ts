import { Category } from "./category.model";
import { User } from "./user.model";

export interface News {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  userCreate?: User;
  userUpdate?: User;
  userApproval?: User;
  state: string;
  image: string;
  categories: Category[];
}
