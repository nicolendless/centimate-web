interface Expense {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;  
  notes?: string;
}

interface ExpenseTableProps {
  expenses: Expense[];
}

export const ExpenseTable = ({ expenses }: ExpenseTableProps) => {
  return (
    <div className="mt-4">
      <div className="w-full border rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-100 text-gray-700 font-semibold p-2">
          <span>Title</span>
          <span>Category</span>
          <span>Amount</span>
          <span>Date</span>          
        </div>
        {expenses.map((expense) => (
          <div 
            key={expense.id}
            className="grid grid-cols-4 p-2 border-gray-200 text-gray-800"
          >
            <span>{expense.title}</span>
            <span>{expense.category}</span>
            <span>{expense.amount}</span>
            <span>{expense.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
