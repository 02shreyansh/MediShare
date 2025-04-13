import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Users, 
  Pill, 
  Building, 
  Receipt,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Archive
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const DashboardOverview = () => {
  // Mock data for charts
  const donationTrend = [
    { month: 'Jan', donations: 65, requests: 45 },
    { month: 'Feb', donations: 59, requests: 50 },
    { month: 'Mar', donations: 80, requests: 70 },
    { month: 'Apr', donations: 81, requests: 75 },
    { month: 'May', donations: 56, requests: 60 },
    { month: 'Jun', donations: 55, requests: 62 },
    { month: 'Jul', donations: 40, requests: 45 },
    { month: 'Aug', donations: 70, requests: 68 },
    { month: 'Sep', donations: 90, requests: 80 },
    { month: 'Oct', donations: 110, requests: 95 },
    { month: 'Nov', donations: 105, requests: 90 },
    { month: 'Dec', donations: 120, requests: 100 },
  ];

  const medicineCategories = [
    { name: 'Antibiotics', count: 240 },
    { name: 'Analgesics', count: 185 },
    { name: 'Antihistamines', count: 120 },
    { name: 'Cardiovascular', count: 164 },
    { name: 'Gastrointestinal', count: 98 },
    { name: 'Others', count: 210 },
  ];

  const medicineStatus = [
    { name: 'Available', value: 65 },
    { name: 'Reserved', value: 15 },
    { name: 'Sold', value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  const STATUS_COLORS = ['#22c55e', '#f59e0b', '#3b82f6'];

  const stats = [
    { 
      title: 'Total Users', 
      value: '4,532', 
      change: '+12%', 
      trend: 'up', 
      description: 'From last month', 
      icon: <Users className="h-5 w-5 text-primary" /> 
    },
    { 
      title: 'Medicines Listed', 
      value: '1,017', 
      change: '+8%', 
      trend: 'up', 
      description: 'From last month', 
      icon: <Pill className="h-5 w-5 text-pink-500" /> 
    },
    { 
      title: 'Partner Pharmacies', 
      value: '86', 
      change: '+3', 
      trend: 'up', 
      description: 'New this month', 
      icon: <Building className="h-5 w-5 text-indigo-500" /> 
    },
    { 
      title: 'Total Transactions', 
      value: '8,942', 
      change: '+18%', 
      trend: 'up', 
      description: 'From last month', 
      icon: <Receipt className="h-5 w-5 text-yellow-500" /> 
    },
  ];

  const alerts = [
    { title: 'Expiring Medicines', count: 28, icon: <AlertTriangle className="h-5 w-5 text-yellow-500" /> },
    { title: 'Pending Verification', count: 14, icon: <Archive className="h-5 w-5 text-blue-500" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">MediShare platform overview and statistics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                {stat.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {alerts.map((alert, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {alert.title}
              </CardTitle>
              {alert.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alert.count}</div>
              <p className="text-xs text-muted-foreground">
                Requires immediate attention
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Donations & Requests Trend</CardTitle>
            <CardDescription>Monthly donations and medicine requests</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={donationTrend}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="donations" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="requests" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Medicine Categories</CardTitle>
            <CardDescription>Distribution by medicine type</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={medicineCategories}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8">
                  {medicineCategories.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Medicine Status</CardTitle>
            <CardDescription>Current inventory status</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={medicineStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {medicineStatus.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Donation', user: 'John Doe', medicine: 'Amoxicillin', time: '10 minutes ago' },
                { type: 'Purchase', user: 'Jane Smith', medicine: 'Metformin', time: '25 minutes ago' },
                { type: 'Registration', user: 'Pharmacy Plus', medicine: 'New Partner', time: '1 hour ago' },
                { type: 'Verification', user: 'Admin', medicine: 'Lisinopril', time: '2 hours ago' },
                { type: 'Donation', user: 'Robert Johnson', medicine: 'Atorvastatin', time: '3 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 border-b pb-3 last:border-0">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center 
                    ${activity.type === 'Donation' ? 'bg-green-100 text-green-600' : 
                      activity.type === 'Purchase' ? 'bg-blue-100 text-blue-600' : 
                      activity.type === 'Registration' ? 'bg-purple-100 text-purple-600' : 
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                    {activity.type === 'Donation' ? '+' : 
                      activity.type === 'Purchase' ? '-' :
                      activity.type === 'Registration' ? 'R' : 'V'
                    }
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.type}: {activity.medicine}</p>
                    <p className="text-sm text-muted-foreground">By {activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;