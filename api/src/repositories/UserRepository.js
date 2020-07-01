import { model } from 'mongoose'

const User = model('User')

const UserRepository = {
  create: async (user) => {
    return User.create(user)
  },

  findByFields: async (fields) => {
    return User.findOne(fields)
  },

  update: async (id, data) => {
    return User.findOneAndUpdate({_id: id}, data, {upsert: false, new: true})
  },

  delete: async (id) => {
    return User.findOneAndDelete({_id: id})
  },

  all: async () => {
    return User.find()
  }
}

export default UserRepository
