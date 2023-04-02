import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Post } from "store/reducers/posts.reducers";

function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <Card sx={{height: '100%'}}>
      <CardContent>
        <Typography variant="h5" gutterBottom fontSize={16} fontWeight="bold">
          #{post.id} {post.title}
        </Typography>
        <Typography fontSize={14}>{post.body}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Read Later</Button>
      </CardActions>
    </Card>
  );
}

export default PostCard;
