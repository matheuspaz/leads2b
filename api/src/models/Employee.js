import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate'

const EmployeeSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    salary: { type: Number, required: true}
  },
  { timestamps: true }
)

EmployeeSchema.plugin(paginate)

model('Employee', EmployeeSchema)
