import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User not found!' });
    }
    // error 401 -> não autorizado
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match!' });
    }

    const { id, name } = user;
    // para gerar o token é utilizado o metodo jwt.sign()
    // que recebe o 1º parametro -> payload (informações adicionais)
    // 2 º parametro -> uma string unica (gerar md5 de uma frase)
    // 3 parametro -> configurações para o token (data de expiração)
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
