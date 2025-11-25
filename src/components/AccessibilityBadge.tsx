import { Shield, Eye, Keyboard, Type } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface AccessibilityBadgeProps {
  variant?: "compact" | "detailed";
}

export function AccessibilityBadge({ variant = "compact" }: AccessibilityBadgeProps) {
  const features = [
    {
      icon: Eye,
      label: "WCAG AAA Contrast",
      description: "7:1 minimum contrast ratio for optimal readability",
      color: "text-primary"
    },
    {
      icon: Keyboard,
      label: "Keyboard Navigation",
      description: "Full keyboard support with visible focus indicators",
      color: "text-secondary"
    },
    {
      icon: Type,
      label: "Semantic HTML",
      description: "Proper heading hierarchy and ARIA labels",
      color: "text-accent"
    },
    {
      icon: Shield,
      label: "Screen Reader Ready",
      description: "Tested with JAWS, NVDA, and VoiceOver",
      color: "text-primary"
    }
  ];

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-2">
        {features.map((feature) => (
          <Badge 
            key={feature.label} 
            variant="outline" 
            className="gap-1.5"
            title={feature.description}
          >
            <feature.icon className={`size-3.5 ${feature.color}`} />
            {feature.label}
          </Badge>
        ))}
      </div>
    );
  }

  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="size-5 text-primary" />
          <h4>Accessibility Features</h4>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div key={feature.label} className="flex gap-3">
              <feature.icon className={`size-5 ${feature.color} mt-0.5 flex-shrink-0`} />
              <div>
                <p className="font-medium">{feature.label}</p>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
