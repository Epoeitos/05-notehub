import axios from "axios";
import { type Note, type NewNote } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  search?: string;
  perPage?: number;
  tag?: string;
  sortBy?: "createdAt" | "updatedAt";
}

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes({
  page,
  search,
  perPage = 12,
  tag,
  sortBy,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const res = await axios.get<FetchNotesResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        page,
        perPage,
        search: search?.trim() || undefined,
        tag,
        sortBy,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const res = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    note,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}
