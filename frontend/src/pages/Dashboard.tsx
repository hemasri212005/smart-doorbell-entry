import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/integrations/api/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, Users, History, Camera } from "lucide-react";
import CameraFeed from "@/components/CameraFeed";
import FaceRegistration from "@/components/FaceRegistration";
import LogsView from "@/components/LogsView";

interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<"camera" | "register" | "logs">("camera");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      // First check localStorage for user
      const storedUser = authAPI.getCurrentUser();
      if (storedUser) {
        setUser(storedUser);
        setLoading(false);
        return;
      }
      
      // If no stored user, verify token with backend
      if (authAPI.isAuthenticated()) {
        try {
          const data = await authAPI.verify();
          setUser(data.user);
        } catch (error) {
          // Token invalid, redirect to auth
          authAPI.logout();
          navigate("/auth");
        }
      } else {
        navigate("/auth");
      }
      setLoading(false);
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    authAPI.logout();
    navigate("/auth");
  };

  if (loading || !user) return null;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="p-6 shadow-[var(--shadow-elevation)] border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Smart Doorbell System
              </h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {user.fullName || user.email}
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-primary/20">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => setActiveTab("camera")}
            variant={activeTab === "camera" ? "default" : "outline"}
            className={activeTab === "camera" ? "bg-gradient-to-r from-primary to-accent" : "border-primary/20"}
          >
            <Camera className="mr-2 h-4 w-4" />
            Live Camera
          </Button>
          <Button
            onClick={() => setActiveTab("register")}
            variant={activeTab === "register" ? "default" : "outline"}
            className={activeTab === "register" ? "bg-gradient-to-r from-primary to-accent" : "border-primary/20"}
          >
            <Users className="mr-2 h-4 w-4" />
            Register Faces
          </Button>
          <Button
            onClick={() => setActiveTab("logs")}
            variant={activeTab === "logs" ? "default" : "outline"}
            className={activeTab === "logs" ? "bg-gradient-to-r from-primary to-accent" : "border-primary/20"}
          >
            <History className="mr-2 h-4 w-4" />
            Activity Logs
          </Button>
        </div>

        {/* Content */}
        {activeTab === "camera" && <CameraFeed userId={user.id} />}
        {activeTab === "register" && <FaceRegistration userId={user.id} />}
        {activeTab === "logs" && <LogsView userId={user.id} />}
      </div>
    </div>
  );
};

export default Dashboard;