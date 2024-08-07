import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import { verifyInput } from "./data/Data_repository";
import { username } from "./App";

/*
the first 3 tests ensure the component renders without error and is found within the document
the forth test is to testing verify user input to show the correct message
the fifth test is to testing show the correct profile details

the sixth test is to testing user input in review page
*/
let contianer;

// Test sign up page render successfully withour error and is found with in the document
test("render sign up page without error", () => {
  const login = () => {
    return { username: 1, email: "rmit.edu.com" };
  };

  const utils = render(
    <username.Provider value={{ login }}>
      <Router>
        <Signup />
      </Router>
    </username.Provider>
  );
  contianer = utils.container;
  expect(contianer).toBeInTheDocument();
});

// Test login in page render successfully withour error and is found with in the document
test("render login page without error", () => {
  const login = () => {
    return { username: 1, email: "rmit.edu.com" };
  };

  const utils = render(
    <username.Provider value={{ login }}>
      <Router>
        <Login />
      </Router>
    </username.Provider>
  );
  contianer = utils.container;
  expect(contianer).toBeInTheDocument();

})

// Test profile page render successfully withour error and is found with in the document
test("render profile page without error", () => {
  const logout = () => {
    return ;
  };

  const currentuser = {email: "123@rmit.au", username: "123", password_hash: "123", joindate: "Thu Oct 05 2023"}

  const utils = render(
    <username.Provider value={{currentuser, logout}}>
      <Router>
        <Profile />
      </Router>
    </username.Provider>
  );
  contianer = utils.container;
  expect(contianer).toBeInTheDocument();

})


// test verify user input function in sign up page
test("test verify user input in sign up page", () => {
  const login = () => {
    return;
  };

  const utils = render(
    <username.Provider value={{ login }}>
      <Router>
        <Signup />
      </Router>
    </username.Provider>
  );
  contianer = utils.container;
  // test all invalid user input
  let user_input = {email: "123", name: "", password: "123"};
  let verifyMessage = verifyInput(user_input);
  const inputEmail = screen.getByLabelText("Email:");
  const inputName = screen.getByLabelText("Name:");
  const inputPassword = screen.getByLabelText("Password:");
  const button = screen.getByRole("button");
  fireEvent.change(inputName, {target: {value: user_input.name}});
  fireEvent.change(inputEmail, {target: {value: user_input.email}});
  fireEvent.change(inputPassword, {target: {value: user_input.password}});
  fireEvent.click(button);
  let invalidMessage = contianer.getElementsByClassName("Invalid");
  expect(invalidMessage[0].textContent).toBe(verifyMessage.name);
  expect(invalidMessage[1].textContent).toBe(verifyMessage.email);
  expect(invalidMessage[2].textContent).toBe(verifyMessage.password);

  // test all valid user input
  user_input = {email: "123@gmail.com", name: "Wentao", password: "TTgod321!!"};
  verifyMessage = verifyInput(user_input);
  fireEvent.change(inputName, {target: {value: user_input.name}});
  fireEvent.change(inputEmail, {target: {value: user_input.email}});
  fireEvent.change(inputPassword, {target: {value: user_input.password}});
  fireEvent.click(button)
  verifyMessage = contianer.getElementsByClassName("Invalid");
  expect(Object.keys(verifyMessage).length).toBe(0)
});


//  test correct profile details in profile page
test("Test profile details", () => {
  const logout = () => {
    return ;
  };

  const currentuser = {email: "123@rmit.au", username: "123", password_hash: "123", joindate: "Thu Oct 05 2023"}

  const utils = render(
    <username.Provider value={{currentuser, logout}}>
      <Router>
        <Profile />
      </Router>
    </username.Provider>
  );
  contianer = utils.container;
  const joinDate = contianer.getElementsByClassName("Joindate");
  const email = contianer.getElementsByClassName("Email");
  const name = contianer.getElementsByClassName("Username");
  expect(email[0].textContent).toBe(currentuser.email);
  expect(name[0].textContent).toBe(currentuser.username);
  expect(joinDate[0].textContent).toBe("Joined date: " + currentuser.joindate);
})


// test verify user input text and rate in forum page
test("Test verify user input in forum page", () => {
  const currentuser = {email: "123@rmit.au", username: "123", password_hash: "123", joindate: "Thu Oct 05 2023"}

  const utils = render(
    <username.Provider value={{currentuser}}>
      <Router>
        <Forum />
      </Router>
    </username.Provider>
  );
  contianer = utils.container;
  const inputText = contianer.getElementsByTagName("textarea")[0];
  const button = screen.getByRole("button");

  // verify text if it is empty or greater than 600 char

  fireEvent.change(inputText, {target: {value: ""}});
  fireEvent.click(button);
  let invalidMessage = contianer.getElementsByClassName("invalid")[0];
  expect(invalidMessage.textContent).toBe("Text must not be empty or greater than 600 char")

  // verify rate if the user choose a rate
  
  fireEvent.change(inputText, {target: {value: "abc234567"}});
  fireEvent.click(button);
  invalidMessage = contianer.getElementsByClassName("invalid")[0];
  expect(invalidMessage.textContent).toBe("Please choose a rate")


})