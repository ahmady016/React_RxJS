import React, { Fragment } from "react";
import ajax from './ajax.02';

export default (props) => {
  return (
    <Fragment>
      <button className="waves-effect waves-light btn"
        onClick={() =>
          ajax
            .send("FETCH_USERS", ["get","/users"] )
            .subscribe(console.log, console.log)
        }
      >
        <i className="material-icons left">send</i>
        get users
      </button>
      <button className="waves-effect waves-light btn"
        onClick={() =>
          ajax
            .send("FETCH_POSTS", [["get","/posts"],["get","/comments"]] )
            .subscribe(console.log, console.log)
        }
      >
        <i className="material-icons left">send</i>
        get posts and comments
      </button>
    </Fragment>
  );
};
