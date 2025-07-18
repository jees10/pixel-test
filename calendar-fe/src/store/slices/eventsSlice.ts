import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { RootState } from "..";


interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string
}

export interface RequestFilters<T> {
  conditions?: Array<Record<keyof T, any>> | Record<keyof T, any>,
  select?: Array<keyof T>,
  page?: {
    pageIndex: number,
    size: number
  },
}

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
  selectedEvent: Event | null;
  totalItems: number;
  filters: {
    conditions: Record<string, any>;
    page: {
      pageIndex: number;
      size: number;
    };
  };
  totalPages: number;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
  selectedEvent: null,
  totalItems: 0,
  filters: {
    conditions: {},
    page: {
      pageIndex: 1,
      size: 10
    }
  },
  totalPages: 0
};

const encodeFilters = (filters: RequestFilters<Event>): string =>
  encodeURIComponent(JSON.stringify(filters));

export const fetchEventsCount = createAsyncThunk(
  "events/fetchEventsCount",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { filters: { conditions } } = state.events;
    const newFilters = { conditions }
    try {
      const encoded = encodeFilters(newFilters);
      const response = await api.get(`/events/count?filter=${encoded}`);
      return response.data.count;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al contar eventos");
    }
  }
);

export const fetchEventsWithFilters = createAsyncThunk(
  "events/fetchEventsWithFilters",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { filters } = state.events;

    try {
      const encoded = encodeFilters(filters);
      const response = await api.get(`/events?filter=${encoded}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error al cargar eventos");
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (newEvent: Omit<Event, "id">, thunkAPI) => {
    try {
      const response = await api.post("/events", newEvent);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (updatedEvent: { id: string; title: string; date: string; description: string }, thunkAPI) => {
    try {
      const response = await api.put(`/events/${updatedEvent.id}`, updatedEvent);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (id: string, thunkAPI) => {
    try {
      const response = await api.get(`/events/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error al cargar el evento");
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id: string, thunkAPI) => {
    try {
      await api.delete(`/events/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error al eliminar el evento");
    }
  }
);


const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setConditions: (state, action) => {
      state.filters.conditions = action.payload;
      state.filters.page!.pageIndex = 1;
    },
    setPage: (state, action) => {
      state.filters.page!.pageIndex = action.payload;
    },
    setPageSize: (state, action) => {
      state.filters.page!.size = action.payload;
      state.filters.page!.pageIndex = 1;
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsWithFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsWithFilters.fulfilled, (state, action) => {
        const events = action.payload || [];
        const currentPage = state.filters.page.pageIndex || 1;

        if (events.length === 0 && currentPage > 1) {
          state.filters.page.pageIndex = currentPage - 1;
        } else {
          state.loading = false;
          state.events = action.payload || [];
        }

      })
      .addCase(fetchEventsWithFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      }).addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      }).addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedEvent = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }).addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e.id !== action.payload);
      }).addCase(fetchEventsCount.fulfilled, (state, action) => {
        state.totalItems = action.payload;
        state.totalPages = Math.ceil(state.totalItems / state.filters.page.size);
      });
  },
});
export const { setConditions, setPage, setPageSize, clearSelectedEvent } = eventsSlice.actions;
export default eventsSlice.reducer;

