const baseUrl = "http://localhost:3001";
import { checkResponse } from "./request";

function getToken() {
  return localStorage.getItem("jwt");
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function postItem(item) {
  const token = getToken();
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(checkResponse);
}

function deleteItem(id) {
  const token = getToken();
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function addCardLike(cardId) {
  const token = getToken();
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function removeCardLike(cardId) {
  const token = getToken();
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function getUserData() {
  const token = getToken();
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
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
  }).then(checkResponse);
}

export {
  getItems,
  postItem,
  deleteItem,
  getUserData,
  updateUserData,
  addCardLike,
  removeCardLike,
};
