"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store";
import { clearSelectedEvent, fetchEventById, updateEvent } from "../../../../store/slices/eventsSlice";
import { useRouter, useParams } from "next/navigation";
import ProtectedRoute from "../../../../components/ProtectedRoute";

export default function EditEventPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();

  const eventId = params?.id as string;

  const { selectedEvent, loading, error } = useSelector((state: RootState) => state.events);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(fetchEventById(eventId));

    return () => {
      dispatch(clearSelectedEvent())
    }
  }, [dispatch, eventId]);

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDate(selectedEvent.date);
      setDescription(selectedEvent.description);
      setCategory(selectedEvent.category)
    }
  }, [selectedEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(updateEvent({ id: eventId, title, date, description }));
      router.push("/");
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl mb-4">Editar Evento</h1>

        {loading ? (
          <p>Cargando evento...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border p-2 rounded"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="border p-2 rounded"
            />
            <textarea
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border p-2 rounded h-32"
            />
            <input
              type="text"
              placeholder="Categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
            >
              Guardar Cambios
            </button>
          </form>
        )}
      </div>
    </ProtectedRoute>
  );
}
