import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

//get archive post
export const getArchivePostsHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
      if (!user) {
        return new Response(
          404,
          {},
          {
            errors: [
              "The username you entered is not Registered. Not Found error",
            ],
          }
        );
      }
      // console.log("user.archives",user.archives)
      return new Response(200, {}, { archives : user.archives });
    } catch (error) {
      return new Response(
        500,
        {},
        {
          error,
        }
      );
    }
  };

//add archive post
export const ArchivePostHandler = function (schema, request) {
    const { postId } = request.params;
    const post = schema.posts.findBy({ _id: postId }).attrs;
    const user = requiresAuth.call(this, request);
    try {
      if (!user) {
        return new Response(
          404,
          {},
          {
            errors: [
              "The username you entered is not Registered. Not Found error",
            ],
          }
        );
      }
      const isarchives = user.archives.some(
        (currPost) => currPost._id === postId
      );
      if (isarchives) {
        return new Response(
          400,
          {},
          { errors: ["This Post is already archives"] }
        );
      }
      user.archives.push(post);
      this.db.users.update(
        { _id: user._id },
        { ...user, updatedAt: formatDate() }
      );
      this.db.posts.remove({ _id: postId });

      return new Response(200, {}, { archives: user.archives ,posts: this.db.posts });
    } catch (error) {
      return new Response(
        500,
        {},
        {
          error,
        }
      );
    }
  };

// remove from the archive and restore it
export const RestorePostFromArchiveHandler = function (schema, request) {
    const { postId } = request.params;
    let user = requiresAuth.call(this, request);
    try {
      if (!user) {
        return new Response(
          404,
          {},
          {
            errors: [
              "The username you entered is not Registered. Not Found error",
            ],
          }
        );
      }
      const isarchives = user.archives.some(
        (currPost) => currPost._id === postId
      );
      if (!isarchives) {
        return new Response(400, {}, { errors: ["Post not archives yet"] });
      }

      const filteredarchives = user.archives.filter(
        (currPost) => currPost._id !== postId
      );

      //posts
      const { postData } = JSON.parse(request.requestBody);
      const post = {
        _id: postData._id,
        title:postData.title,
        url:postData.url,
        content:postData.content,
        likes:postData.likes,
        profileImage:postData.profileImage,
        firstName: postData.firstName,
        lastName: postData.lastName,
        username: postData.username,
        userId:postData.userId,
        tagName :postData.tagName,
        gethashtag : postData.gethashtag,
        postType:postData.postType,
        postTopic:postData.postTopic,
        postPolicy : postData.postPolicy,
        eventLocation : postData.eventLocation,
        eventDate : postData.eventDate,
        comments:postData.comments,
        createdAt: postData.createdAt,
        updatedAt: formatDate(),
      };

      this.db.posts.insert(post,);
  
      const username = postData.username
      const posts = schema.posts.where({ username })?.models;
      
      user = { ...user, archives: filteredarchives };

      this.db.users.update(
        { _id: user._id },
        { ...user, updatedAt: formatDate() }
      );
      return new Response(200, {}, { archives: user.archives, posts: this.db.posts , posts });
    } catch (error) {
      return new Response(
        500,
        {},
        {
          error,
        }
      );
    }
  };

//update archive post

export const updateArchiveHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { postId } = request.params;
    const { postData } = JSON.parse(request.requestBody);
    const archiveNoteIndex = user.archives.findIndex(archiveNote => archiveNote._id === postId);
    user.archives[archiveNoteIndex] = { ...user.archives[archiveNoteIndex], ...postData };
    this.db.users.update({ _id: user._id }, user);
    return new Response(200, {}, { archives: user.archives });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
}

//remove archive post
export const DeletePostFromArchiveHandler = function (schema, request) {
  const { postId } = request.params;
  let user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const isarchives = user.archives.some(
      (currPost) => currPost._id === postId
    );

    if (!isarchives) {
      return new Response(400, {}, { errors: ["Post not archives yet"] });
    }

    const filteredarchives = user.archives.filter(
      (currPost) => currPost._id !== postId
    );

    user = { ...user, archives: filteredarchives };

    this.db.users.update(
      { _id: user._id },
      { ...user, updatedAt: formatDate() }
    );

    return new Response(200, {}, {archives: user.archives});
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
