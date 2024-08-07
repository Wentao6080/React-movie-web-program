import { useEffect, useState, useContext } from "react";
import "./Forum.css";
import {
  getReviews,
  storeReviews,
} from "../data/Data_repository";
import { username } from "../App";
const Forum = () => {
  const [review, setReview] = useState({ rate: "", text: "" });
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const {currentuser} = useContext(username);

// set values to review state
  const handleonclick = (event) => {
    setReview((review) => ({
      ...review,
      [event.target.name]: event.target.value,
    }));
  };


  const handlesubmit = async (event) => {
    event.preventDefault();
// verify user input
    if (!review.text || review.text.length >= 600) {
      setError("Text must not be empty or greater than 600 char");
      return;
    }
    if (!review.rate) {
      setError("Please choose a rate");
      return;
    }
// save reviews to database and set to reviews state
    let new_review = await storeReviews(currentuser.email, review.rate, review.text);
    new_review.user ={username: currentuser.name};
    setReviews((re) => [...re, new_review]);
    setReview({ rate: "", text: "" });
    setError("");
  };

  // get all the review from database when first render this page
  useEffect(() => {
    fetchReviews()
  }, []);

  const fetchReviews = async () => {
    const re = await getReviews();
    setReviews(re);
  }

  return (
    <div className="Forum">
      <h2>Review: The war film</h2>
      <form onSubmit={handlesubmit}>
        <div className="rate" onClick={handleonclick}>
          <input type="radio" id="star5" name="rate" value="5" />
          <label htmlFor="star5" title="text">
            5 stars
          </label>
          <input type="radio" id="star4" name="rate" value="4" />
          <label htmlFor="star4" title="text">
            4 stars
          </label>
          <input type="radio" id="star3" name="rate" value="3" />
          <label htmlFor="star3" title="text">
            3 stars
          </label>
          <input type="radio" id="star2" name="rate" value="2" />
          <label htmlFor="star2" title="text">
            2 stars
          </label>
          <input type="radio" id="star1" name="rate" value="1" />
          <label htmlFor="star1" title="text">
            1 star
          </label>
        </div>
        <textarea
          onChange={handleonclick}
          name="text"
          value={review.text || ""}
        ></textarea>

        {error && <p className="invalid">{error}</p>}

        <div id="post">
          <button className="butt">Post</button>
        </div>
      </form>

      <div className="Reviews">
        <h2>Reviews: </h2>
        <div className="Reviews-content">
          {reviews &&
            reviews.map((items, index) => {
              return (
                <div className="post-content" key={index}>
                  <h3>{items.user.username}</h3>
                  <div className="modify">
                    <div className="re-text">
                      <p>
                        <b>Rate: </b>
                        {items.rate}
                      </p>
                      <p>
                        <b>Review: </b>
                        {items.text}
                      </p>
                    </div>
                    <div className="Edit">
                      <button>
                        <span className="material-icons" id="edit">
                          edit
                        </span>
                      </button>
                      <button>
                        <span
                          className="material-icons"
                          id="delete"
                          value={index}
                        >
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Forum;
