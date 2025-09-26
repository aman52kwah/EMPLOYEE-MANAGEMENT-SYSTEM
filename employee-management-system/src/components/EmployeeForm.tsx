import React, { useState, useEffect } from "react";
import { X, Save, User } from "lucide-react";
import { Employee, Department } from "../types";

interface EmployeeFormsProps {
  employee?: Employee | null;
  departments: Department[];
  onSubmit: (employee: Employee | Omit<Employee, "id">) => void;
  onClose: () => void;
}

const EmployeeForm: React.FC<EmployeeFormsProps> = ({
  employee,
  departments,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: 0,
    hireDate: "",
    status: "active" as "active" | "inactive",
    role: "employee",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        position: employee.position,
        salary: employee.salary,
        hireDate: employee.hireDate,
        status: employee.status,
        role: employee.role,
      });
    }
  }, [employee]);
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "firstname is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "lastname is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }
    if (!formData.salary) {
      newErrors.salary = "salary must be greater than 0";
    }

    if (!formData.hireDate) {
      newErrors.hireDate = "Hire Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (employee: React.FormEvent) => {
    employee.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (employee) {
      onSubmit({ ...employee, ...formData });
    } else {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salary" ? parseFloat(value) || 0 : value,
    }));

    //clear errors when user starts typing

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: " " }));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center
        justify-center p-4 z-50"
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h[90vh]
            overflow-y-auto"
      >
        {/*  header*/}
        <div
          className="flex items-center justify-between
                 p-6 border-b border-gray-200"
        >
          <div className="flex items-center">
            <User className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              {employee ? "Edit Employee" : "Add New Employee"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form*/}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/*personal information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2
                            focus:ring-blue-500 focus:border-blue-500 ${
                              errors.firstName
                                ? "border-red-500"
                                : "border-gray-300"
                            }
                            `}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2
                            focus:ring-blue-500 focus:border-blue-500 ${
                              errors.lastName
                                ? "border-red-500"
                                : "border-gray-300"
                            }
                            `}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2
                            focus:ring-blue-500 focus:border-blue-500 ${
                              errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                            }
                            `}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2
                            focus:ring-blue-500 focus:border-blue-500 ${
                              errors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                            }
                            `}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Employment Information*/}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Employemnt Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-blue-500
                                 focus:border-blue-500 ${
                                   errors.department
                                     ? "border-red-500"
                                     : "border-gray-300"
                                 }`}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.department}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position *
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500
                                 focus:border-blue-500 ${
                                   errors.position
                                     ? "border-red-500"
                                     : "border-gray-300"
                                 }`}
                  placeholder="Enter position"
                />

                {errors.position && (
                  <p className="text-red-500 text-xs mt-1">{errors.position}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Salary *
                </label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-blue-500
                                 focus:border-blue-500 ${
                                   errors.salary
                                     ? "border-red-500"
                                     : "border-gray-300"
                                 }`}
                  placeholder="Enter annual salary"
                  min="0"
                  step="1000"
                />

                {errors.salary && (
                  <p className="text-red-500 text-xs mt-1">{errors.salary}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hire Date *
                </label>
                <input
                  type="date"
                  name="hireDate"
                  value={formData.hireDate}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500
                                 focus:border-blue-500 ${
                                   errors.hireDate
                                     ? "border-red-500"
                                     : "border-gray-300"
                                 }`}
                />

                {errors.hireDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.hireDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2
                   focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2
                   focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                  <option value="developer">Developer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions*/}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 
            hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hoveer:bg-blue-700 text-white rounded-lg flex items-center
              transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              {employee ? "Update Employee" : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EmployeeForm;
