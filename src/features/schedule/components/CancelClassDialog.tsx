"use client";

interface CancelClassDialogProps {
  error: string | null;
  onConfirm: () => void;
  onClose: () => void;
}

export function CancelClassDialog({
  error,
  onConfirm,
  onClose,
}: CancelClassDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Cancel Class?</h3>
        <p className="text-gray-600 text-sm mb-4">
          This will permanently delete the class. This action cannot be undone.
        </p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
          >
            Yes, Cancel Class
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Keep Class
          </button>
        </div>
      </div>
    </div>
  );
}
