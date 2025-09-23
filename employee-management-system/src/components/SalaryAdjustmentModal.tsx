import React, { useState } from "react";
import { X, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { Employee } from "../types";

interface SalaryAdjustmentModalProps {
  employee: Employee;
  onSubmit: (employeeId: string, newSalary: number, reason: string) => void;
  onClose: () => void;
}

const SalaryAdjustmentModal: React.FC<SalaryAdjustmentModalProps> = ({
  employee,
  onSubmit,
  onClose,
}) => {
  const [newSalary, setNewSalary] = useState(employee.salary);
  const [reason, setReason] = useState("");
  const [adjustmentType, setAdjustmentType] = useState<"amount" | "percentage">(
    "amount"
  );
  const [adjustmentValue, setAdjustmentValue] = useState(0);

  const calculateNewSalary = () => {
    if (adjustmentType === "percentage") {
      return employee.salary + (employee.salary * adjustmentValue) / 100;
    } else {
      return employee.salary + adjustmentValue;
    }
  };

  const handleAdjustmentChange = (value: number) => {
    setAdjustmentValue(value);
    const calculated = calculateNewSalary();
    setNewSalary(Math.max(0, calculated));
  };

  const salaryDifference = newSalary - employee.salary;
  const percentageChange = (salaryDifference / employee.salary) * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newSalary > 0 && reason.trim()) {
      onSubmit(employee.id, newSalary, reason);
    }
  };

  const presetAdjustments = [
    { label: "5% Increase", type: "percentage" as const, value: 5 },
    { label: "10% Increase", type: "percentage" as const, value: 10 },
    { label: "$5K Increase", type: "amount" as const, value: 5000 },
    { label: "$10K Increase", type: "amount" as const, value: 10000 },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* {Header} */}

        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-green-600 mr-2" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Salary Adjustment
              </h2>
              <p className="text-sm text-gray-500">
                {employee.firstName}
                {employee.lastName} - {employee.position}
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Current Salary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Current Salary
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${employee.salary.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Annual</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">Monthly</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${Math.round(employee.salary / 12).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          {/* Quick Adjustment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Adjustments
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presetAdjustments.map((preset) => (
                <button
                  className="px-3 py-2 text-sm border border-gray-300 
                    rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
          {/* Adjustment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adjustment Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="amount"
                  className="mr-2"
                  checked={adjustmentType === "amount"}
                  onChange={(e) =>
                    setAdjustmentType(e.target.value as "amount")
                  }
                />
                Percentage
              </label>
            </div>
          </div>
          {/* Adjustment Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {adjustmentType === "percentage" ? "Percentage Change" : "Amount"}
            </label>
            <div className="relative">
              {adjustmentType === "amount" && (
                <span className="absolute left-3 top-1/2 transform -transalate-y-1/2 text-gray-500">
                  $
                </span>
              )}
              <input
                type="number"
                value={adjustmentType}
                onChange={(e) =>
                  handleAdjustmentChange(parseFloat(e.target.value) || 0)
                }
                className={`w-full border border-gray-300 rounded-lg py-2 focus:ring-2 
                    focus:ring-blue-500 focus:border-blue-500 ${
                      adjustmentType === "amount" ? "pl-8 pr-3" : "px-3"
                    }`}
                placeholder={adjustmentType === "percentage" ? "0" : "0"}
                step={adjustmentType === "percentage" ? "0.1" : "100"}
              />
              {adjustmentType === "percentage" && (
                <span className="absolute right-3 rop-1/2 transform -translate-y-1/2 text-gray-500">
                  %
                </span>
              )}
            </div>
          </div>
          {/* New Salary Preview */}
          <div className=" bg-blue-50 rounde-lg p-4 border border-blue-200">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-blue-800">New Salary</p>
              <div className="flex items-center">
                {salaryDifference > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                ) : salaryDifference < 0 ? (
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                ) : null}
                <span
                  className={`text-sm font-medium ${
                    salaryDifference > 0
                      ? "text-green-600"
                      : salaryDifference < 0
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {salaryDifference.toLocaleString()}(
                  {percentageChange > 0 ? "+" : ""}
                  {percentageChange.toFixed(1)}%)
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold text-blue-900">
              ${newSalary.toLocaleString()}
            </p>
            <p className="text-sm text-blue-700">
              ${Math.round(newSalary / 12).toLocaleString()}
              monthly
            </p>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Adjustment *
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Enter the reason for salary adjustment
           (e.g. perfomance review,promotion,market adjustment)"
              required
            />

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!reason.trim() || newSalary <= 0}
                className="px-4 py-2 bg-green hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white
                 rounded-lg flex items-center transition-colors"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Apply Adjustment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalaryAdjustmentModal;
