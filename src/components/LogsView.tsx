import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { logsAPI } from "@/integrations/api/client";
import { Unlock, UserCheck, UserX, Clock } from "lucide-react";

interface LogsViewProps {
  userId: string;
}

interface Log {
  _id: string;
  recognizedPerson: string | null;
  action: string;
  timestamp: string;
}

const LogsView = ({ userId }: LogsViewProps) => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    loadLogs();
    // Poll for updates every 5 seconds
    const interval = setInterval(loadLogs, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  const loadLogs = async () => {
    try {
      const data = await logsAPI.getAll(userId);
      setLogs(data);
    } catch (error) {
      console.error("Error loading logs:", error);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "unlocked":
        return <Unlock className="h-4 w-4" />;
      case "recognized":
        return <UserCheck className="h-4 w-4" />;
      case "denied":
        return <UserX className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "unlocked":
        return "bg-primary text-primary-foreground";
      case "recognized":
        return "bg-accent text-accent-foreground";
      case "denied":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="shadow-[var(--shadow-elevation)] border-primary/20">
      <CardHeader>
        <CardTitle>Activity Logs</CardTitle>
        <CardDescription>Recent doorbell activity and access logs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No activity logs yet</p>
          ) : (
            logs.map((log) => (
              <div
                key={log._id}
                className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
              >
                <div className={`p-2 rounded-full ${getActionColor(log.action)}`}>
                  {getActionIcon(log.action)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium">
                      {log.recognizedPerson || "Unknown Person"}
                    </p>
                    <Badge variant="outline" className="capitalize">
                      {log.action}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(log.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LogsView;