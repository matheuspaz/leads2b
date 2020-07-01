import UserService from "../services/UserService"
import UserRepository from "../repositories/UserRepository"

const UserController = {
  create: async (req, res) => {
    try {
      const user = await UserRepository.create({
        email: req.body.email,
        password: UserService.generatePassword(req.body.password),
      })

      return res.json(user)
    } catch (error) {
      return res.status(500).json({message: 'Falha ao registrar o usuário!'})
    }
  },

  update: async (req, res) => {
    try {
      const user = await UserRepository.update(req.params.id, {
          email: req.body.email,
          password: req.body.password,
          profile: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber
          }
      })

      return res.json(user);
    } catch (error) {
      return res.status(500).json({message: 'Não foi possível fazer update do usuário solicitado!'})
    }
  },

  delete: async (req, res) => {
    try {
      const user = await UserRepository.delete(req.params.id)

      return res.json(user)
    } catch (error) {
      return res.status(500).json({message: 'Não foi possível deletar usuário solicitado!'})
    }
  },

  get: async (req, res) => {
    try {
      const user = await UserRepository.findByFields({_id: req.params.id})

      return res.json(user)
    } catch (error) {
      return res.status(500).json({message: 'Não foi possível encontrar o usuário solicitado!'})
    }
  },

  all: async (req, res) => {
    try {
      const users = await UserRepository.all()

      return res.json(users)
    } catch (error) {
      return res.status(500).json({message: 'Falha ao carregar a lista de usuários!'})
    }
  }
}

export default UserController
