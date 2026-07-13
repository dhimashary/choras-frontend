import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";
import type { RootState } from "@/store";
import {
  selectGeometry as selectGeometryAction,
  clearSelection as clearSelectionAction,
  addHighlightedMesh as addHighlightedMeshAction,
  addHighlightedMeshes as addHighlightedMeshesAction,
  removeHighlightedMesh as removeHighlightedMeshAction,
  removeHighlightedMeshes as removeHighlightedMeshesAction,
  clearHighlights as clearHighlightsAction,
  addSelectedGeometry as addSelectedGeometryAction,
  addSelectedGeometries as addSelectedGeometriesAction,
  removeSelectedGeometry as removeSelectedGeometryAction,
  removeSelectedGeometries as removeSelectedGeometriesAction,
  clearSelectedGeometries as clearSelectedGeometriesAction,
} from "@/store/geometrySelectionSlice";
import type { SelectedGeometry } from "@/store/geometrySelectionSlice";

export function useGeometrySelection() {
  const dispatch = useDispatch();
  const { selectedGeometry, highlightedMeshes, selectedGeometries } = useSelector(
    (state: RootState) => state.geometrySelection,
  );

  const highlightedMeshesSet = useMemo(() => new Set(highlightedMeshes), [highlightedMeshes]);

  const selectGeometry = useCallback(
    (geometry: SelectedGeometry | null) => {
      dispatch(selectGeometryAction(geometry));
    },
    [dispatch],
  );

  const clearSelection = useCallback(() => {
    dispatch(clearSelectionAction());
  }, [dispatch]);

  const addHighlightedMesh = useCallback(
    (mesh: THREE.Mesh) => {
      dispatch(addHighlightedMeshAction(mesh));
    },
    [dispatch],
  );

  const removeHighlightedMesh = useCallback(
    (mesh: THREE.Mesh) => {
      dispatch(removeHighlightedMeshAction(mesh));
    },
    [dispatch],
  );

  const addHighlightedMeshes = useCallback(
    (meshes: THREE.Mesh[]) => {
      dispatch(addHighlightedMeshesAction(meshes));
    },
    [dispatch],
  );

  const removeHighlightedMeshes = useCallback(
    (meshUuids: string[]) => {
      dispatch(removeHighlightedMeshesAction(meshUuids));
    },
    [dispatch],
  );

  const clearHighlights = useCallback(() => {
    dispatch(clearHighlightsAction());
  }, [dispatch]);

  const addSelectedGeometry = useCallback(
    (geometry: SelectedGeometry) => {
      dispatch(addSelectedGeometryAction(geometry));
    },
    [dispatch],
  );

  const addSelectedGeometries = useCallback(
    (geometries: SelectedGeometry[]) => {
      dispatch(addSelectedGeometriesAction(geometries));
    },
    [dispatch],
  );

  const removeSelectedGeometry = useCallback(
    (materialId: string) => {
      dispatch(removeSelectedGeometryAction(materialId));
    },
    [dispatch],
  );

  const removeSelectedGeometries = useCallback(
    (meshUuids: string[]) => {
      dispatch(removeSelectedGeometriesAction(meshUuids));
    },
    [dispatch],
  );

  const clearSelectedGeometries = useCallback(() => {
    dispatch(clearSelectedGeometriesAction());
  }, [dispatch]);

  return {
    selectedGeometry,
    highlightedMeshes: highlightedMeshesSet,
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
    selectedGeometries,
    clearSelectedGeometries,
  };
}
