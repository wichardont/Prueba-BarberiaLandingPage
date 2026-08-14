import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { Appointment, AppointmentStatus } from "@/types";
import { Button, Field, Input, Select, StatusBadge } from "@/components/ui-kit";
import { deleteAppointment, getAppointments } from "@/services/api";
import { formatLongDate } from "@/lib/format";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel de citas — Barbería Norte" },
      {
        name: "description",
        content:
          "Panel administrativo de Barbería Norte para consultar, filtrar y cancelar citas.",
      },
      { property: "og:title", content: "Panel de citas — Barbería Norte" },
      {
        property: "og:description",
        content: "Gestiona las citas de la barbería por fecha y estado.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"todas" | AppointmentStatus>(
    "todas",
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAppointments()
      .then(setAppointments)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () =>
      appointments.filter(
        (a) =>
          (!dateFilter || a.date === dateFilter) &&
          (statusFilter === "todas" || a.status === statusFilter),
      ),
    [appointments, dateFilter, statusFilter],
  );

  async function handleCancel(id: string) {
    await deleteAppointment(id);
    setAppointments(await getAppointments());
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="font-display text-lg uppercase tracking-[0.18em]">
            Panel · <span className="text-primary">Citas</span>
          </span>
          <Link
            to="/"
            className="text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
          >
            Ver sitio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="text-4xl">Agenda de citas</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Datos de ejemplo. La gestión real se conectará al backend.
        </p>

        <div className="mt-8 grid gap-4 sm:max-w-md sm:grid-cols-2">
          <Field label="Fecha">
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </Field>
          <Field label="Estado">
            <Select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as typeof statusFilter)
              }
            >
              <option value="todas">Todas</option>
              <option value="confirmada">Confirmada</option>
              <option value="pendiente">Pendiente</option>
              <option value="cancelada">Cancelada</option>
            </Select>
          </Field>
        </div>

        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Hora</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Servicio</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-muted-foreground">
                    Cargando citas…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-muted-foreground">
                    No hay citas con estos filtros.
                  </td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatLongDate(a.date)}
                    </td>
                    <td className="px-4 py-3 font-display text-base">{a.time}</td>
                    <td className="px-4 py-3">{a.customerName}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {a.serviceName}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{a.phone}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        variant="danger"
                        disabled={a.status === "cancelada"}
                        onClick={() => handleCancel(a.id)}
                      >
                        Cancelar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
