import User from '../models/User';
import File from '../models/File';

class ProviderController {
  // Listar todos os usuarios do tipo provider
  async index(req, res) {
    // attributes: array com o nome dos campos desejados
    // Tráz os dados do relacionamento tbm
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(providers);
  }
}

export default new ProviderController();
