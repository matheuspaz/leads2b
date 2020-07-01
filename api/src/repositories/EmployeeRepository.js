import { model } from 'mongoose'

const Employee = model('Employee')

const EmployeeRepository = {
  create: async (employee) => {
    return Employee.create(employee)
  },

  findByFields: async (fields) => {
    return Employee.findOne(fields)
  },

  update: async (id, data) => {
    return Employee.findOneAndUpdate({_id: id}, data, {upsert: false, new: true})
  },

  delete: async (id) => {
    return Employee.findOneAndDelete({_id: id})
  },

  all: async () => {
    return Employee.find()
  }
}

export default EmployeeRepository
