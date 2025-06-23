import axios from "axios";

export interface Employee {
    id?: number
    name: string
    designation: string
    email: string
    phonenumber: number
    salary: number
}

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export const getEmployees = () => api.get<Employee[]>('/employees')
export const createEmployee = (data: Employee) => api.post('/employees', data)
export const updateEmployee = (id: number, data: Employee) => api.put(`/employees/${id}`, data)
export const deleteEmployee = (id: number) => api.delete(`/employees/${id}`)