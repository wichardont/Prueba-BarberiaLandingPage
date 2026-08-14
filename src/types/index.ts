export interface Service {
  id: string;
  name: string;
  description: string;
  durationMin: number;
  priceMxn: number;
}

export interface TimeSlot {
  time: string; // "HH:mm"
  available: boolean;
}

export type AppointmentStatus = "confirmada" | "pendiente" | "cancelada";

export interface Appointment {
  id: string;
  customerName: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm"
  status: AppointmentStatus;
}

export interface CreateAppointmentInput {
  customerName: string;
  phone: string;
  serviceId: string;
  date: string;
  time: string;
}
