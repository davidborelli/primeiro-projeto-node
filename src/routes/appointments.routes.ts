import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const apponintmentsRouter = Router();

const appointments: Appointment[] = [];

apponintmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findDateSameAppointment = appointments.find(appoint =>
    isEqual(appoint.date, parsedDate),
  );

  if (findDateSameAppointment) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  response.json(appointment);
});

export default apponintmentsRouter;
