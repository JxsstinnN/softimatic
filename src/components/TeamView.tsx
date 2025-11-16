import { Clock } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Juan Pérez',
    role: 'Backend Developer',
    status: 'Activo',
    statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    tasks: { completed: 12, total: 15 },
    progress: 80,
    hours: '32h esta semana',
    currentTask: 'API de Autenticación',
    avatar: 'JP',
  },
  {
    id: 2,
    name: 'María García',
    role: 'Backend Developer',
    status: 'Activo',
    statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    tasks: { completed: 18, total: 20 },
    progress: 90,
    hours: '38h esta semana',
    currentTask: 'Integración de Pagos',
    avatar: 'MG',
  },
  {
    id: 3,
    name: 'Carlos López',
    role: 'Frontend Developer',
    status: 'Activo',
    statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    tasks: { completed: 14, total: 18 },
    progress: 78,
    hours: '35h esta semana',
    currentTask: 'Dashboard de Usuario',
    avatar: 'CL',
  },
  {
    id: 4,
    name: 'Ana Martínez',
    role: 'Frontend Developer',
    status: 'Ausente',
    statusColor: 'bg-slate-100 text-slate-600 border-slate-200',
    tasks: { completed: 10, total: 14 },
    progress: 71,
    hours: '0h esta semana',
    currentTask: '',
    avatar: 'AM',
  },
  {
    id: 5,
    name: 'Luis Rodríguez',
    role: 'UI/UX Designer',
    status: 'Activo',
    statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    tasks: { completed: 8, total: 10 },
    progress: 80,
    hours: '28h esta semana',
    currentTask: 'Sistema de Diseño',
    avatar: 'LR',
  },
  {
    id: 6,
    name: 'Sofía Torres',
    role: 'QA Engineer',
    status: 'Activo',
    statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    tasks: { completed: 15, total: 16 },
    progress: 94,
    hours: '40h esta semana',
    currentTask: 'Testing de Integración',
    avatar: 'ST',
  },
];

export function TeamView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teamMembers.map((member) => (
        <div
          key={member.id}
          className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-lg">{member.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-800 mb-1">{member.name}</h3>
              <p className="text-sm text-slate-500 mb-2">{member.role}</p>
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${member.statusColor}`}>
                {member.status}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Tareas Completadas</span>
              <span className="text-sm font-semibold text-slate-800">
                {member.tasks.completed}/{member.tasks.total}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                style={{ width: `${member.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="flex items-center text-sm text-slate-600">
              <Clock className="w-4 h-4 mr-2 text-slate-400" />
              <span>{member.hours}</span>
            </div>
            {member.currentTask && (
              <div className="text-sm">
                <span className="text-slate-500">Trabajando en:</span>
                <p className="text-slate-700 font-medium mt-1">{member.currentTask}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
