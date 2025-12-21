import { apiFetch } from "./client";

export function getNotes() {
  return apiFetch("/notes");
}

export function createNote(note) {
  return apiFetch("/notes", {
    method: "POST",
    body: JSON.stringify(note),
  });
}
