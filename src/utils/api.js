const baseUrl = "http://localhost:3001";

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// Helper: get token from localStorage
function getToken() {
  return localStorage.getItem("jwt");
}

/* ---------- PUBLIC ROUTE ---------- */
// No token needed for this one
function getItems() {
  return fetch(`${baseUrl}/items`).then(handleResponse);
}

/* ---------- PROTECTED ROUTES ---------- */
function postItem(item) {
  const token = getToken();
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(handleResponse);
}

function deleteItem(id) {
  const token = getToken();
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

/* ---------- CARD LIKES ---------- */
function addCardLike(cardId) {
  const token = getToken();
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

function removeCardLike(cardId) {
  const token = getToken();
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

/* ---------- USER INFO ---------- */
function getUserData() {
  const token = getToken();
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

function updateUserData({ name, avatar }) {
  const token = getToken();
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleResponse);
}

export {
  getItems,
  postItem,
  deleteItem,
  getUserData,
  updateUserData,
  addCardLike,
  removeCardLike
};
