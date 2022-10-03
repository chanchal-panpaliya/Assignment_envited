import { Server, Model, RestSerializer } from "miragejs";
import { posts } from "./backend/db/posts";
import { users } from "./backend/db/users";
import { chats } from "./backend/db/chats";
import {notifications} from "./backend/db/notification";

import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import {
  createPostHandler,
  getAllpostsHandler,
  getPostHandler,
  deletePostHandler,
  editPostHandler,
  likePostHandler,
  dislikePostHandler,
  getAllUserPostsHandler,
} from "./backend/controllers/PostController";
import {
  getPostCommentsHandler,
  addPostCommentHandler,
  editPostCommentHandler,
  deletePostCommentHandler,
  upvotePostCommentHandler,
  downvotePostCommentHandler,
} from "./backend/controllers/CommentsController";
import {
  followUserHandler,
  getAllUsersHandler,
  getUserHandler,
  getBookmarkPostsHandler,
  bookmarkPostHandler,
  removePostFromBookmarkHandler,
  unfollowUserHandler,
  editUserHandler,
} from "./backend/controllers/UserController";
//archive
import {
  getArchivePostsHandler,
  ArchivePostHandler,
  RestorePostFromArchiveHandler,
  updateArchiveHandler,
  DeletePostFromArchiveHandler
} from "./backend/controllers/ArchiveController";
//notification
import {getNotificationPostsHandler,
        addToNotificationHandler,
        removeNotificationHandler,
        clearNotificationHandler
      } from "./backend/controllers/NotificationController";

//user stories
import {
      AddUserStoriesHandler
  } from "./backend/controllers/StoriesController";

// user chat
import {
  getChatHandler,
  getUserChatHandler,
  AddChatHandler
} from "./backend/controllers/ChatController";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    // TODO: Use Relationships to have named relational Data
    models: {
      post: Model,
      user: Model,
      chat: Model,
      notification : Model
    },

    // Runs on the start of the server
    seeds(server) {
      server.logging = false;
      users.forEach((item) =>
        server.create("user", {
          ...item,
          followers: [],
          following: [],
          bookmarks: [],
          archives:[],
          notification:[]
        })
      );
      posts.forEach((item) => server.create("post", { ...item }));
      chats.forEach((item)=> server.create("chat", { ...item }));
      notifications.forEach((item)=> server.create("notification", { ...item }));
      
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // post routes (public)
      this.get("/posts", getAllpostsHandler.bind(this));
      this.get("/posts/:postId", getPostHandler.bind(this));
      this.get("/posts/user/:username", getAllUserPostsHandler.bind(this));

      // post routes (private)
      this.post("/posts", createPostHandler.bind(this));
      this.delete("/posts/:postId", deletePostHandler.bind(this));
      this.post("/posts/edit/:postId", editPostHandler.bind(this));
      this.post("/posts/like/:postId", likePostHandler.bind(this));
      this.post("/posts/dislike/:postId", dislikePostHandler.bind(this));

      //post comments routes (public)
      this.get("/comments/:postId", getPostCommentsHandler.bind(this));

      //post comments routes (private)
      this.post("/comments/add/:postId", addPostCommentHandler.bind(this));
      this.post(
        "/comments/edit/:postId/:commentId",
        editPostCommentHandler.bind(this)
      );
      this.post(
        "/comments/delete/:postId/:commentId",
        deletePostCommentHandler.bind(this)
      );
      this.post(
        "/comments/upvote/:postId/:commentId",
        upvotePostCommentHandler.bind(this)
      );
      this.post(
        "/comments/downvote/:postId/:commentId",
        downvotePostCommentHandler.bind(this)
      );
      // user routes (public)
      this.get("/users", getAllUsersHandler.bind(this));
      this.get("/users/:userId", getUserHandler.bind(this));

      // user routes (private)
      this.post("users/edit", editUserHandler.bind(this));
      this.get("/users/bookmark", getBookmarkPostsHandler.bind(this));
      this.post("/users/bookmark/:postId/", bookmarkPostHandler.bind(this));
      this.post(
        "/users/remove-bookmark/:postId/",
        removePostFromBookmarkHandler.bind(this)
      );
      this.post("/users/follow/:followUserId/", followUserHandler.bind(this));
      this.post(
        "/users/unfollow/:followUserId/",
        unfollowUserHandler.bind(this)
      );

          //archive
          this.get("/users/archive", getArchivePostsHandler.bind(this));
          this.post("/users/archive/:postId/", ArchivePostHandler.bind(this));
          this.post("/users/restore-archive/:postId/",RestorePostFromArchiveHandler.bind(this));
          this.post("/users/update-archive/:postId/",updateArchiveHandler.bind(this));
          this.delete("/users/remove-archive/:postId/",DeletePostFromArchiveHandler.bind(this));
          
          //Notification
          this.get("/notification", getNotificationPostsHandler.bind(this));
          this.post("/notification", addToNotificationHandler.bind(this));
          this.delete("/notification/:postId",removeNotificationHandler.bind(this));
          this.delete("/notification/all", clearNotificationHandler.bind(this));

          // this.get("/users/notification", getNotificationPostsHandler.bind(this));
          // this.post("/users/notification", addToNotificationHandler.bind(this));
          // this.delete("/users/notification/:postId",removeNotificationHandler.bind(this));
          // this.delete("/users/notification/all", clearNotificationHandler.bind(this));

          //userStories
          this.post("users/userstory", AddUserStoriesHandler.bind(this));

          //chat
          this.get("/chats", getChatHandler.bind(this));
          this.get("/chats/:username",getUserChatHandler.bind(this));
          this.post("/chats/post",AddChatHandler.bind(this));
          
          this.passthrough();
          this.passthrough(
            `https://api.cloudinary.com/v1_1/chanchal12/image/upload`,
            ["post"]
          );
    },
  });
}
