import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Tag } from "../../store/tags/models/Tag";
import { AppState } from "../../store/rootStore";
import { AppActions } from "../../store/models/actions";
import { boundRequestTags, selectTag } from "../../store/tags/tagActions";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import { User } from "../../store/users/models/User";
import { boundRequestUsers, selectUser } from "../../store/users/userActions";

const useStyles = makeStyles((theme) => ({
  box: {
    border: "1px solid #ccc",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    width: "100%",
    boxSizing: "border-box",
  },
  completed: {
    textDecoration: "line-through",
  },
  searchBar: {
    width: "100%",
  },
}));

interface Props {}

interface LinkStateProps {
  tags: Tag[];
  selectedTags: string[]; // Selected tag IDs
  users: User[];
  selectedUsers: string[]; // Selected tag IDs
}

interface LinkDispatchProps {
  boundRequestTags: () => void;
  selectTag: (title: string) => void;
  boundRequestUsers: () => void;
  selectUser: (username: string) => void;
}

export type LinkProps = Props & LinkStateProps & LinkDispatchProps;

const mapStateToProps = (state: AppState): LinkStateProps => ({
  tags: state.tagReducer.tags,
  selectedTags: state.tagReducer.selectedTags,
  users: state.userReducer.users,
  selectedUsers: state.userReducer.selectedUsers,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, {}, AppActions>
) => ({
  boundRequestTags: bindActionCreators(boundRequestTags, dispatch),
  boundRequestUsers: bindActionCreators(boundRequestUsers, dispatch),
  selectTag: bindActionCreators(selectTag, dispatch),
  selectUser: bindActionCreators(selectUser, dispatch),
});

const Home: React.FC<LinkProps> = ({
  tags,
  selectedTags,
  boundRequestTags,
  selectTag,
  users,
  selectedUsers,
  boundRequestUsers,
  selectUser,
}) => {
  const classes = useStyles();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryUsers, setSearchQueryUsers] = useState("");

  const filteredTags = tags.filter((tag: Tag) =>
    tag?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const filteredUsers = users.filter((user: User) => {
    console.log("user.name", user);
    return user?.username
      ?.toLowerCase()
      .includes(searchQueryUsers?.toLowerCase());
  });

  useEffect(() => {
    boundRequestTags();
  }, [boundRequestTags]);

  useEffect(() => {
    boundRequestUsers();
  }, [boundRequestUsers]);

  const handleToggle = (title: string) => {
    selectTag(title);
  };

  const handleToggleUser = (username: string) => {
    selectUser(username);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Box className={classes.box}>
          <Typography variant="h5" gutterBottom>
            Products List
          </Typography>

          <TextField
            label="Search Tags"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            className={classes.searchBar}
          />

          <List>
            {filteredTags.map((tag: Tag) => (
              <ListItem
                key={tag.title}
                button
                onClick={() => handleToggle(tag.title)}
              >
                <Checkbox
                  checked={selectedTags.includes(tag.title)}
                  color="primary"
                />
                <div>
                  <Typography
                    className={tag.completed ? classes.completed : ""}
                    variant="body1"
                  >
                    {tag.title}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {tag.description}
                  </Typography>
                </div>
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box className={classes.box}>
          <Typography variant="h5" gutterBottom>
            Users List
          </Typography>

          <TextField
            label="Search Users"
            value={searchQueryUsers}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQueryUsers(e.target.value)
            }
            className={classes.searchBar}
          />

          <List>
            {filteredUsers.map((user: User) => (
              <ListItem
                key={user.username}
                button
                onClick={() => handleToggleUser(user.username)}
              >
                <Checkbox
                  checked={selectedUsers.includes(user.username)}
                  color="primary"
                />
                <div>
                  <Typography
                    className={user.completed ? classes.completed : ""}
                    variant="body1"
                  >
                    {user?.username}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {user?.email}
                  </Typography>
                  <div>
                    <Typography variant="caption" color="textSecondary">
                      {user?.name?.firstname} {user?.name?.lastname}
                    </Typography>
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box className={classes.box}>
          <Typography variant="h5" gutterBottom>
            Selected Items
          </Typography>

          <List>
            {[...selectedTags, ...selectedUsers].map((value: any) => {
              const item: any = [...tags, ...users].find(
                (tag: any) => (tag?.title || tag?.username) === value
              );
              if (item) {
                return (
                  <ListItem
                    key={item.id}
                    button
                    onClick={() =>
                      item?.title
                        ? handleToggle(item.title)
                        : handleToggleUser(item.username)
                    }
                  >
                    <Checkbox checked color="primary" />
                    <Typography
                      className={item.completed ? classes.completed : ""}
                      variant="body1"
                    >
                      {item?.title || item?.username}
                    </Typography>
                  </ListItem>
                );
              }
              return null;
            })}
          </List>
        </Box>
      </Grid>
    </Grid>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
