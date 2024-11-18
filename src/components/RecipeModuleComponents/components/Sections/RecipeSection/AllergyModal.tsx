type AllergyModalProps = {
  isOpen: boolean;
  itemName: string;
  onCancel: () => void;
  onIgnore: () => void;
  onAlternative: () => void;
};

export const AllergyModal = ({
  isOpen,
  itemName,
  onCancel,
  onIgnore,
  onAlternative
}: AllergyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full relative">
        <h2 className="text-xl font-semibold mb-4">Allergy Option</h2>
        <p className="mb-6">
          {itemName} contains allergens. What would you like to do?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onIgnore}
            className="px-4 py-2 border rounded-md"
          >
            I&apos;m allergic
          </button>
          <button
            onClick={onAlternative}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Use Alternative
          </button>
        </div>
      </div>
    </div>
  );
};
