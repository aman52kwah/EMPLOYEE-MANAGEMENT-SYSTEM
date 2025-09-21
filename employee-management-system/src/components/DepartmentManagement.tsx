import React, { useState } from "react";
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Users,
  DollarSign,
} from "lucide-react";
import { Department, Employee } from "../types";

interface DepartmentManagementProps {
  departments: Department[];
  employees: Employee[];
  onUpdateDepartments: (departments: Department[]) => void;
}
const DepartmentManagement: React.FC<DepartmentManagementProps> = ({
  departments,
  employees,
  onUpadateDepartments,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    manager: "",
    budget: 0,
  });
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      manager: "",
      budget: 0,
    });
    setEditingDepartment(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingDepartment) {
      const updatedDepartments = departments.map((dept) =>
        dept.id === editingDepartment.id
          ? { ...dept, ...formData, employeeCount: getEmployeeCount(dept.name) }
          : dept
      );
      onUpadateDepartments(updatedDepartments);
    } else {
      const newDepartment: Department = {
        id: Date.now().toString(),
        ...formData,
        employeeCount: 0,
      };
      onUpadateDepartments([...departments, newDepartment]);
    }
    resetForm();
  };
  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setFormData({
      name: department.name,
      description: department.description,
      manager: department.manager,
      budget: department.budget,
    });
    setShowForm(true);
  };
  const handleDelete = (id: string) => {
    onUpadateDepartments(departments.filter((dept) => dept.id !== id));
  };

  const getEmployeeCount = (departmentName: string) => {
    return employees.filter((emp) => emp.department === departmentName).length;
  };

  const getAverageSalary = (departmentName: string) => {
    const deptEmployees = employees.filter(
      (emp) => emp.department === departmentName
    );
    if (deptEmployees.length === 0) return 0;
    return (
      deptEmployees.reduce((sum, emp) => sum + emp.salary, 0) /
      deptEmployees.length
    );
  };

  return (
    <div className="space-y-6">
      {/* Header*/}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Deparment Management
          </h1>
          <p className="text-gray-600">
            Organize and manage company department
          </p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 
                rounded-lg flex items-center transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </button>
      </div>
      {/* Department Cards*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => {
          const employeeCount = getEmployeeCount(department.name);
          const avgSalary = getAverageSalary(department.name);

          return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {department.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {department.manager}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 p-1">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="tetx-red-600 hover:text-red-800 p-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {department.description}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {employeeCount}
                    </p>
                    <p className="text-xs text-gray-500">Employees</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(department.budget / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-gray-50">Budget</p>
                  </div>
                </div>
              </div>
              {avgSalary > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Avg. Salary</span>
                    <span className="text-sm font-medium text-gray-900">
                      ${Math.round(avgSalary).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/*Department form modal*/}
      {showForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
            justify-center p-4 z-50"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingDepartment ? "Edit Department" : "Add New Department"}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600"
            >
              x
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full borber border-gray-300 rounded-lg 
                        px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Department Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter department decription"
                rows={3}
                required
              />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manager
                </label>
                <input type="text"
                value={formData.manager}
                onChange={(e)=> setFormData({...formData,manager:e.target.value})}
                className="w-full border 
                border-gray-300 rounded-lg 
                px-3 py-2 focus:ring-2 
                focus:ring-blue-500 
                focus:border-blue-500" 
                placeholder="Enter Manager's name"
                required/>
            </div>

            <div>
                <label  className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Budget
                </label>
                <input 
                type="number"
                value={formData.budget}
                onChange={(e)=> setFormData({...formData,budget:parseFloat(e.target.value)|| 0})}
                className="w-full border 
                border-gray-300 rounded-lg 
                px-3 py-2 focus:ring-2 
                focus:ring-blue-500 
                focus:border-blue-500" 
                placeholder="Enter annual budget"
                min="0"
                step="1000"
                required
                />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button 
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-lg 
                text-gray-700 hover:bg-gray-50 transition-colors">
                    Cancel
                </button>

                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    {editingDepartment ? 'Update Department' : 'Create Department'}
                </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagement;
