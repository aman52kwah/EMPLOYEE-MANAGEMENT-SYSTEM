export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  status: 'active' | 'inactive';
  role: string;
  avatar?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  employeeCount: number;
  budget: number;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
  description: string;
}