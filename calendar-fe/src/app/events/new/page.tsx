"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store";
import { createEvent } from "../../../store/slices/eventsSlice";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function NewEventPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createEvent({ title, date, description, category }));
      router.push("/");
    } catch (error) {
      console.error("Error al crear el evento:", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl mb-4">Crear Nuevo Evento</h1>
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
            type="test"
            placeholder="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Crear Evento
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
