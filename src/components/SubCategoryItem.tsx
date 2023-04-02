import React from "react";
import { Box, Collapse, Grid, useTheme } from "@mui/material";
import { SubCategory } from "types/category";
import StyledTreeItem from "./StyledTreeItem";
import { ClassNames } from "@emotion/react";
import PostCard from "./PostCard";

function SubCategoryItem(props: {
  subCategory: SubCategory;
  isLastItem?: boolean;
}) {
  const { subCategory } = props;
  const [show, setShow] = React.useState(false);
  const theme = useTheme();

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        position="relative"
        sx={
          props.isLastItem
            ? {
                // this is used to hide the extra vertical line before the subcategory
                "&::after": {
                  content: '""',
                  // border: `1px solid red`,
                  width: 12,
                  height: "calc(100% - 34px)",
                  position: "absolute",
                  left: -4,
                  bottom: -3,
                  background: "#fff",
                  transform: "translateY(-2px)",
                },
              }
            : {}
        }
      >
        {/* The dash */}
        <Box
          border={`1px solid ${theme.palette.primary.main}`}
          height={2}
          width={6}
          sx={{ backgroundColor: theme.palette.primary.main }}
        ></Box>

        <ClassNames>
          {({ css }) => (
            <StyledTreeItem
              classes={{
                content: css({
                  border: `2px solid ${theme.palette.primary.main}`,
                  borderRadius: "4px",
                  paddingTop: 12,
                  paddingBottom: 12,
                }),
                root: css({
                  marginTop: 8,
                  marginBottom: 8,
                }),
              }}
              nodeId={subCategory.id}
              label={subCategory.name}
              onClick={() => setShow(!show)}
            ></StyledTreeItem>
          )}
        </ClassNames>

        <Box width="100%" />

        {/* Display the posts */}
        <Collapse in={show}>
          <Grid container spacing={2} py={2} pl={2}>
            {subCategory.posts.map((p) => (
              <Grid item key={p.id} sm={4} md={3}>
                <PostCard post={p} />
              </Grid>
            ))}
          </Grid>
        </Collapse>
      </Box>
    </>
  );
}

export default SubCategoryItem;
