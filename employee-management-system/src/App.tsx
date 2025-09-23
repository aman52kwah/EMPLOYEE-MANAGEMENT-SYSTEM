import { useState } from 'react'
import {Users, Building2,DollarSign,
  Settings,Plus,Search,Filter,
  ReceiptSwissFrancIcon} 
  from 'lucide-react';
  import Dashboard from './components/Dashboard';
  import  EmployeeList  from "./components/EmployeeList";
  import EmployeeForm from './components/EmployeeForm';
  import DepartmentManagement from './components/DepartmentManagement';
  import SalaryAdjustmentModal from './components/SalaryAdjustmentModal';
  import RoleAssignment from './components/RoleAssignment';
  import { Employee,Department } from './types';
  import {mockEmployees, mockDepartments} from './data/mockData'

import './App.css';

function App() {
  
const [activeTab, setActiveTab] = useState('dashbaord');
const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
const [departments, setDepartments] = useState<Department[]>(mockDepartments);
const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
const [showEmployeeForm, setShowEmployeeForm]= useState(false);
const [showSalaryModal,setShowSalaryModal]= useState(false);

const navigation =[
  {id:'dahsboard',name:'Dashboard',icon:Users},
  {id:'employees',name:'Employees',icon:Users},
  {id:'departments',name:'Departments',icon:Building2},
  {id:'roles',name:'Roles',icon:Settings},
];
const handleAddEmployee = (employee:Omit<Employee,'id'>)=>{
  const newEmployee ={
    ...employee,
id:Date.now().toString(),
  };
  setEmployees([...employees,newEmployee]);
  setShowEmployeeForm(false);
};



const handleEditEmployee=(employee:Employee)=>{
  setEmployees(employees.map(emp =>emp.id === employee.id ? employee : emp));
  setShowEmployeeForm(false);
  setSelectedEmployee(null);
};


const handleDeleteEmployee = (id:string) => {
  setEmployees(employees.filter(emp => emp.id !==id));
};

const handleSalaryAdjustment = (employeeId:string,newSalary:number,reason:string)=>{
  setEmployees(employees.map(emp =>
    emp.id === employeeId ?{...emp,salary:newSalary}
    :emp
  ));
  setShowSalaryModal(false);
  setSelectedEmployee(null);
};


const renderCount =()=> {
  switch(activeTab){
    case 'dashboard':
      return <Dashboard employees ={employees} departments={departments} />;

      case 'employees':
        return (
          <EmployeeList
          employees={employees}
          departments={departments}
          onEdit={(employee:any) =>{
            setSelectedEmployee(employee);
            setShowEmployeeForm(true);
          }}
         onDelete ={handleDeleteEmployee}
         onSalaryAdjustment ={(employee :any) =>{
          setSelectedEmployee(employee);
          setShowSalaryModal(true)
         }}
         onAdd ={() => {
          setSelectedEmployee(null);
          setShowEmployeeForm(true);
         }}
         />
        );
        case'departments' :
        return (
          <DepartmentManagement
          
          departments={departments}
          employees ={employees}
          onUpdateDepartments= {setDepartments}
          />
        );
        case 'roles' :
          return (
            <RoleAssignment
            employees={employees}
            onUpdateEmployees={setEmployees}/>
          );
          default:
            return <Dashboard
            employees={employees}
            departments={departments}/>;

  }
};

  return (
    <div>
      <div>
      {/* navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Building2 className='h-8 w-8 text-blue-600'/>
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  Employee Managment
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item)=>{
                    const Icon = item.icon;
                    return(
                      <button
                      key={item.id}
                      onClick={()=>setActiveTab(item.id)}
                      className={`${activeTab === item.id ? 'border-blue-500 text-gray-900':
                        'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center transition-colors`}
                      >
                        <Icon className='h-4 w-4 mr-2'/>
                        {item.name}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </nav>
       {/* main content */}
       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderCount()}
        </div>
       </main>

       {/* Modals */}

       {showEmployeeForm && (
        <EmployeeForm
        employee={selectedEmployee}
        departments={departments}
        onSubmit={selectedEmployee ? handleEditEmployee : handleAddEmployee}
        onClose={()=>{
          setShowEmployeeForm(false);
          setSelectedEmployee(null)
        }}
        />
       )}

       {showSalaryModal && selectedEmployee && (
        <SalaryAdjustmentModal
        employee={selectedEmployee}
        onSubmit={handleSalaryAdjustment}
        onClose={()=>{
          setShowSalaryModal(false);
          setSelectedEmployee(null);
        }}/>
       )}
        </div>
    </div>
  )
}

export default App;
