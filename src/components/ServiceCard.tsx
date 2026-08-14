import type { Service } from "@/types";
import { Button, Card } from "@/components/ui-kit";
import { formatPrice } from "@/lib/format";

export function ServiceCard({
  service,
  onSelect,
}: {
  service: Service;
  onSelect: (service: Service) => void;
}) {
  return (
    <Card className="flex h-full flex-col hover:border-primary/50">
      <h3 className="text-2xl">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
        <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {service.durationMin} min
        </span>
        <span className="font-display text-xl text-primary">
          {formatPrice(service.priceMxn)}
        </span>
      </div>
      <Button
        className="mt-5 w-full"
        variant="outline"
        onClick={() => onSelect(service)}
      >
        Reservar
      </Button>
    </Card>
  );
}
