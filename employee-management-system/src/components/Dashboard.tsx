import React from 'react';
import {Users,Building2,DollarSign,TrendingUp,UserCheck,UserX} from 'lucide-react';
//import {Employee,Department} from '../types';

interface DashboardProps{
    employees: Employee[];
    departments: Department[];
}

const Dashboard: React.FC<DashboardProps> =({employees,departments})=>{
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp = employees.status === 'active'.length)
    const totalDepartment = departments.length;
    const averageSalary = employees.reduce((sum, emp)=> sum + emp.salarty,0)/employees.length;

    const departmentStats = departments.map(dept =>({
        ...dept,
        employeeCount: employees.filter(emp => emp.department === dept.name).length;

    }));

     const recentHires = employees
        .sort((a,b) => new Date(b.hireDate).getTime() - new Date.(a.hireDate).getTime())
        .slice(0,5);

        const StatCard =({title,value,icon:Icon ,color,change}: any)=>(
            <div className='bg-white rounded-lg shadow-sm border-gray-200 p-6 hover:shadow-md transition-shadow'>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='text-sm font-meduim text-gray-600'>{title}</p>
                        <p className='text-3xl font-bold text-gray-900 mt-2'>{value}</p>
                        {
                            change &&(
                                <p className='text-sm text-green-600 mt-1 flex items-center'>
                                    <TrendingUp className='h-4 w-4 mr-1'/>
                                    {change}
                                </p>
                            )}
                    </div>
                    <div className={`p-3 rounded-full ${color}`}>
                            <Icon className="h-6 w-6 text-white"/>
                    </div>
                </div>
            </div>
        );
        return (
            <div className="space-y-6">
                <div className="flex justify-between titems-center">
                    <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
                    <div className='text-sm text-gray-500'>
                    Last updated:{new Date().toLocaleDateString()}
                    </div>
                </div>
                {/*stats grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                    title="Total Employees"
                    value={totalEmployees}
                    icon ={Users}
                    color = "bg-blue-500"
                    change="+12% from last month"
                    />

                     <StatCard
                    title="Active Employees"
                    value={activeEmployees}
                    icon ={Users}
                    color = "bg-blue-500"
                    change="+12% from last month"
                    />
                </div>
            </div>
        )
}