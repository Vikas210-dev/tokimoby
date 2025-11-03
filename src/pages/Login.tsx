import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Play } from "lucide-react";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Check your mobile for the verification code",
      });
    } else {
      toast({
        title: "Invalid Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      localStorage.setItem("isLoggedIn", "true");
      toast({
        title: "Welcome to Tokimoby!",
        description: "Login successful",
      });
      navigate("/");
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Brand removed */}
        <div className="text-center space-y-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Tokimoby
            </h1>
            <p className="text-muted-foreground mt-2">Watch Stories. Feel Emotions.</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-card backdrop-blur-xl border border-border rounded-3xl p-8 space-y-6 shadow-[var(--shadow-card)]">
          {!otpSent ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Mobile Number</label>
                <Input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="h-14 text-lg rounded-2xl bg-input border-border"
                />
              </div>
              <Button
                onClick={handleSendOtp}
                className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                Get OTP
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Enter OTP</label>
                <Input
                  type="tel"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="h-14 text-lg text-center tracking-widest rounded-2xl bg-input border-border"
                />
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handleVerifyOtp}
                  className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  Verify & Login
                </Button>
                <Button
                  onClick={() => setOtpSent(false)}
                  variant="outline"
                  className="w-full h-12 rounded-2xl border-border"
                >
                  Change Number
                </Button>
              </div>
            </>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
