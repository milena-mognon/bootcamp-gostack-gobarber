import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  // get é usado para retornar variáveis sem criar um cosntructor
  get key() {
    return 'CancellationMail';
  }

  // handle será chamado para cada job, neste caso, o envio de cada email
  async handle({ data }) {
    const { appointment } = data;
    await Mail.sendMail({
      to: `${appointment.provider.name} < ${appointment.provider.email} >`,
      subject: 'Agendamento Cancelado',
      template: 'cancelation',
      context: {
        provider: appointment.provider.name,
        client: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às ' H:mm'h",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
