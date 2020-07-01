import EmployeeRepository from "../repositories/EmployeeRepository"

const EmployeeController = {
  create: async (req, res) => {
    try {
      const employee = await EmployeeRepository.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        salary: req.body.salary,
      })

      return res.json(employee)
    } catch (error) {
      return res.status(500).json({message: 'Falha ao registrar o funcionario!'})
    }
  },

  update: async (req, res) => {
    try {
      const employee = await EmployeeRepository.update(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        salary: req.body.salary,
      })

      return res.json(employee);
    } catch (error) {
      return res.status(500).json({message: 'Não foi possível fazer update do funcionario solicitado!'})
    }
  },

  delete: async (req, res) => {
    try {
      const employee = await EmployeeRepository.delete(req.params.id)

      return res.json(employee)
    } catch (error) {
      return res.status(500).json({message: 'Não foi possível deletar funcionario solicitado!'})
    }
  },

  get: async (req, res) => {
    try {
      const employee = await EmployeeRepository.findByFields({_id: req.params.id})

      return res.json(employee)
    } catch (error) {
      return res.status(500).json({message: 'Não foi possível encontrar o funcionario solicitado!'})
    }
  },

  all: async (req, res) => {
    try {
      const employees = await EmployeeRepository.all()

      return res.json(employees)
    } catch (error) {
      return res.status(500).json({message: 'Falha ao carregar a lista de funcionarios!'})
    }
  }
}

export default EmployeeController
