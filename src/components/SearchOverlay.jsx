import { useEffect, useRef } from "react";

export default function SearchOverlay({
  open,
  value,
  onChange,
  onClose,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    // disable body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // focus
    requestAnimationFrame(() => inputRef.current?.focus());

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* top bar */}
      <div className="absolute left-0 right-0 top-0 p-3">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 rounded-2xl border border-(--border-color) bg-(--bg-card) shadow-(--shadow) px-3 py-2">
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Search notes"
              maxLength={50}
              className="w-full border-0 focus:outline-none focus:ring-0"
            />
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 rounded-xl hover:bg-black/5 text-(--text-default)" 
              aria-label="Close search"
              title="Close (Esc)"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
