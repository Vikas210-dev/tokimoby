import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Crown, History, Settings, LogOut, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";

const Account = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast({
      title: "Logged Out",
      description: "See you soon!",
    });
    navigate("/login");
  };

  const menuItems = [
    {
      icon: Crown,
      label: "Subscription",
      description: "Yearly Plan Active",
      onClick: () => navigate("/subscription"),
    },
    {
      icon: History,
      label: "Watch History",
      description: "View your watched stories",
      onClick: () => toast({ title: "Coming Soon", description: "Watch history feature" }),
    },
    {
      icon: Settings,
      label: "Settings",
      description: "App preferences",
      onClick: () => toast({ title: "Coming Soon", description: "Settings feature" }),
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Profile Header */}
      <div className="bg-gradient-primary p-6 pt-8 pb-12">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-card/20 backdrop-blur-xl rounded-full flex items-center justify-center border-2 border-primary-foreground/20">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-primary-foreground">John Doe</h2>
            <p className="text-primary-foreground/80">+91 98765 43210</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-3 -mt-6 animate-slide-up">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={item.onClick}
            className="bg-card rounded-2xl p-4 border border-border cursor-pointer hover:border-primary transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-14 rounded-2xl border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>

      {/* App Info */}
      <div className="text-center mt-8 text-muted-foreground text-sm">
        <p>Tokimoby v1.0</p>
        <p className="mt-1">Watch Stories. Feel Emotions.</p>
      </div>

      <BottomNav />
    </div>
  );
};

export default Account;
