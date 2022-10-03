import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";

//user add/delete/update stories
export const AddUserStoriesHandler = function (schema, request) { //stories update
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
      const { userData } = JSON.parse(request.requestBody);
      user = { ...user, ...userData, updatedAt: formatDate() };
      this.db.users.update({ _id: user._id }, user);
      return new Response(201, {}, { user });
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

