type AlternativeItem = {
  originalItem: string;
  amount: string;
  calories: string;
};

type AlternativeSectionProps = {
  alternatives: AlternativeItem[];
};

export default function AlternativeSection({ alternatives }: AlternativeSectionProps) {
  return (
    <section className="mt-8 bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Alternatives Needed</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Calories
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {alternatives.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.originalItem}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.calories}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
} 