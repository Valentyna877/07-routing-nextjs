"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  const handleCloseModal = () => {
    router.back();
  };

  return (
    <Modal onClose={handleCloseModal}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
          </div>
          <p className={css.tag}>{note?.tag}</p>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>
            Created:{" "}
            {note?.createdAt
              ? new Date(note.createdAt).toLocaleDateString()
              : ""}
          </p>
          <button onClick={handleCloseModal} className={css.backBtn}>
            Go back
          </button>
        </div>

        {isLoading && <p>Loading, please wait...</p>}
        {error && !note && <p>Something went wrong.</p>}
      </div>
    </Modal>
  );
}