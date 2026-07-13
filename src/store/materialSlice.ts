import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Load groups from localStorage on initialization
const loadMaterialCategoriesFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem("materialCategories");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const materialSlice = createSlice({
  name: "material",
  initialState: {
    maerialCategories: loadMaterialCategoriesFromStorage(), // Store groups directly in Redux
  },
  reducers: {
    addMaterialCategory: (state, action: PayloadAction<string>) => {
      // Add a single group if it doesn't exist
      if (!state.maerialCategories.includes(action.payload)) {
        state.maerialCategories.push(action.payload);
        state.maerialCategories.sort((a, b) => a.localeCompare(b));
        // Persist to localStorage
        localStorage.setItem("materialCategories", JSON.stringify(state.maerialCategories));
      }
    },
    removeMaterialCategory: (state, action: PayloadAction<string>) => {
      state.maerialCategories = state.maerialCategories.filter((g) => g !== action.payload);
      // Persist to localStorage
      localStorage.setItem("materialsCategories", JSON.stringify(state.maerialCategories));
    },
    syncCategoriesFromMaterials: (state, action: PayloadAction<string[]>) => {
      const merged = Array.from(new Set([...state.maerialCategories, ...action.payload]));
      merged.sort((a, b) => a.localeCompare(b));
      state.maerialCategories = merged;
      // Persist to localStorage
      localStorage.setItem("materialCategories", JSON.stringify(state.maerialCategories));
    },
  },
});

export const { addMaterialCategory, removeMaterialCategory, syncCategoriesFromMaterials } =
  materialSlice.actions;

export const materialReducer = materialSlice.reducer;
