const express = require("express");
const fetch = require("cross-fetch");

const router = express.Router();

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
};

const handleResponse = (response, res) => {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const handleError = (error, res) => {
  console.error(error);
  res.status(500).send("An error occurred");
};

router.get("/restaurants", (req, res) => {
  const { lat, lng } = req.query;
  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;

  console.log(url, req.query);
  fetch(url, { headers })
    .then((response) => handleResponse(response, res))
    .then((data) => res.status(200).json(data))
    .catch((error) => handleError(error, res));
});

router.get("/menu", (req, res) => {
  const { lat, lng, restaurantId } = req.query;
  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;

  fetch(url, { headers })
    .then((response) => handleResponse(response, res))
    .then((data) => res.status(200).json(data))
    .catch((error) => handleError(error, res));
});

router.get("/search", (req, res) => {
  const { lat, lng, str } = req.query;
  const url = `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${lat}&lng=${lng}&str=${str}`;

  fetch(url, { headers })
    .then((response) => handleResponse(response, res))
    .then((data) => res.status(200).json(data))
    .catch((error) => handleError(error, res));
});

router.get("/youtube-search", async (req, res) => {
  try {
    const query = req.query.q;
    const response = await fetch(
      `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
