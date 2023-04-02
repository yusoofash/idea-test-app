import { Post } from "store/reducers/posts.reducers";

export type Category = {
  id: string;
  name: string;
  parentId: string | null;
};

export type SubCategory = Category & {
  posts: Post[];
};
