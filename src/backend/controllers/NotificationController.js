import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

//get notification
export const getNotificationPostsHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
      // if (!user) {
      //   return new Response(
      //     404,
      //     {},
      //     {
      //       errors: [
      //         "The username you entered is not Registered. Not Found error",
      //       ],
      //     }
      //   );
      // }
      return new Response(200, {}, { notifications : this.db.notifications });
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

//post
export const addToNotificationHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    // if (!user) {
    //   return new Response(
    //     404,
    //     {},
    //     {
    //       errors: ["user Not Found error"],
    //     }
    //   );
    // }
    const { postData } = JSON.parse(request.requestBody);
    // if (user.notification.some((item) => item._id === postData._id)) {
    //   return new Response(
    //     409,
    //     {},
    //     {
    //       errors: ["data already exits"],
    //     }
    //   );
    // }

    const post = {
      _id:uuid(),
      ...postData
    };

    this.db.notifications.insert(post);
    return new Response(201, {}, { notifications : this.db.notifications });
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

//delete
export const removeNotificationHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  const postId = request.params.postId;

  try {
    // if (!user) {
    //   return new Response(
    //     404,
    //     {},
    //     {
    //       errors: ["The email you entered is not Registered. Not Found error"],
    //     }
    //   );
    // }
    this.db.notifications.remove({ _id: postId });
    // let data = this.db.notifications;
    // const filterednotification = data.notification.filter((item) => item._id !== postId);
    // this.db.users.update({ notification: filterednotification });
    return new Response(200, {}, { notifications: this.db.notifications });
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

//delete all
export const clearNotificationHandler = function (schema, request) {
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

    // this.db.users.update({ notification: [] });
      
    return new Response(200, {}, { notifications: [] });
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


