import React, { useState } from "react";
import { Shield, Users, Settings, Edit2, Check, X } from "lucide-react";
import { Employee } from "../types";

interface RoleAssignmentProps {
  employees: Employee[];
  onUpdateEmployees: (employess: Employee[]) => void;
}

const roles = {
  admin: {
    name: "Administrator",
    description: "Full system access and user management",
    permissions: [
      "manage_users",
      "manage_departments",
      "manage_settings",
      "view_reports",
      "manage_salaries",
    ],
    color: "bg-red-100 text-red-800",
    icon: Shield,
  },
  manager: {
    name: "Manager",
    description: "Department management and team oversight",
    permissions: [
      "manage_team",
      "view_reports",
      "approve_requests",
      "manage_schedules",
    ],
    color: "bg-blue-100 text-blue-800",
    icon: Users,
  },

  developer: {
    name: "Developer",
    description: "Technical development and system maintenance",
    permissions: [
      "access_develoment",
      "manage_projects",
      "view_code",
      "deploy_applications",
    ],
    color: "bg-green-100 text-green-800",
    icon: Settings,
  },

  employee: {
    name: "Employee",
    description: "Standard user access",
    permissions: ["view_profile", "update_profile", "view_schedule"],
    color: "bg-gray-100 text-gray-800",
    icon: Users,
  },
};

const RoleAssignment: React.FC<RoleAssignmentProps> = ({
  employees,
  onUpdateEmployees,
}) => {
  const [editingEmployee, setEditingEmployee] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleRoleUpdate = (employeeId: string, newRole: string) => {
    const updateEmployees = employees.map((emp) =>
      emp.id === employeeId ? { ...emp, role: newRole } : emp
    );
    onUpdateEmployees(updateEmployees);
    setEditingEmployee(null);
    setSelectedRole("");
  };

  const startEditing = (employee: Employee) => {
    setEditingEmployee(employee.id);
    setSelectedRole(employee.role);
  };
  const cancelEditing = () => {
    setEditingEmployee(null);
    setSelectedRole("");
  };

  const getRoleStats = () => {
    const stats = Object.keys(roles).map((roleKey) => ({
      role: roleKey,
      count: employees.filter((emp) => emp.role === roleKey).length,
      ...roles[roleKey as keyof typeof roles],
    }));
    return stats;
  };

  const roleStats = getRoleStats();

  return (
    <div className="space-y-6">
      {/* Header*/}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Role Assigment</h1>
          <p className="text-gray-600">Manage employee roles and Permissions</p>
        </div>
      </div>
      {/* Role Overview */}
      <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-4 gap-4">
        {roleStats.map((roleData) => {
          const Icon = roleData.icon;

          return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div
                    className={`p-2 rounded-lg ${roleData.color
                      .replace("text", "bg")
                      .replace("800", "200")}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {roleData.name}
                    </h3>
                    <p className="text-2xl font-bold text-gray 900">
                      {roleData.count}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {roleData.description}
              </p>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-700">
                  Permissions:
                </p>
                <div className="flex flex-wrap gap-1">
                  {roleData.permissions.slice(0, 3).map((permission) => (
                    <span
                      key={permission}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {permission.replace("_", "")}
                    </span>
                  ))}
                  {roleData.permissions.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{roleData.permissions.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Role Permissions Matrix */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Permission Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Permisson
                </th>
                {Object.entries(roles).map(([roleKey, role]) => (
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from(
                new Set(
                  Object.values(roles).flatMap((role) => role.permissions)
                )
              ).map((permission) => (
                <tr key={permission} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900 capitalize">
                    {permission.replace(/_/g, " ")}
                  </td>
                  {Object.entries(roles).map(([roleKey, role]) => (
                    <td key={roleKey} className="py-3 px-4 text-cnter">
                      {role.permissions.includes(permission) ? (
                        <Check className="h-4 w-4 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-gray-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Employee Role Assignment */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="text-lg font-semibold text-gray-900">
            Employee Roles
          </div>
        </div>
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
                  Current Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white-divide-y divide-gray-200">
              {employees.map((employee) => {
                const roleData =
                  roles[employee.role as keyof typeof roles] || roles.employee;
                const Icon = roleData.icon;
                const isEditing = editingEmployee === employee.id;
                return (
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue 500 flex items-center justify-center">
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
                            {employee.position}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <select
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500
                        focus:border-blue-500
                        "
                        >
                          {Object.entries(roles).map(([roleKey, role]) => (
                            <option key={roleKey} value={roleKey}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="flex items-center">
                          <Icon className="h-4 w-4 mr-2" />
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${roleData.color}`}
                          >
                            {roleData.name}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {roleData.permissions.slice(0, 2).map((permission) => (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {permission.replace("_", " ")}
                          </span>
                        ))}
                        {roleData.permissions.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{roleData.permissions.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap text-right text-sm font-medium">
                      {isEditing ? (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() =>
                              handleRoleUpdate(employee.id, selectedRole)
                            }
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Save"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="text-gray-600 hover:text-gray-900 p-1"
                            title="Cancel"
                          >
                            <X className="h-4 w0-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditing(employee)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Edit Role"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default RoleAssignment;
