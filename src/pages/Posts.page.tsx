import { Box, CircularProgress } from "@mui/material";
import { useAppSelector } from "store/hooks";

function PostsPage() {
  const isLoading = useAppSelector((state) => state.posts.isLoading);
  const posts = useAppSelector((state) => state.posts.data);

  if (isLoading) {
    return (
      <Box textAlign="center" py={5}>
        <CircularProgress />
      </Box>
    );
  }

  return <div>Posts: {JSON.stringify(posts)}</div>;
}

export default PostsPage;
