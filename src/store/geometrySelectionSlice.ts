import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as THREE from "three";

export interface SelectedGeometry {
  mesh: THREE.Mesh;
  faceIndex: number;
  point: THREE.Vector3;
  materialId?: string;
}

interface GeometrySelectionState {
  selectedGeometry: SelectedGeometry | null;
  highlightedMeshes: THREE.Mesh[];
  selectedGeometries: Record<string, SelectedGeometry>;
}

const initialState: GeometrySelectionState = {
  selectedGeometry: null,
  highlightedMeshes: [],
  selectedGeometries: {},
};

export const geometrySelectionSlice = createSlice({
  name: "geometrySelection",
  initialState,
  reducers: {
    selectGeometry: (state, action: PayloadAction<SelectedGeometry | null>) => {
      state.selectedGeometry = action.payload;
    },

    clearSelection: (state) => {
      state.selectedGeometry = null;
      state.selectedGeometries = {};
    },

    addHighlightedMesh: (state, action: PayloadAction<THREE.Mesh>) => {
      const mesh = action.payload;
      const exists = state.highlightedMeshes.find((m) => m.uuid === mesh.uuid);
      if (!exists) {
        state.highlightedMeshes.push(mesh);
      }
    },

    addHighlightedMeshes: (state, action: PayloadAction<THREE.Mesh[]>) => {
      const existingUuids = new Set(state.highlightedMeshes.map((m) => m.uuid));
      action.payload.forEach((mesh) => {
        if (!existingUuids.has(mesh.uuid)) {
          existingUuids.add(mesh.uuid);
          state.highlightedMeshes.push(mesh);
        }
      });
    },

    removeHighlightedMesh: (state, action: PayloadAction<THREE.Mesh>) => {
      const meshUuid = action.payload.uuid;
      state.highlightedMeshes = state.highlightedMeshes.filter((mesh) => mesh.uuid !== meshUuid);
    },

    removeHighlightedMeshes: (state, action: PayloadAction<string[]>) => {
      const uuidsToRemove = new Set(action.payload);
      state.highlightedMeshes = state.highlightedMeshes.filter(
        (mesh) => !uuidsToRemove.has(mesh.uuid),
      );
    },

    addSelectedGeometry: (state, action: PayloadAction<SelectedGeometry>) => {
      const geometry = action.payload;
      if (geometry.materialId) {
        state.selectedGeometries[geometry.mesh.uuid] = geometry;
      }
    },

    addSelectedGeometries: (state, action: PayloadAction<SelectedGeometry[]>) => {
      action.payload.forEach((geometry) => {
        if (geometry.materialId) {
          state.selectedGeometries[geometry.mesh.uuid] = geometry;
        }
      });
    },

    removeSelectedGeometry: (state, action: PayloadAction<string>) => {
      const meshUuid = action.payload;
      delete state.selectedGeometries[meshUuid];
    },

    removeSelectedGeometries: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((meshUuid) => {
        delete state.selectedGeometries[meshUuid];
      });
    },

    clearSelectedGeometries: (state) => {
      state.selectedGeometries = {};
    },

    clearHighlights: (state) => {
      state.highlightedMeshes = [];
    },
  },
});

export const {
  selectGeometry,
  clearSelection,
  addHighlightedMesh,
  addHighlightedMeshes,
  removeHighlightedMesh,
  removeHighlightedMeshes,
  clearHighlights,
  addSelectedGeometry,
  addSelectedGeometries,
  removeSelectedGeometry,
  removeSelectedGeometries,
  clearSelectedGeometries,
} = geometrySelectionSlice.actions;

export default geometrySelectionSlice.reducer;
