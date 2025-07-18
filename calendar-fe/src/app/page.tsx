"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import {
  fetchEventsWithFilters,
  fetchEventsCount,
  deleteEvent,
  setConditions,
  setPage,
} from "../store/slices/eventsSlice";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import dayjs from "dayjs";
import { FaPlus, FaTrash, FaPencilAlt, FaSignOutAlt } from "react-icons/fa";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();


  const { events, loading, error, filters, totalPages } = useSelector(
    (state: RootState) => state.events
  );

  const [searchValue, setSearchValue] = useState(filters.conditions.title || "");

  
  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchEventsCount());
      await dispatch(fetchEventsWithFilters());
    };
    loadData();
  }, [dispatch, filters.conditions]);

  
  useEffect(() => {
    dispatch(fetchEventsWithFilters());
  }, [dispatch, filters.page]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchValue.trim() !== "") {
        dispatch(setConditions({ title: searchValue }));
      } else {
        dispatch(setConditions({}));
      }

    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, dispatch]);

  const handleDelete = (id: string) => {
    if (confirm("¿Seguro que quieres eliminar este evento?")) {
      dispatch(deleteEvent(id)).then(() => {
        dispatch(fetchEventsCount());
        dispatch(fetchEventsWithFilters());
      });
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setPage(page));
    }
  };

  const getBadgeClass = (date: string) => {
    const today = dayjs().startOf("day");
    const eventDate = dayjs(date, ["YYYY-MM-DD", "DD/MM/YYYY"]).startOf("day");

    console.log(date, {
      sameDay: eventDate.isSame(today, "day"),
      diff: eventDate.diff(today, "day"),
    });

    if (eventDate.isSame(today, "day")) {
      return "bg-green-100 text-green-700 border border-green-200";
    } else if (eventDate.isAfter(today) && eventDate.diff(today, "day") <= 3) {
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    } else {
      return "bg-blue-100 text-blue-700 border border-blue-200";
    }
  };

  return (
    <ProtectedRoute>
      <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
        <h1 className="text-xl font-bold">📅 Mis Eventos</h1>
        <button
          onClick={() => {
            console.log("Logout...");
            router.push("/login");
          }}
          className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
        >
          <FaSignOutAlt className="text-lg" />
          Logout
        </button>
      </header>
      <div className="p-8 flex flex-col items-center">
        <div className="flex flex-col w-1/2">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold">Eventos</h1>
            <button
              title="Crear evento"
              onClick={() => router.push("/events/new")}
              className="bg-green-500 text-white px-3 py-1 rounded flex items-center cursor-pointer"
            >
              Crear Evento
              <FaPlus className="text-lg ml-1" />
            </button>
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            {/* 🔍 Buscador */}
            <input
              type="text"
              placeholder="Buscar por título..."
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              className="border p-2 rounded w-3/5  focus:ring-2"
            />
            {/* Buscador por fecha */}
            <input
              type="date"
              placeholder="Buscar por fecha"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  dispatch(setConditions({ ...filters.conditions, date: undefined }));
                } else {
                  dispatch(setConditions({ ...filters.conditions, date: value }));
                }

              }}
              value={filters.conditions.date || ""}
              className="border p-2 rounded focus:ring-2 w-2/5"
            />
          </div>

          {/* 📄 Lista de eventos */}
          {loading ? (
            <p>Cargando eventos...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : Array.isArray(events) && events.length === 0 ? (
            <p>No se encontraron eventos.</p>
          ) : (
            <div className="flex flex-wrap gap-6 w-full justify-center">
              {events?.map((event) => (
                <div key={event.id} className="bg-white shadow-lg rounded-lg py-3 mt-2 flex flex-col w-1/5 hover:shadow-md transition hover:-translate-y-1 hover:scale-[1.02]">
                  <div className="flex flex-col">
                    <div className="flex justify-end mb-0.5 mr-1">
                      <div className="bg-green-200 rounded-full px-2 py-0.5">
                        <span className="text-xs text-green-600">{event.category}</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-2 px-6">
                      <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
                      <div className="flex flex-row">
                        {/* <FaCalendarAlt className="text-lg"/> */}
                        <p className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${getBadgeClass(event.date)}`}>📅{dayjs(event.date).format("DD/MM/YYYY")}</p>
                      </div>
                    </div>
                    <div className="px-8 mb-4">
                      <p className="text-gray-600 text-justify line-clamp-3">{event.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 px-6">
                    <button
                      title="Editar evento"
                      onClick={() => router.push(`/events/${event.id}/edit`)}
                      className="hover:bg-[#335aac] hover:text-white border border-[#335aac] text-[#335aac]  px-3 py-1 rounded-lg cursor-pointer"
                    >
                      <FaPencilAlt className="text-lg" />
                    </button>
                    <button
                      title="Eliminar evento"
                      onClick={() => handleDelete(event.id)}
                      className="border border-red-500 text-red-500 px-3 py-1 hover:bg-red-500 hover:text-white rounded-lg cursor-pointer"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 🔥 Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 sticky bottom-0 bg-white py-2">
              <button
                onClick={() => goToPage(filters.page!.pageIndex - 1)}
                disabled={filters.page!.pageIndex === 1}
                className={`px-3 py-1 rounded ${filters.page!.pageIndex === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white"
                  }`}
              >
                &laquo; Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-1 rounded ${filters.page!.pageIndex === i + 1
                    ? "bg-blue-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(filters.page!.pageIndex + 1)}
                disabled={filters.page!.pageIndex === totalPages}
                className={`px-3 py-1 rounded ${filters.page!.pageIndex === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white"
                  }`}
              >
                Siguiente &raquo;
              </button>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
