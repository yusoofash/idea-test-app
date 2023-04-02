import TreeItem, { TreeItemClasses, TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import { alpha, styled } from "@mui/material";

const StyledTreeItem = styled(
  (props: TreeItemProps & { classes?: Partial<TreeItemClasses> }) => (
    <TreeItem {...props} classes={props.classes} />
  )
)(({ theme }) => ({
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 8,
    borderLeft: `3px solid ${alpha(theme.palette.primary.main, 1)}`,
  },
  [`& .${treeItemClasses.content}`]: {
    display: 'inline-flex',
    width: 'auto',
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    marginRight: '0px !important',
    width: "0px !important",
  },
}));

export default StyledTreeItem;
