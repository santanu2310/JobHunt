"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

type NotificationType = "success" | "error" | "info" | "warning";

type Notification = {
    id: string;
    message: string;
    type: NotificationType;
};

type NotificationContextType = {
    notify: (message: string, type?: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotification() {
    const ctx = useContext(NotificationContext);
    if (!ctx) {
        throw new Error("useNotification must be used within NotificationProvider");
    }
    return ctx;
}

const icons: Record<NotificationType, React.ReactNode> = {
    success: <CheckCircle size={18} />,
    error: <AlertCircle size={18} />,
    info: <Info size={18} />,
    warning: <AlertTriangle size={18} />,
};

const styles: Record<NotificationType, string> = {
    success: "bg-green-50 border-green-400 text-green-800",
    error: "bg-red-50 border-red-400 text-red-800",
    info: "bg-blue-50 border-blue-400 text-blue-800",
    warning: "bg-amber-50 border-amber-400 text-amber-800",
};

const iconColors: Record<NotificationType, string> = {
    success: "text-green-500",
    error: "text-red-500",
    info: "text-blue-500",
    warning: "text-amber-500",
};

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const notify = useCallback((message: string, type: NotificationType = "info") => {
        const id = crypto.randomUUID();
        setNotifications((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 4000);
    }, []);

    const dismiss = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}

            {/* Toast container */}
            <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
                {notifications.map((n) => (
                    <div
                        key={n.id}
                        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg min-w-[300px] max-w-[420px] animate-[slideIn_0.3s_ease-out] ${styles[n.type]}`}
                    >
                        <span className={iconColors[n.type]}>{icons[n.type]}</span>
                        <span className="text-sm font-medium flex-1">{n.message}</span>
                        <button
                            onClick={() => dismiss(n.id)}
                            className="opacity-60 hover:opacity-100 transition-opacity shrink-0"
                            aria-label="Dismiss"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
}
