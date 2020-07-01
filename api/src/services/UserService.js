import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const UserService = {
  generateToken(userId) {
    return jwt.sign({}, process.env.APP_SECRET, { subject: userId })
  },

  generatePassword(password) {
    return bcrypt.hashSync(password, 10)
  },

  checkPasswordIsSame(requestPassword, databasePassword) {
    return bcrypt.compareSync(requestPassword, databasePassword)
  },
}

export default UserService
