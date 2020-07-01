import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate'

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: {
      firstName: { type: String },
      lastName: { type: String },
      phoneNumber: { type: String },
    }
  },
  { timestamps: true }
)

UserSchema.index({ email: 1 }, { unique: true })
UserSchema.plugin(paginate)

model('User', UserSchema)
