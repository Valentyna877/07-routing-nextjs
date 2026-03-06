"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './NotesPage.module.css';
import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import { useDebouncedCallback } from 'use-debounce';
import type { NoteTag } from "@/types/note";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((q: string) => {
    setQuery(q);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", query, page, tag],
    queryFn: () => fetchNotes( page, 12, tag === "all" ? undefined : (tag as NoteTag), query),
    placeholderData: (prev: FetchNotesResponse | undefined) => {
     return page > 1 ? prev : undefined;
    },
    // placeholderData: keepPreviousData,
    // keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });

  // const notes = data?.notes ?? [];
  // const totalPages = data?.totalPages ?? 0;
    const { notes = [], totalPages = 0 } = data ?? {}

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage message="Failed to load notes." />}

      {!isLoading && !isError && notes.length === 0 && (<ErrorMessage message="No notes found" />)}
      {/* {data !== undefined && data?.notes.length === 0 && (
        <ErrorMessage message="No notes found" />
      )} */}
      
      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}