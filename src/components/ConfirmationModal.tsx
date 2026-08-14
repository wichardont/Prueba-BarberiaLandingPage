import type { Appointment } from "@/types";
import { Button } from "@/components/ui-kit";
import { formatLongDate } from "@/lib/format";

export function ConfirmationModal({
  appointment,
  onClose,
}: {
  appointment: Appointment;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 px-5 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center"
      >
        <p className="eyebrow">Reserva simulada</p>
        <h2 className="mt-3 text-3xl">¡Cita reservada!</h2>
        <div className="mt-6 space-y-1 border-y border-border py-6">
          <p className="font-display text-2xl text-primary">
            {appointment.serviceName}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatLongDate(appointment.date)}
          </p>
          <p className="font-display text-xl">{appointment.time}</p>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          Cliente: <span className="text-foreground">{appointment.customerName}</span>
        </p>
        <Button className="mt-7 w-full" size="lg" onClick={onClose}>
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
