import { useEffect, useState } from "react";
import type { Appointment, Service, TimeSlot } from "@/types";
import { Button, Field, Input, Select } from "@/components/ui-kit";
import { cn } from "@/lib/utils";
import { createAppointment, getAvailability } from "@/services/api";
import { todayIso } from "@/lib/format";

interface Errors {
  customerName?: string;
  phone?: string;
  serviceId?: string;
  date?: string;
  time?: string;
}

export function BookingForm({
  services,
  selectedServiceId,
  onServiceChange,
  onSuccess,
}: {
  services: Service[];
  selectedServiceId: string;
  onServiceChange: (id: string) => void;
  onSuccess: (appointment: Appointment) => void;
}) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(todayIso());
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    let active = true;
    setLoadingSlots(true);
    getAvailability(date, selectedServiceId)
      .then((data) => {
        if (!active) return;
        setSlots(data);
        setTime((prev) =>
          data.some((s) => s.time === prev && s.available) ? prev : "",
        );
      })
      .finally(() => active && setLoadingSlots(false));
    return () => {
      active = false;
    };
  }, [date, selectedServiceId]);

  function validate(): Errors {
    const next: Errors = {};
    if (!customerName.trim()) next.customerName = "El nombre es obligatorio.";
    else if (customerName.trim().length > 80)
      next.customerName = "Máximo 80 caracteres.";
    if (!phone.trim()) next.phone = "El teléfono es obligatorio.";
    else if (!/^[0-9+\s-]{10,15}$/.test(phone.trim()))
      next.phone = "Introduce un teléfono válido (10 dígitos).";
    if (!selectedServiceId) next.serviceId = "Selecciona un servicio.";
    if (!date) next.date = "Selecciona una fecha.";
    if (!time) next.time = "Selecciona una hora disponible.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      // Simulación de la respuesta del backend (POST /appointments).
      const appointment = await createAppointment({
        customerName: customerName.trim(),
        phone: phone.trim(),
        serviceId: selectedServiceId,
        date,
        time,
      });
      onSuccess(appointment);
      setCustomerName("");
      setPhone("");
      setTime("");
      setErrors({});
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto w-full max-w-2xl space-y-6 rounded-xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Nombre completo" error={errors.customerName}>
          <Input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Juan Pérez"
            maxLength={80}
          />
        </Field>
        <Field label="Teléfono" error={errors.phone}>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="312 123 4567"
            inputMode="tel"
            maxLength={15}
          />
        </Field>
        <Field label="Servicio" error={errors.serviceId}>
          <Select
            value={selectedServiceId}
            onChange={(e) => onServiceChange(e.target.value)}
          >
            <option value="">Selecciona un servicio</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {s.durationMin} min · ${s.priceMxn}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Fecha" error={errors.date}>
          <Input
            type="date"
            value={date}
            min={todayIso()}
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>
      </div>

      <Field label="Hora" error={errors.time}>
        {loadingSlots ? (
          <p className="text-sm text-muted-foreground">
            Consultando disponibilidad…
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {slots.map((slot) => {
              const selected = slot.time === time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  title={slot.available ? slot.time : "No disponible"}
                  onClick={() => setTime(slot.time)}
                  className={cn(
                    "rounded-md border px-2 py-2.5 text-sm transition-colors",
                    slot.available
                      ? "border-border text-foreground hover:border-primary hover:text-primary"
                      : "cursor-not-allowed border-border/40 bg-muted/50 text-muted-foreground/50 line-through",
                    selected &&
                      "border-primary bg-primary text-primary-foreground hover:text-primary-foreground",
                  )}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
        )}
        <p className="pt-2 text-xs text-muted-foreground">
          Horario de comida de 14:00 a 15:00. Los horarios tachados no están
          disponibles.
        </p>
      </Field>

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? "Enviando…" : "Confirmar reserva"}
      </Button>
    </form>
  );
}
