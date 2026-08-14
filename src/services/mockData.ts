import type { Appointment, Service } from "@/types";

export const MOCK_SERVICES: Service[] = [
  {
    id: "svc_corte_clasico",
    name: "Corte clásico",
    description: "Corte a tijera y máquina con acabado y peinado.",
    durationMin: 30,
    priceMxn: 150,
  },
  {
    id: "svc_corte_barba",
    name: "Corte + barba",
    description: "Corte completo con perfilado de barba y toalla caliente.",
    durationMin: 50,
    priceMxn: 220,
  },
  {
    id: "svc_barba",
    name: "Barba",
    description: "Perfilado, afeitado de contornos e hidratación.",
    durationMin: 25,
    priceMxn: 100,
  },
  {
    id: "svc_corte_infantil",
    name: "Corte infantil",
    description: "Corte para niños con un trato paciente y cercano.",
    durationMin: 30,
    priceMxn: 130,
  },
];

/** Horario de atención. 14:00–15:00 es la comida y no se ofrece. */
export const WORKING_HOURS: string[] = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

/** Horarios ocupados simulados. */
export const MOCK_BUSY_SLOTS: Record<string, string[]> = {
  default: ["09:30", "11:00", "12:30", "16:00", "17:30"],
};

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "apt_1",
    customerName: "Juan Pérez",
    phone: "3121234567",
    serviceId: "svc_corte_clasico",
    serviceName: "Corte clásico",
    date: "2026-08-20",
    time: "09:00",
    status: "confirmada",
  },
  {
    id: "apt_2",
    customerName: "Pedro López",
    phone: "3129876543",
    serviceId: "svc_barba",
    serviceName: "Barba",
    date: "2026-08-20",
    time: "10:30",
    status: "confirmada",
  },
  {
    id: "apt_3",
    customerName: "Carlos Ruiz",
    phone: "3125557788",
    serviceId: "svc_corte_barba",
    serviceName: "Corte + barba",
    date: "2026-08-20",
    time: "12:00",
    status: "pendiente",
  },
  {
    id: "apt_4",
    customerName: "Miguel Ángel Soto",
    phone: "3123334455",
    serviceId: "svc_corte_infantil",
    serviceName: "Corte infantil",
    date: "2026-08-21",
    time: "15:30",
    status: "cancelada",
  },
];
