import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-barberia.jpg";
import { SiteNav } from "@/components/SiteNav";
import { ServiceCard } from "@/components/ServiceCard";
import { BookingForm } from "@/components/BookingForm";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { Button } from "@/components/ui-kit";
import { getServices } from "@/services/api";
import type { Appointment, Service } from "@/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barbería Norte — Reserva tu cita en línea" },
      {
        name: "description",
        content:
          "Barbería Norte: cortes clásicos, barba y estilo. Consulta servicios, precios y reserva tu cita en minutos.",
      },
      { property: "og:title", content: "Barbería Norte — Tu estilo, tu identidad" },
      {
        property: "og:description",
        content:
          "Cortes, barba y arreglo profesional. Reserva tu cita en Barbería Norte.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [confirmed, setConfirmed] = useState<Appointment | null>(null);
  const bookingRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  function handleSelect(service: Service) {
    setSelectedServiceId(service.id);
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen">
      <SiteNav />

      <section
        id="inicio"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <img
          src={heroImage}
          alt="Interior de Barbería Norte con sillón de barbero clásico"
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="relative mx-auto max-w-3xl px-6 py-32 text-center">

          <p className="eyebrow">Desde 2026 · Ciudad de México</p>

          <h1 className="mt-6 text-6xl leading-none sm:text-8xl">
            Barbería <span className="text-primary">Norte</span>
          </h1>
          <p className="mt-5 text-base tracking-wide text-muted-foreground sm:text-lg">
            Tu nueva imagen comienza aquí.
          </p>
          
          <div className="mt-10">
            <Button
              size="lg"
              onClick={() =>
                bookingRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Reservar cita
            </Button>
          </div>
        </div>
        <a
          href="#servicios"
          aria-label="Ver servicios"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      <section id="servicios" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="max-w-xl">
          <p className="eyebrow">Servicios</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Lo que hacemos</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Precios claros, tiempos precisos. Elige el servicio y continúa con tu
            reserva.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </section>

      <section
        id="reservar"
        ref={bookingRef}
        className="border-t border-border px-6 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Agenda</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Reserva tu cita</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Completa tus datos y elige el horario que mejor te acomode.
          </p>
        </div>
        <div className="mt-12">
          <BookingForm
            services={services}
            selectedServiceId={selectedServiceId}
            onServiceChange={setSelectedServiceId}
            onSuccess={setConfirmed}
          />
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10 text-center text-xs tracking-[0.16em] uppercase text-muted-foreground">
        Barbería Norte · Lun a Sáb · 09:00 – 18:00
      </footer>

      {confirmed ? (
        <ConfirmationModal
          appointment={confirmed}
          onClose={() => {
            setConfirmed(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ) : null}
    </div>
  );
}
