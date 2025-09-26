import React from 'react';
import {Users,Building2,DollarSign,TrendingUp,UserCheck,UserX, User} from 'lucide-react';
import {Employee,Department} from '../types';

interface DashboardProps{
    employees: Employee[];
    departments: Department[];
}

const Dashboard: React.FC<DashboardProps> = ({ employees, departments }) => {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(
    (emp) => emp.status === "active"
  ).length;
  const totalDepartment = departments.length;
  const averageSalary =
    employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length;

  const departmentStats = departments.map((dept) => ({
    ...dept,
    employeeCount: employees.filter((emp) => emp.department === dept.name)
      .length,
  }));

  const recentHires = employees
    .sort(
      (a, b) => new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime()
    )
    .slice(0, 5);

  const StatCard = ({ title, value, icon: Icon, color, change }: any) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-meduim text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated:{new Date().toLocaleDateString()}
        </div>
      </div>
      {/*stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          icon={Users}
          color="bg-blue-500"
          change="+12% from last month"
        />

        <StatCard
          title="Active Employees"
          value={activeEmployees}
          icon={UserCheck}
          color="bg-green-500"
        />

        <StatCard
          title="Departments"
          value={totalDepartment}
          icon={Building2}
          color="bg-purple-500"
        />

        <StatCard
          title="Average Salary"
          value={`$${Math.round(averageSalary).toLocaleString()}`}
          icon={DollarSign}
          color="bg-orange-500"
          change="+5% from last month"
        />
      </div>

      {/*department Overview & Recent Hires*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Department Overiew
          </h3>
          <div className="space-y-4">
            {departmentStats.map((dept) => (
              <div
                key={dept.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{dept.name}</p>
                  <p className="text-sm text-gray-500">{dept.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {dept.employeeCount} employees
                  </p>
                  <p className="text-sm text-gray-500">
                    ${(dept.budget / 1000).toFixed(0)}K budget
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Recnt Hires */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Hires
          </h3>
          <div className="space-y-4">
            {recentHires.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center space-x-4 py-2"
              >
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {employee.firstName[0]}
                      {employee.lastName[0]}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {employee.firstName} {employee.lastName}
                  </p>
                  <p className="text-sm-text-gray-500">{employee.position}</p>
                </div>
                <div className="text-right">
                  <p className="tetx-sm font-medium text-gray-900">
                    {employee.department}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(employee.hireDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* quick actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 
                        hover:bg-blue-50 transition-colors"
          >
            <User className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Add New Employee</span>
          </button>
          <button
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 
                        hover:bg-blue-50 transition-colors"
          >
            <Building2 className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Create Department</span>
          </button>
          <button
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 
                        hover:bg-blue-50 transition-colors"
          >
            <Building2 className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Salary Review</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;