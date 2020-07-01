import UserRepository from '../repositories/UserRepository'
import UserService from '../services/UserService'

const LoginController = {
  login: async (req, res) => {
    try {
      const user = await UserRepository.findByFields({ email: req.body.email })

      if (!user) res.status(401).json({ message: 'Usuário não encontrado na base' })

      const passwordIsValid = UserService.checkPasswordIsSame(req.body.password, user.password)

      if (!passwordIsValid) res.json({ message: 'Senha incorreta' })

      const token = UserService.generateToken(user.id)

      return res.json({ token })
    } catch (exception) {
      return res.json({ message: 'Falha ao logar com o usuário solicitado' }).status(500)
    }
  },
}

export default LoginController
