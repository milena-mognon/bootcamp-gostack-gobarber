import jwt from 'jsonwebtoken';
// util -> biblioteca padrão
// promisify -> pega função de callback e tranforma em uma que pode usar
// async/await
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  // Técnica da desentruturação, quando é passado uma virgula diretor será
  // utilizado somente a primeira posição do array, a posição 0 é descartada
  const [, token] = authHeader.split(' ');

  // pode retornar erro
  try {
    // valor retornado pelo jwt.verify
    // promisify(jwt.verify) retorna outra função que não precisa passar o callback
    // desta forma podemos chamar esta função logo em seguida passando outro ()
    // e os parametros da função (token, authConfig.secret)
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token.' });
  }
};
