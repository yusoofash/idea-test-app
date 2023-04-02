import { Box, CircularProgress, useTheme } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import { useAppSelector } from "store/hooks";
import { Post } from "store/reducers/posts.reducers";
import { Category, SubCategory } from "types/category";
import SubCategoryItem from "components/SubCategoryItem";
import StyledTreeItem from "components/StyledTreeItem";
import { ClassNames } from "@emotion/react";

type CategoryTree = {
  id: string;
  name: string;
  children: SubCategory[];
};

/**
 * This creates the structure in following manner:
 * Cat 1 >> Subcat 1_1 : News 1, News 4, News 7, ...
 * Cat 2 >> Subcat 2_1 : News 2, News 5, News 8, ...
 * Cat 2 >> Subcat 2_2 : News 3, News 6, News 9, ...
 */
function transformCategories(
  categories: Category[],
  posts: Post[]
): CategoryTree[] {
  const subcategories = categories.filter((c) => c.parentId !== null);

  return categories
    .filter((c) => c.parentId === null)
    .map((c) => {
      const children = subcategories
        .filter((sub) => c.id === sub.parentId)
        .map((subcat) => {
          const subcatIndex = subcategories.indexOf(subcat);

          return {
            ...subcat,
            posts: posts.filter(
              (p, postIndex) =>
                (postIndex - subcatIndex) % subcategories.length === 0
            ),
          };
        });

      return {
        ...c,
        children,
      };
    });
}

function PostsPage() {
  const isLoading = useAppSelector((state) => state.posts.isLoading);
  const posts = useAppSelector((state) => state.posts.data);

  const categories: Category[] = [
    { id: "1", name: "Cat 1", parentId: null },
    { id: "2", name: "Cat 2", parentId: null },
    {
      id: "1.1",
      name: "Subcat1_1",
      parentId: "1",
    },
    {
      id: "1.2",
      name: "Subcat1_2",
      parentId: "1",
    },
    {
      id: "1.3",
      name: "Subcat1_3",
      parentId: "1",
    },
    {
      id: "2.1",
      name: "Subcat2_1",
      parentId: "2",
    },
    {
      id: "2.2",
      name: "Subcat2_2",
      parentId: "2",
    },
  ];

  const categoriesTree = transformCategories(categories, posts);

  const theme = useTheme();

  if (isLoading) {
    return (
      <Box textAlign="center" py={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TreeView
      aria-label="tree-view"
      defaultExpanded={categories.map((c) => c.id)}
    >
      {categoriesTree.map((category) => (
        <ClassNames key={category.id}>
          {({ css }) => (
            <StyledTreeItem
              classes={{
                content: css({
                  width: "fit-content",
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "4px",
                  [`&:hover`]: {
                    backgroundColor: `${theme.palette.primary.light} !important`,
                  },
                }),
                root: css({
                  marginBottom: 16,
                }),
                label: css({
                  color: "#fff",
                  fontSize: "1.4rem !important",
                }),
                selected: css({
                  backgroundColor: `${theme.palette.primary.main} !important`,
                }),
                focused: css({
                  backgroundColor: `${theme.palette.primary.main} !important`,
                }),
              }}
              nodeId={category.id}
              label={category.name}
            >
              {category.children.map((subCategory, i) => (
                <SubCategoryItem
                  subCategory={subCategory}
                  isLastItem={i === category.children.length - 1}
                  key={subCategory.id}
                />
              ))}
            </StyledTreeItem>
          )}
        </ClassNames>
      ))}
    </TreeView>
  );
}

export default PostsPage;
