import React, { Fragment } from "react";
import ajax from './ajax.01';

export default (props) => {
  return (
    <Fragment>
      <button
        className="waves-effect waves-light btn"
        onClick={() =>
          ajax.send("FETCH_USERS", { method: "get", url: "/users" })
              .then(console.log)
              .catch(console.log)
        }
      >
        <i className="material-icons left">send</i>
        get users
      </button>
      <button
        className="waves-effect waves-light btn"
        onClick={() =>
          ajax
            .send("FETCH_TEST", { method: "get", url: "/todos" })
            .then(console.log)
            .catch(console.log)
        }
      >
        <i className="material-icons left">send</i>
        get todos
      </button>
      <button
        className="waves-effect waves-light btn"
        onClick={() =>
          ajax.send("FETCH_USERS_AND_POSTS", [
            { method: "get", url: "/users" },
            { method: "get", url: "/posts" }
          ])
            .then(console.log)
            .catch(console.log)
        }
      >
        <i className="material-icons left">send</i>
        get users and posts
      </button>
      <button
        className="waves-effect waves-light btn"
        onClick={() => {
          for (let i = 0; i < 5; i++)
            ajax.send("FETCH_USERS", { method: "get", url: "/users" })
                .then(console.log)
                .catch(console.log)
        }}
      >
        <i className="material-icons left">send</i>
        get users 5 times
      </button>
    </Fragment>
  );
};
