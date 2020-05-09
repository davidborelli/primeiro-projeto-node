import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const apponintmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

apponintmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  response.json(appointments);
});

apponintmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findDateSameAppointment = appointmentsRepository.findByDate(parsedDate);

  if (findDateSameAppointment) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  response.json(appointment);
});

export default apponintmentsRouter;
