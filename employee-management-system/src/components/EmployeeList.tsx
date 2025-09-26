import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  DollarSign,
  Eye,
  ChevronDown,
  Users,
} from "lucide-react";
import { Employee, Department } from "../types";

interface EmployeeListProps {
  employees: Employee[];
  departments: Department[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onSalaryAdjustment: (employee: Employee) => void;
  onAdd: () => void;
}
const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  departments,
  onEdit,
  onDelete,
  onSalaryAdjustment,
  onAdd,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setselectedDepartment] = useState("");
  const [selectedStatus, setselectedStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.firstName
        .toLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      employee.lastName
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      employee.email
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      employee.position
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase());

    const matchesDepartment =
      !selectedDepartment || employee.department === selectedDepartment;
    const matchesStatus = !selectedStatus || employee.status === selectedStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    if (status === "active") {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    return `${baseClasses} bg-red-100 text-red-800`;
  };

  return (
    <div className="space-y-6">
      {/* Header*/}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600">Manage you team members</p>
        </div>
        <button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Eployee
        </button>
      </div>

      {/* Search and Filters*/}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search*/}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400
                h-4 w-4"
            />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/*Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown
              className={`h-4 w-4 ml-2 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        {/* Filter options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setselectedDepartment(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 
                            focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option value={dept.name} key={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setselectedStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 
                            focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setselectedDepartment("");
                    setselectedStatus("");
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/*Employee Table*/}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hire Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray 50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {employee.firstName[0]}
                            {employee.lastName[0]}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {employee.firstName}
                          {employee.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {employee.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.salary.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(employee.status)}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(employee.hireDate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onEdit(employee)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit Employee"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onSalaryAdjustment(employee)}
                        className="text-green-600 hover:text-blue-900 p-1"
                        title="Adjust Salary"
                      >
                        <DollarSign className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(employee.id)}
                        className="text-red-600 hover:text-blue-900 p-1"
                        title="Delete Employee"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No employees found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              No employees match your search criteria
            </p>
          </div>
        )}
      </div>
      {/* Summary*/}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="text-sm text-gray-600">
          Showing{filteredEmployees.length} of{employees.length} employees
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
