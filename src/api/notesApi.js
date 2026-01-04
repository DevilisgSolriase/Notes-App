import { apiFetch } from "./client";

export function getNotes() {
  return apiFetch("/notes");
}

export function getNote(id) {
  return apiFetch(`/notes/${id}`);
}

export function createNote(note) {
  return apiFetch("/notes", {
    method: "POST",
    body: JSON.stringify(note),
  });
}

export function updateNote(id, note) {
  return apiFetch(`/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify(note),
  });
}

export function deleteNote(id) {
  return apiFetch(`/notes/${id}`, {
    method: "DELETE",
  });
}