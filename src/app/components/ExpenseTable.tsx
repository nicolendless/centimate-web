"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from "lucide-react";
import { CATEGORIES } from "../lib/categories";

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
  currentPage: number;
  totalPages: number;
}

export const ExpenseTable = ({ expenses, currentPage, totalPages }: ExpenseTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const formatCategory = (category: string) => 
    category.charAt(0) + category.slice(1).toLowerCase();


  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "" || formatCategory(expense.category) === selectedCategory)
  );

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="mt-6 mx-auto max-w-4xl">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-lg w-full outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="w-full border rounded-lg overflow-hidden shadow-md">
        <div className="grid grid-cols-4 bg-gray-100 text-gray-700 font-semibold p-3 border-b">
          <span>Title</span>
          <span>Category</span>
          <span>Amount</span>
          <div 
            className="flex items-center gap-1 cursor-pointer text-left"
            onClick={toggleSortOrder}
          >
            <span>Date</span> 
            {sortOrder === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          </div>
        </div>


        {sortedExpenses.length === 0 ? (
          <div className="text-center p-4 text-gray-500">No expenses found.</div>
        ) : (
          sortedExpenses.map((expense, index) => (
            <div 
              key={expense.id}
              className={`grid grid-cols-4 p-4 text-gray-900 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b`}
            >
              <span>{expense.title}</span>
              <span>{formatCategory(expense.category)}</span>
              <span>{expense.amount.toFixed(2)} €</span>
              <span>{expense.date}</span>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <Link
          href={`?page=${currentPage - 1}`}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${currentPage === 1 ? "bg-gray-400 pointer-events-none" : "bg-indigo-600 hover:bg-indigo-500"}`}
        >
          <ChevronLeft size={20} />
          Previous
        </Link>
        
        <span className="text-gray-800 font-medium">Page {currentPage} of {totalPages}</span>
        
        <Link
          href={`?page=${currentPage + 1}`}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${currentPage >= totalPages ? "bg-gray-400 pointer-events-none" : "bg-indigo-600 hover:bg-indigo-500"}`}
        >
          Next
          <ChevronRight size={20} />
        </Link>
      </div>
    </div>
  );
};
