import React, { Component } from "react";

import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    userName: "",
    expenses: [],
    expenseDescription: "",
    expenseAmount: "",
    expenseUser: ""
  };
  async componentDidMount() {
    try {
      this.updateInfo();
    } catch (error) {
      alert("Une erreur est survenue");
    }
  }

  updateInfo = async () => {
    const usersGet = await axios.get("http://localhost:3000/api/users");
    const expensesGet = await axios.get("http://localhost:3000/api/expenses");
    this.setState({
      users: usersGet.data,
      expenses: expensesGet.data
    });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleSubmitUser = async () => {
    try {
      await axios.post("http://localhost:3000/api/usercreate", {
        name: this.state.userName
      });

      this.updateInfo();
    } catch (error) {
      alert("Une erreur est survenue");
    }
  };

  handleSubmitExpense = async () => {
    try {
      await axios.post("http://localhost:3000/api/expensecreate", {
        description: this.state.expenseDescription,
        amount: this.state.expenseAmount,
        user: this.state.expenseUser
      });

      this.updateInfo();
    } catch (error) {
      alert("Une erreur est survenue");
    }
  };

  render() {
    const userTotals = this.state.expenses.reduce((totals, expense) => {
      if (!totals[expense.User._id]) {
        totals[expense.User._id] = expense.Amount;
      } else {
        totals[expense.User._id] += expense.Amount;
      }
      return totals;
    }, {});
    console.log(userTotals, "usertotals");

    return (
      <div className="App">
        <div className="four-main">
          <div className="left-col">
            <div className="main-boxes">
              <h1>Users</h1>
              <ul className="tasks-list">
                {this.state.users.map((user, index) => {
                  return (
                    <li key={index}>
                      {user.name} - €{userTotals[user._id]}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="main-boxes">
              <h1>New User</h1>
              {console.log(this.state, "first state check")}
              <form onSubmit={this.handleSubmitUser}>
                <input
                  type="text"
                  name="userName"
                  placeholder="User name"
                  value={this.state.userName}
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <input type="submit" value="ADD USER" />
              </form>
            </div>
          </div>
          <div className="right-col">
            <div className="main-boxes">
              <h1>Expenses</h1>
              <ul className="expense-list">
                {this.state.expenses.map((expense, index) => {
                  return (
                    <li key={index}>
                      <span
                        onClick={async () => {
                          await axios.post(
                            "http://localhost:3000/api/deleteexpense?id=" +
                              expense._id
                          );
                          this.updateInfo();
                        }}
                      >
                        {expense.Description} - {expense.User.name} - €
                        {expense.Amount}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="main-boxes">
              <h1>New expense</h1>
              <form onSubmit={this.handleSubmitExpense}>
                <input
                  type="text"
                  name="expenseDescription"
                  placeholder="Description"
                  value={this.state.expenseDescription}
                  onChange={this.handleChange}
                />
                <br />
                <input
                  type="text"
                  name="expenseAmount"
                  placeholder="Amount"
                  value={this.state.expenseAmount}
                  onChange={this.handleChange}
                />
                <br />
                <select
                  value={this.state.value}
                  name="expenseUser"
                  onChange={this.handleChange}
                >
                  <option value="" disabled selected>
                    Select a user
                  </option>
                  {this.state.users.map((user, index) => {
                    return (
                      <option value={user._id} key={index}>
                        {user.name}
                      </option>
                    );
                  })}
                </select>
                <br />
                <br />
                <input type="submit" value="ADD EXPENSE" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
