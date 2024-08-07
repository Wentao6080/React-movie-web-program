import axios from "axios";


// movie datas
// const movie = [
//   {
//     movieName: "The war",
//     movieURL:
//       "https://images.unsplash.com/photo-1691066261207-1001c07b79ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1939&q=80",
//     data: "09.10.2023",
//   },
//   {
//     movieName: "The forest",
//     movieURL:
//       "https://images.unsplash.com/photo-1691685783089-02f22ac1f9bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1885&q=80",
//     data: "07.11.2023",
//   },
//   {
//     movieName: "The bed",
//     movieURL:
//       "https://images.unsplash.com/photo-1692455067486-d4637182a61c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
//     data: "30.12.2023",
//   },
//   {
//     movieName: "Animals",
//     movieURL:
//       "https://images.unsplash.com/photo-1682687220305-ce8a9ab237b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
//     data: "01.01.2024",
//   },
//   {
//     movieName: "God and sea",
//     movieURL:
//       "https://images.unsplash.com/photo-1691715502369-3fae29561ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
//     data: "05.05.2024",
//   },
//   {
//     movieName: "The Lonelinese",
//     movieURL:
//       "https://images.unsplash.com/photo-1691765612455-4f09cdc93977?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
//     data: "07.05.2024",
//   },
// ];

// const inintData = () => {
//   localStorage.setItem("movie", JSON.stringify(movie));
//   if (localStorage.getItem("users") === null) {
//     localStorage.setItem("users", JSON.stringify([]));
//   }
//   if (localStorage.getItem("user") === null) {
//     localStorage.setItem("user", "");
//   }
// };
const port = "http://localhost:4000/";


// get all the movie from database
const getmovies = async () => {
  const response = await axios.get(port + "api/movie");
  const movies = response.data;
  return movies;
}


// create a user into database
const storeUser = async (user) => {
  const response = await axios.post(port + "api/users", user);
  const current_user = response.data;
  return current_user;
}


// check if the usename is unique
const verifyUnique = async (user) => {
  const response = await axios.post(port + "api/users/unify", user);
  return response.data;
}


// login: check a user if it is in database 
const getUser = async (email, userpassword) => {
  const currentUser = await axios.get(port + "api/users/login", {params: {email: email, password: userpassword}});
  return currentUser.data;
};

// delete user and his reviews
const deleteUser = async (email) => {
  await axios.delete(port + "api/users/user", {params: {email: email}})
};

// change user password or username
const changeDetail = async (data) => {
  const reponse = await axios.put(port + "api/users/user", data)
  return reponse.data;
};

// store a review to database
const storeReviews = async (email, rate, post) => {
  const data = {text: post, rate: rate, email: email};
  const reponse = await axios.post(port + "api/reviews", data);
  return reponse.data;
};

// get all the reviews from database
const getReviews = async () => {
  const reponse = await axios.get(port + "api/reviews")
  return reponse.data;
};


// verify user input
const verifyInput = (user) => {
  const errors = {};
  if (!user.name) {
    errors.name = "Name is required";
  } else if (user.name.length > 15) {
    errors.name = "Name must be less than 15 chars";
  }

  if (!user.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = "Please enter a valid email format";
  }

  if (!user.password) {
    errors.password = "Password is required";
  } else if (
    !/^.*(?=.{8,})(?=.*\d)(?=.*[A-Z]{2,})(?=.*[a-z]{2,})(?=.*[!@#$%^&*\(\)]).*$/.test(
      user.password
    )
  ) {
    errors.password =
      "Password must be great than 8 and contain 2 capital letters and at least 1 speical symbol and 1 digit";
  }
  return errors;
};

export {
  getmovies,
  storeUser,
  verifyUnique,
  getUser,
  verifyInput,
  deleteUser,
  changeDetail,
  storeReviews,
  getReviews,
};
