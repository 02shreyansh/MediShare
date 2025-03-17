import { Bell, Check, Trash, Filter, Loader, RefreshCw } from "lucide-react";
import { useState } from "react";

interface Notification {
  id: number;
  title: string;
  description: string;
  read: boolean;
  timestamp: string;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Comment",
      description: "Your Medicine are Accepted",
      read: false,
      timestamp: "2023-05-01T10:30:00Z",
    },
    {
      id: 2,
      title: "Order Shipped",
      description: "Your order has been shipped.",
      read: true,
      timestamp: "2023-04-30T14:15:00Z",
    },
    {
      id: 3,
      title: "Friend Request",
      description: "Medicines Has been disposed.",
      read: false,
      timestamp: "2023-04-29T18:45:00Z",
    },
  ]);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const [isLoading, setIsLoading] = useState(false);


  const toggleReadStatus = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: !notification.read } : notification
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "read") return notification.read;
    if (filter === "unread") return !notification.read;
    return true;
  });

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Bell className="text-primary dark:text-primary-400" size={28} />
          <span className="text-gray-900 dark:text-gray-100">Notifications</span>
        </h1>
      </div>
      <div className="flex justify-center gap-3 mb-6">
        {["all", "read", "unread"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as "all" | "read" | "unread")}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === type
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {type === "all" && <Filter size={16} className="inline-block mr-2" />}
            {type === "read" && <Check size={16} className="inline-block mr-2" />}
            {type === "unread" && <Bell size={16} className="inline-block mr-2" />}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {isLoading ? (
          <div className="p-6 flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">No notifications found.</p>
          </div>
        ) : (
          <ul className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNotifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-4 rounded-lg shadow transition-all duration-300 ${
                  notification.read ? "bg-gray-50 dark:bg-gray-800" : "bg-yellow-50 dark:bg-yellow-900"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {notification.title}
                    </h2>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">{notification.description}</p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                    <span
                      className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded ${
                        notification.read ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {notification.read ? "Read" : "Unread"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => toggleReadStatus(notification.id)}
                      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-red-500 hover:text-white transition-colors duration-200"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={simulateLoading}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
      >
        {isLoading ? <Loader className="animate-spin" size={24} /> : <RefreshCw size={24} />}
      </button>
    </div>
  );
};

export default NotificationsPage;
