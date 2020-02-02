import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async store(req, res) {
    // Verificar se o email existe
    // com a função findOne é possível passar várias regras de negócio
    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res.status(400).json({ error: 'User Already Exist!' });
    }
    // pode usar req.body pois ele só vai salvar os dados que foram definidos no User.js
    // poderia pegar dado por dado mas não há necessidade
    const { id, name, email, provider } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  /**
   * Fazer Middleware para verificar se o usuário existe
   */
  async show(req, res) {
    const { id } = req.params;
    const { name, email, provider } = await User.findByPk(id);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    return res.json({ ok: true });
  }
}

export default new UserController();
