import axios from "axios";
import type { Note } from "../types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(
  page: number,
  perPage: number,
  tag?: string,
  search?: string
): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, tag, search },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
}

export async function createNote(
  noteData: CreateNoteParams
): Promise<Note> {
  const response = await api.post<Note>("/notes", noteData);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(
    `/notes/${id}`
  );
  return response.data;
}