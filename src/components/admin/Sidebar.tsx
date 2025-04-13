import { 
  LayoutDashboard, 
  Users, 
  Pill, 
  Building, 
  Receipt, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'medicines', label: 'Medicines', icon: <Pill size={20} /> },
    { id: 'pharmacies', label: 'Pharmacies', icon: <Building size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <Receipt size={20} /> },
    { id: 'reports', label: 'Reports & Analytics', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside 
      className={cn(
        "bg-primary text-primary-foreground shrink-0 border-r border-border transition-all duration-300 z-20", 
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-primary/10">
        <div className={cn("flex items-center overflow-hidden", collapsed ? "justify-center w-full" : "")}>
          {!collapsed && (
            <span className="font-bold text-xl tracking-tight whitespace-nowrap">
              MediShare
            </span>
          )}
          {collapsed && <Pill size={28} />}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-primary-foreground/70 hover:text-primary-foreground p-1 rounded-full"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center w-full px-3 py-2 rounded-md transition-colors",
                  activeTab === item.id 
                    ? "bg-primary-foreground text-primary" 
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && (
                  <span className="ml-3 truncate">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;