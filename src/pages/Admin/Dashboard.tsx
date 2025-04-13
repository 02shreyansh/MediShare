import  { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import DashboardOverview from '@/components/admin/DashboardOverview';
import UsersManagement from '@/components/admin/UsersManagement';
import MedicinesManagement from '@/components/admin/MedicinesManagement';
import PharmaciesManagement from '@/components/admin/PharmaciesManagement';
import TransactionsManagement from '@/components/admin/TransactionsManagement';
// import ReportsAnalytics from './ReportsAnalytics';
// import Settings from './Settings';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UsersManagement />;
      case 'medicines':
        return <MedicinesManagement />;
      case 'pharmacies':
        return <PharmaciesManagement />;
      case 'transactions':
        return <TransactionsManagement />;
    //   case 'reports':
    //     return <ReportsAnalytics />;
    //   case 'settings':
    //     return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
          collapsed={sidebarCollapsed}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;