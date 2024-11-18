interface ServingSelectorProps {
  options: Array<{ value: number; label: string }>;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ServingSelector = ({ options, value, onChange }: ServingSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="servings" className="text-sm">per servings:</label>
      <select 
        id="servings" 
        className="border rounded-md px-2 py-1 text-sm"
        value={value}
        onChange={onChange}
      >
        {options.map(({value, label}) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
