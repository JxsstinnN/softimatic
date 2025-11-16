import { AlertCircle, Clock, CheckCircle2, Zap, TrendingUp, Calendar } from 'lucide-react';

const priorityTasks = [
  {
    id: 1,
    title: 'API de Autenticación - Implementar JWT',
    project: 'Sistema E-Commerce',
    priority: 'Alta',
    priorityColor: 'bg-red-100 text-red-700 border-red-200',
    dueDate: '18/1/2025',
    daysLeft: 2,
    progress: 65,
    assignedBy: 'Manager Proyecto',
  },
  {
    id: 2,
    title: 'Integración de Pagos - Stripe',
    project: 'App Móvil Delivery',
    priority: 'Alta',
    priorityColor: 'bg-red-100 text-red-700 border-red-200',
    dueDate: '20/1/2025',
    daysLeft: 4,
    progress: 45,
    assignedBy: 'Manager Proyecto',
  },
  {
    id: 3,
    title: 'Página de Checkout - Frontend',
    project: 'Sistema E-Commerce',
    priority: 'Media',
    priorityColor: 'bg-amber-100 text-amber-700 border-amber-200',
    dueDate: '22/1/2025',
    daysLeft: 6,
    progress: 30,
    assignedBy: 'Tech Lead',
  },
];

const upcomingDeadlines = [
  {
    id: 1,
    title: 'Testing de Integración - App Móvil',
    project: 'App Móvil Delivery',
    dueDate: '19/1/2025',
    daysLeft: 3,
    status: 'En Progreso',
    statusColor: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  {
    id: 2,
    title: 'Dashboard de Usuario - Frontend',
    project: 'Portal Administrativo',
    dueDate: '23/1/2025',
    daysLeft: 7,
    status: 'No Iniciado',
    statusColor: 'bg-slate-100 text-slate-700 border-slate-200',
  },
  {
    id: 3,
    title: 'Sistema de Diseño - Componentes',
    project: 'Portal Administrativo',
    dueDate: '25/1/2025',
    daysLeft: 9,
    status: 'En Revisión',
    statusColor: 'bg-purple-100 text-purple-700 border-purple-200',
  },
];

const stats = [
  {
    id: 1,
    label: 'Tareas Completadas',
    value: '12',
    total: '15',
    icon: CheckCircle2,
    color: 'from-emerald-500 to-emerald-600',
    percentage: 80,
  },
  {
    id: 2,
    label: 'Tareas Críticas',
    value: '2',
    icon: AlertCircle,
    color: 'from-red-500 to-red-600',
    percentage: 0,
  },
  {
    id: 3,
    label: 'Horas Esta Semana',
    value: '38',
    icon: Clock,
    color: 'from-blue-500 to-blue-600',
    percentage: 95,
  },
  {
    id: 4,
    label: 'Productividad',
    value: '94%',
    icon: TrendingUp,
    color: 'from-violet-500 to-violet-600',
    percentage: 94,
  },
];

export function EmployeeDashboard() {
  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft <= 2) return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950';
    if (daysLeft <= 5) return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950';
    return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950';
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.label}</span>
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</span>
                {stat.total && <span className="text-sm text-slate-500 dark:text-slate-400">/ {stat.total}</span>}
              </div>
              {stat.percentage > 0 && (
                <div className="mt-4 w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all`}
                    style={{ width: `${stat.percentage}%` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 dark:bg-red-950 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Tareas Prioritarias</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Por completar en los próximos días</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {priorityTasks.map((task) => (
              <div key={task.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                      {task.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{task.project}</p>
                  </div>
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ml-4 ${task.priorityColor}`}>
                    {task.priority}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-600 dark:text-slate-400">Progreso</span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{task.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">{task.assignedBy}</span>
                  <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-medium ${getDaysLeftColor(task.daysLeft)}`}>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{task.daysLeft} días</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Próximas Fechas Límite</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Tareas por vencer</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                      {deadline.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{deadline.project}</p>
                  </div>
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ml-4 ${deadline.statusColor}`}>
                    {deadline.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">{deadline.dueDate}</span>
                  <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-medium ${getDaysLeftColor(deadline.daysLeft)}`}>
                    <Zap className="w-3.5 h-3.5" />
                    <span>{deadline.daysLeft} días</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl border border-blue-200 dark:border-blue-800 p-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Excelente desempeño esta semana</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Has completado 80% de tus tareas asignadas y mantienes una productividad del 94%. Sigue así.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
              Ver Proyecto Actual
            </button>
            <button className="px-6 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors font-medium">
              Ver Reportes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
