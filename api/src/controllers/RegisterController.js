import UserRepository from '../repositories/UserRepository'
import UserService from '../services/UserService'

const RegisterController = {
  register: async (req, res) => {
    try {
      const user = await UserRepository.create({
        email: req.body.email,
        password: UserService.generatePassword(req.body.password),
      })

      const token = UserService.generateToken(user.id)

      return res.json({ token })
    } catch (exception) {
      console.log(exception)

      return res.status(500).json({ message: 'Não foi possível cadastrar o usário solicitado' })
    }
  },
}

export default RegisterController
