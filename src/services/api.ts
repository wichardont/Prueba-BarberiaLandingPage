/**
 * Capa de acceso a datos.
 *
 * Actualmente devuelve datos MOCK locales. Cuando el backend (FastAPI) esté
 * disponible, basta con sustituir el cuerpo de cada función por la petición
 * HTTP correspondiente, manteniendo la misma firma y los mismos tipos:
 *
 *   GET    /services
 *   GET    /availability?date=...&service_id=...
 *   POST   /appointments
 *   GET    /appointments
 *   DELETE /appointments/{id}
 */
import type {
  Appointment,
  CreateAppointmentInput,
  Service,
  TimeSlot,
} from "@/types";
import {
  MOCK_APPOINTMENTS,
  MOCK_BUSY_SLOTS,
  MOCK_SERVICES,
  WORKING_HOURS,
} from "@/services/mockData";

export const API_URL = import.meta.env["VITE_API_URL"] ?? "";

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

/** En memoria solo para poder probar la interfaz. */
let appointments: Appointment[] = [...MOCK_APPOINTMENTS];

/** GET /services */
export async function getServices(): Promise<Service[]> {
  await delay();
  return MOCK_SERVICES;
}

/** GET /availability?date=&service_id= */
export async function getAvailability(
  date: string,
  _serviceId?: string,
): Promise<TimeSlot[]> {
  await delay();
  const busyFromMock = MOCK_BUSY_SLOTS[date] ?? MOCK_BUSY_SLOTS["default"] ?? [];
  const busyFromBookings = appointments
    .filter((a) => a.date === date && a.status !== "cancelada")
    .map((a) => a.time);
  const busy = new Set([...busyFromMock, ...busyFromBookings]);

  return WORKING_HOURS.map((time) => ({ time, available: !busy.has(time) }));
}

/** POST /appointments */
export async function createAppointment(
  input: CreateAppointmentInput,
): Promise<Appointment> {
  await delay(600);
  const service = MOCK_SERVICES.find((s) => s.id === input.serviceId);
  const appointment: Appointment = {
    id: `apt_${Date.now()}`,
    customerName: input.customerName,
    phone: input.phone,
    serviceId: input.serviceId,
    serviceName: service?.name ?? "Servicio",
    date: input.date,
    time: input.time,
    status: "confirmada",
  };
  appointments = [...appointments, appointment];
  return appointment;
}

/** GET /appointments */
export async function getAppointments(): Promise<Appointment[]> {
  await delay();
  return [...appointments].sort((a, b) =>
    `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`),
  );
}

/** DELETE /appointments/{id} */
export async function deleteAppointment(id: string): Promise<void> {
  await delay();
  appointments = appointments.map((a) =>
    a.id === id ? { ...a, status: "cancelada" } : a,
  );
}
