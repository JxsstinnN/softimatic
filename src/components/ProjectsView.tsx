import { Calendar, DollarSign, Users, MoreVertical } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'Sistema E-Commerce',
    client: 'Cliente A',
    status: 'En Progreso',
    statusColor: 'bg-blue-100 text-blue-700 border-blue-200',
    progress: 65,
    members: 5,
    tasks: { completed: 16, total: 24 },
    budget: 'RD$120,000',
    deadline: '14/2/2025',
  },
  {
    id: 2,
    name: 'App Móvil Delivery',
    client: 'Cliente B',
    status: 'En Revisión',
    statusColor: 'bg-amber-100 text-amber-700 border-amber-200',
    progress: 90,
    members: 4,
    tasks: { completed: 16, total: 18 },
    budget: 'RD$90,000',
    deadline: '29/1/2025',
  },
  {
    id: 3,
    name: 'Portal Administrativo',
    client: 'Cliente C',
    status: 'Iniciando',
    statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    progress: 15,
    members: 6,
    tasks: { completed: 5, total: 32 },
    budget: 'RD$160,000',
    deadline: '19/3/2025',
  },
];

export function ProjectsView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-slate-500">{project.client}</p>
              </div>
              <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="mb-4">
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${project.statusColor}`}>
                {project.status}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Progreso</span>
                <span className="text-sm font-semibold text-slate-800">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-slate-600">
                <Users className="w-4 h-4 mr-2 text-slate-400" />
                <span>{project.members} miembros</span>
                <span className="mx-2 text-slate-300">•</span>
                <span>{project.tasks.completed}/{project.tasks.total} tareas</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center text-sm font-medium text-slate-700">
                <DollarSign className="w-4 h-4 mr-1 text-slate-400" />
                {project.budget}
              </div>
              <div className="flex items-center text-sm text-slate-500">
                <Calendar className="w-4 h-4 mr-1 text-slate-400" />
                {project.deadline}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
