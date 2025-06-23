import type { HttpContext } from '@adonisjs/core/http'
import Employee from '#models/employee'

export default class EmployeesController {
    async index(){
        return await Employee.all()
    }

    async store({ request, response }: HttpContext){
        const data = request.only(['name', 'designation', 'email', 'phonenumber', 'salary'])
        const employee = await Employee.create(data)
        return response.created(employee)
    }

    async show({ params }: HttpContext){
        return await Employee.findOrFail(params.id)
    }

    async update({ params, request }: HttpContext){
        const employee = await Employee.findOrFail(params.id)
        const data = request.only(['name', 'designation', 'email', 'phonenumber', 'salary'])
        employee.merge(data)
        await employee.save()
        return employee
    }

    async destroy({ params }: HttpContext){
        const employee = await Employee.findOrFail(params.id)
        await employee.delete()
        return { message: 'Employee deleted'}
    }
}