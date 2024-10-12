import { Component } from "react";
import User from "./User";

import classes from "./Users.module.css";

// const DUMMY_USERS = [
//   { id: "u1", name: "Max" },
//   { id: "u2", name: "Manuel" },
//   { id: "u3", name: "Julie" },
// ];
class Users extends Component {
  //in constructor() you can do initialization work like initializing state
  constructor() {
    super();
    this.state = {
      showUsers: true,
      more: "Test",
    };
  }

  componentDidUpdate() {
    // try{ 
    //   someCodeWhichMightFail()
    // } catch(err) {
    //    handle error
    //   }
    if (this.props.users.length === 0) {
      throw new Error("No users provided!");
    }
  }

  toggleUsersHandler() {
    // this.state.showUsers = false; // NOT!
    //due to setState, what will be returned here will be merged with the old state, more: "Test" will not be lost.
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });
  }

  render() {
    // helper const can be defined in render() method
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

/**
 * 
 * 1/ this keyword: In JavaScript, the value of this depends on how a function is called. In React class components, this typically refers to the instance of the component itself, giving you access to component properties like this.state and this.setState().

2/ Problem without .bind(this): When you pass toggleUsersHandler to an event handler (like the onClick in your example), the function loses its connection to the component's instance, meaning that this no longer refers to the component instance. This leads to an error, as this.setState() will be undefined.

3/ .bind(this) solution: By calling .bind(this) on toggleUsersHandler, you explicitly bind the function to the current instance of the component. This ensures that when the function is executed, this inside the function still refers to the component instance, allowing you to safely use this.setState() and access other component methods or properties.
 */

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? "Hide" : "Show"} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
