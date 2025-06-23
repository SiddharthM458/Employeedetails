import { useEffect, useState } from 'react'
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from './api'

import type { Employee } from './api'

function App() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [form, setForm] = useState<Employee>({
    name: '',
    email: '',
    designation: '',
    phonenumber: 0,
    salary: 0,
  })
  const [editId, setEditId] = useState<number | null>(null)

  const loadEmployees = async () => {
    try {
      const res = await getEmployees()
      setEmployees(res.data)
    } catch (err) {
      console.error('Error fetching employees:', err)
    }
  }

  useEffect(() => {
    loadEmployees()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
   if(
    form.name.trim() === '' ||
    form.designation.trim() === '' ||
    form.email.trim() === '' ||
    !form.phonenumber ||
    !form.salary  
   ) {
    alert('!Please fill in all the fields before submitting.')
    return
   }
    try {
    if (editId !== null) {
      await updateEmployee(editId, form)
      setEditId(null)
    } else {
      await createEmployee(form)
    }
      setForm({
        name: '',
        email: '',
        designation: '',
        phonenumber: 0,
        salary: 0,
      })
      setEditId(null)
      loadEmployees()
    } catch (err) {
      console.error('Error submitting form:', err)
    }
  }

  const handleEdit = (emp: Employee) => {
    setForm(emp)
    setEditId(emp.id ?? null)
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee(id)
      loadEmployees()
    } catch (err) {
      console.error('Error deleting employee:', err)
    }
  }

  return (
    <div className="container" style={{display:"flex", justifyContent:"center"}}>
      <div>
        <h1  style={{display:"flex", justifyContent:"center", fontSize: '50px'}}>Employee Registration</h1>
      <form onSubmit={handleSubmit} >
        <div style={{display:"flex", justifyContent:"center"}}><input
          placeholder="Name"
          value={form.name}
          style={{width:"300px", height:"30px"}}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        /></div>
       <div style={{display:"flex", justifyContent:"center"}}> <input
          placeholder="Designation"
          value={form.designation}
          style={{width:"300px", height:"30px"}}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
        /></div>
       <div style={{display:"flex", justifyContent:"center"}}> <input
          placeholder="Email"
          value={form.email}
          style={{width:"300px", height:"30px"}}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /></div> 
        <div style={{display:"flex", justifyContent:"center"}}><input
          placeholder="PhoneNumber"
          value={form.phonenumber}
          style={{width:"300px", height:"30px"}}
          onChange={(e) => setForm({ ...form, phonenumber: Number (e.target.value) })}
        /></div>
        <div style={{display:"flex", justifyContent:"center"}}>
          <input
          placeholder="Salary"
          value={form.salary}
          style={{width:"300px", height:"30px"}}
          onChange={(e) => setForm({ ...form, salary: Number (e.target.value) })}
        />
        </div>
        <br />
       <div style={{display:"flex", justifyContent:"center"}}> <button type="submit" style={{height:"40px"}}>{editId !== null ?
        'Update' : 'Add'} Employee</button></div>
      </form>
      <br />
      <h2 style={{display:"flex", justifyContent:"center"}}>Employee List</h2>
      <ul className="employee-list">
        {employees.map((emp) => (
          <li key={emp.id} style={{ margin: '10px 0' }}>
            {emp.name} | {emp.email} | {emp.designation} | {emp.phonenumber} | ₹{emp.salary}
            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
              <button style={{height:"40px"}} onClick={() => handleEdit(emp)}>Update</button>{' '}
              <button style={{height:"40px"}} onClick={() => handleDelete(emp.id!)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      </div>

    </div>
  )
}

export default App
