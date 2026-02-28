"use client";

import { useState, useRef, useActionState, useEffect, useCallback } from "react";
import SlideCard from "@/app/admin/_components/slideCard";
import { createSlider, getAllSliders, deleteSlider, toggleSliderStatus, bulkDeleteSliders } from "@/actions/slider";
import { useNotification } from "@/app/admin/_components/notification";
import DeleteConfirmation from "@/app/admin/_components/deleteConfirmation";

type Slide = {
  id: string;
  name: string;
  imageUrl: string;
  status: boolean;
};

export default function SliderPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showBulkDelete, setShowBulkDelete] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(createSlider, undefined);
  const { notify } = useNotification();

  const fetchSliders = useCallback(async () => {
    const result = await getAllSliders();
    if (result.sliders) {
      setSlides(result.sliders);
    }
  }, []);

  useEffect(() => {
    fetchSliders();
  }, [fetchSliders]);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      setFile(null);
      fetchSliders();
      notify(state.success, "success");
    }
    if (state?.error) {
      notify(state.error, "error");
    }
  }, [state, fetchSliders, notify]);

  async function handleToggle(id: string, active: boolean) {
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, status: active } : s)));
    const result = await toggleSliderStatus(id, !active);
    if (result.error) {
      setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, status: !active } : s)));
      notify(result.error, "error");
    }
  }

  async function handleDelete(id: string) {
    const result = await deleteSlider(id);
    if (result.success) {
      setSlides((prev) => prev.filter((s) => s.id !== id));
      notify(result.success, "success");
    } else if (result.error) {
      notify(result.error, "error");
    }
  }

  function handleView(id: string) {
    // TODO: wire up view logic
  }

  function handleSelect(id: string, selected: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (selected) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  async function handleBulkDelete() {
    const ids = Array.from(selectedIds);
    const result = await bulkDeleteSliders(ids);
    if (result.success) {
      setSlides((prev) => prev.filter((s) => !selectedIds.has(s.id)));
      setSelectedIds(new Set());
      notify(result.success, "success");
    } else if (result.error) {
      notify(result.error, "error");
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-xl font-bold text-gray-800">Slider</h1>



      {/* Top Bar */}
      <form ref={formRef} action={formAction} className="flex items-center gap-3 flex-wrap">
        <input
          type="text"
          name="name"
          placeholder="Slider Name"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-36"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-400 hover:border-gray-400 transition-colors w-40 text-left truncate"
        >
          {file ? file.name : "Choose file.."}
        </button>
        <input
          ref={fileRef}
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="hidden"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-md transition-colors disabled:opacity-50"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
        <button
          type="button"
          disabled={selectedIds.size === 0}
          onClick={() => setShowBulkDelete(true)}
          className="bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold px-6 py-2 rounded-md transition-colors flex items-center gap-1 disabled:opacity-50"
        >
          Delete
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="mt-0.5"
          >
            <path
              d="M3 5l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {slides.map((slide) => (
          <SlideCard
            key={slide.id}
            image={slide.imageUrl}
            name={slide.name}
            active={slide.status}
            selected={selectedIds.has(slide.id)}
            onView={() => handleView(slide.id)}
            onDelete={() => setDeleteTarget({ id: slide.id, name: slide.name })}
            onToggle={(active) => handleToggle(slide.id, active)}
            onSelect={(selected) => handleSelect(slide.id, selected)}
          />
        ))}
      </div>

      {/* Delete Confirmation Popup */}
      {deleteTarget && (
        <DeleteConfirmation
          itemName={deleteTarget.name}
          onCancel={() => setDeleteTarget(null)}
          onDelete={() => {
            handleDelete(deleteTarget.id);
            setDeleteTarget(null);
          }}
        />
      )}

      {/* Bulk Delete Confirmation Popup */}
      {showBulkDelete && (
        <DeleteConfirmation
          itemName={`${selectedIds.size} selected slider(s)`}
          onCancel={() => setShowBulkDelete(false)}
          onDelete={() => {
            handleBulkDelete();
            setShowBulkDelete(false);
          }}
        />
      )}
    </div>
  );
}
