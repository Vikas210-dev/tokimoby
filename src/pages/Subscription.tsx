import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: "₹99",
    period: "/month",
    features: [
      "Unlimited video streaming",
      "All languages available",
      "HD quality playback",
      "Watch on mobile",
      "Cancel anytime",
    ],
    popular: false,
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "₹999",
    period: "/year",
    features: [
      "Unlimited video streaming",
      "All languages available",
      "HD quality playback",
      "Watch on mobile",
      "Priority support",
      "Save 17% annually",
    ],
    popular: true,
  },
];

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const { toast } = useToast();

  const handleSubscribe = () => {
    toast({
      title: "Subscription Activated!",
      description: `You're now on the ${plans.find(p => p.id === selectedPlan)?.name} plan`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-primary p-6 pt-8">
        <div className="text-center space-y-2">
          <Sparkles className="w-12 h-12 mx-auto text-primary-foreground" />
          <h1 className="text-3xl font-bold text-primary-foreground">
            Choose Your Plan
          </h1>
          <p className="text-primary-foreground/80">
            Unlimited stories, unlimited emotions
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="p-4 space-y-4 mt-6 animate-slide-up">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`relative bg-card rounded-3xl p-6 border-2 transition-all cursor-pointer ${
              selectedPlan === plan.id
                ? "border-primary shadow-[var(--shadow-glow)] scale-105"
                : "border-border"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-accent px-4 py-1 rounded-full">
                <span className="text-xs font-bold text-accent-foreground">
                  MOST POPULAR
                </span>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                <div className="flex items-baseline mt-1">
                  <span className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === plan.id
                    ? "bg-primary border-primary"
                    : "border-border"
                }`}
              >
                {selectedPlan === plan.id && (
                  <Check className="w-4 h-4 text-primary-foreground" />
                )}
              </div>
            </div>

            <div className="space-y-3">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Subscribe Button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <Button
          onClick={handleSubscribe}
          className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-accent hover:opacity-90 transition-opacity shadow-lg"
        >
          Subscribe Now
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Subscription;
