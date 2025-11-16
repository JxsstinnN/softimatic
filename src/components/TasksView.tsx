import { useState } from 'react';
import { Clock, MessageSquare, Plus, X } from 'lucide-react';

type Priority = 'Alta' | 'Media' | 'Baja';
type CategoryName = 'Backend' | 'Frontend' | 'Design' | 'Qa';

interface Developer {
  id: number;
  name: string;
  avatar: string;
  role: string;
}

interface Task {
  id: number;
  title: string;
  project: string;
  priority: Priority;
  priorityColor: string;
  time: string;
  comments: number;
  description?: string;
  assignedTo?: number; // ID del desarrollador asignado
}

const developers: Developer[] = [
  { id: 1, name: 'Juan Pérez', avatar: 'JP', role: 'Backend Developer' },
  { id: 2, name: 'María García', avatar: 'MG', role: 'Backend Developer' },
  { id: 3, name: 'Carlos López', avatar: 'CL', role: 'Frontend Developer' },
  { id: 4, name: 'Ana Martínez', avatar: 'AM', role: 'Frontend Developer' },
  { id: 5, name: 'Luis Rodríguez', avatar: 'LR', role: 'UI/UX Designer' },
  { id: 6, name: 'Sofía Torres', avatar: 'ST', role: 'QA Engineer' },
];

interface TaskCategory {
  id: number;
  name: CategoryName;
  count: number;
  color: string;
  tasks: Task[];
}

const initialCategories: TaskCategory[] = [
  {
    id: 1,
    name: 'Backend',
    count: 2,
    color: 'bg-blue-600',
    tasks: [
      {
        id: 1,
        title: 'API de Autenticación',
        project: 'Sistema E-Commerce',
        priority: 'Alta',
        priorityColor: 'bg-red-100 text-red-700 border-red-200',
        time: '3.5h',
        comments: 2,
      },
      {
        id: 2,
        title: 'Integración de Pagos',
        project: 'App Móvil Delivery',
        priority: 'Media',
        priorityColor: 'bg-amber-100 text-amber-700 border-amber-200',
        time: '5.2h',
        comments: 4,
      },
    ],
  },
  {
    id: 2,
    name: 'Frontend',
    count: 2,
    color: 'bg-emerald-600',
    tasks: [
      {
        id: 3,
        title: 'Dashboard de Usuario',
        project: 'Portal Administrativo',
        priority: 'Alta',
        priorityColor: 'bg-red-100 text-red-700 border-red-200',
        time: '4.0h',
        comments: 1,
      },
      {
        id: 4,
        title: 'Página de Checkout',
        project: 'Sistema E-Commerce',
        priority: 'Alta',
        priorityColor: 'bg-red-100 text-red-700 border-red-200',
        time: '2.8h',
        comments: 3,
      },
    ],
  },
  {
    id: 3,
    name: 'Design',
    count: 1,
    color: 'bg-violet-600',
    tasks: [
      {
        id: 5,
        title: 'Sistema de Diseño',
        project: 'Portal Administrativo',
        priority: 'Media',
        priorityColor: 'bg-amber-100 text-amber-700 border-amber-200',
        time: '6.5h',
        comments: 5,
      },
    ],
  },
  {
    id: 4,
    name: 'Qa',
    count: 1,
    color: 'bg-cyan-600',
    tasks: [
      {
        id: 6,
        title: 'Testing de Integración',
        project: 'App Móvil Delivery',
        priority: 'Alta',
        priorityColor: 'bg-red-100 text-red-700 border-red-200',
        time: '3.0h',
        comments: 2,
      },
    ],
  },
];

const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'Alta':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'Media':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Baja':
      return 'bg-green-100 text-green-700 border-green-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export function TasksView() {
  const [categories, setCategories] = useState<TaskCategory[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    project: '',
    category: 'Backend' as CategoryName,
    priority: 'Media' as Priority,
    time: '',
    comments: 0,
    description: '',
    assignedTo: '' as string | number,
  });

  const getNextTaskId = (): number => {
    const allTaskIds = categories.flatMap(cat => cat.tasks.map(t => t.id));
    return Math.max(...allTaskIds, 0) + 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.project || !formData.time) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const newTask: Task = {
      id: getNextTaskId(),
      title: formData.title,
      project: formData.project,
      priority: formData.priority,
      priorityColor: getPriorityColor(formData.priority),
      time: formData.time,
      comments: formData.comments,
      description: formData.description,
      assignedTo: formData.assignedTo ? Number(formData.assignedTo) : undefined,
    };

    setCategories(prevCategories => 
      prevCategories.map(category => {
        if (category.name === formData.category) {
          return {
            ...category,
            tasks: [...category.tasks, newTask],
            count: category.tasks.length + 1,
          };
        }
        return category;
      })
    );

    // Reset form
    setFormData({
      title: '',
      project: '',
      category: 'Backend',
      priority: 'Media',
      time: '',
      comments: 0,
      description: '',
      assignedTo: '',
    });
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'comments' ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <div>
      {/* Header con botón */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-[#0052CC] hover:bg-[#0065FF] dark:bg-[#0052CC] dark:hover:bg-[#0065FF] text-white px-4 py-2.5 rounded text-sm font-medium transition-all shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Crear tarea</span>
        </button>
      </div>

      {/* Grid de tareas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{category.name}</h3>
                <span className={`${category.color} text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium`}>
                  {category.count}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {category.tasks.map((task) => {
                const assignedDeveloper = task.assignedTo 
                  ? developers.find(dev => dev.id === task.assignedTo)
                  : null;

                return (
                  <div
                    key={task.id}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors flex items-center justify-center">
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                            {task.id}
                          </span>
                        </div>
                        {assignedDeveloper && (
                          <div className="flex items-center space-x-1" title={assignedDeveloper.name}>
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-medium">{assignedDeveloper.avatar}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {task.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{task.project}</p>
                    </div>

                    <div className="mb-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${task.priorityColor}`}>
                        {task.priority}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        <span>{task.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="w-3.5 h-3.5 mr-1" />
                        <span>{task.comments}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Modal del formulario estilo Jira */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-[rgba(9,30,66,0.54)] dark:bg-black/60 flex items-start justify-center z-50 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-2xl w-full my-8 mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Header estilo Jira */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#DFE1E6] dark:border-slate-700 bg-[#F4F5F7] dark:bg-slate-900 rounded-t-lg">
              <h2 className="text-lg font-semibold text-[#172B4D] dark:text-slate-100">Crear tarea</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#6B778C] dark:text-slate-400 hover:text-[#172B4D] dark:hover:text-slate-100 transition-colors p-1 hover:bg-[#EBECF0] dark:hover:bg-slate-800 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5">
                {/* Título - Campo principal grande */}
                <div>
                  <label htmlFor="title" className="block text-xs font-semibold text-[#6B778C] dark:text-slate-400 uppercase mb-2">
                    Resumen <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    autoFocus
                    className="w-full px-3 py-2.5 text-base border border-[#DFE1E6] dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 hover:border-[#B3BAC5] dark:hover:border-slate-600 focus:outline-none focus:border-[#4C9AFF] focus:ring-2 focus:ring-[#4C9AFF] focus:ring-opacity-20 transition-all"
                    placeholder="Ingresa un resumen de la tarea"
                  />
                </div>

                {/* Grid de dos columnas para campos secundarios */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Proyecto */}
                  <div>
                    <label htmlFor="project" className="block text-xs font-semibold text-[#6B778C] dark:text-slate-400 uppercase mb-2">
                      Proyecto <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="project"
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 text-sm border border-[#DFE1E6] dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 hover:border-[#B3BAC5] dark:hover:border-slate-600 focus:outline-none focus:border-[#4C9AFF] focus:ring-2 focus:ring-[#4C9AFF] focus:ring-opacity-20 transition-all"
                      placeholder="Nombre del proyecto"
                    />
                  </div>

                  {/* Categoría */}
                  <div>
                    <label htmlFor="category" className="block text-xs font-semibold text-[#6B778C] dark:text-slate-400 uppercase mb-2">
                      Tipo <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 text-sm border border-[#DFE1E6] dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:border-[#B3BAC5] dark:hover:border-slate-600 focus:outline-none focus:border-[#4C9AFF] focus:ring-2 focus:ring-[#4C9AFF] focus:ring-opacity-20 transition-all cursor-pointer"
                    >
                      <option value="Backend">Backend</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Design">Design</option>
                      <option value="Qa">Qa</option>
                    </select>
                  </div>
                </div>

                {/* Asignado a */}
                <div>
                  <label htmlFor="assignedTo" className="block text-xs font-semibold text-[#6B778C] dark:text-slate-400 uppercase mb-2">
                    Asignado a
                  </label>
                  <select
                    id="assignedTo"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 text-sm border border-[#DFE1E6] dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:border-[#B3BAC5] dark:hover:border-slate-600 focus:outline-none focus:border-[#4C9AFF] focus:ring-2 focus:ring-[#4C9AFF] focus:ring-opacity-20 transition-all cursor-pointer"
                  >
                    <option value="">Sin asignar</option>
                    {developers.map((dev) => (
                      <option key={dev.id} value={dev.id}>
                        {dev.name} - {dev.role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Grid de dos columnas para prioridad y tiempo */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Prioridad */}
                  <div>
                    <label htmlFor="priority" className="block text-xs font-semibold text-[#6B778C] dark:text-slate-400 uppercase mb-2">
                      Prioridad <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 text-sm border border-[#DFE1E6] dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:border-[#B3BAC5] dark:hover:border-slate-600 focus:outline-none focus:border-[#4C9AFF] focus:ring-2 focus:ring-[#4C9AFF] focus:ring-opacity-20 transition-all cursor-pointer"
                    >
                      <option value="Alta">Alta</option>
                      <option value="Media">Media</option>
                      <option value="Baja">Baja</option>
                    </select>
                  </div>

                  {/* Tiempo estimado */}
                  <div>
                    <label htmlFor="time" className="block text-xs font-semibold text-[#6B778C] dark:text-slate-400 uppercase mb-2">
                      Tiempo Estimado <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 text-sm border border-[#DFE1E6] dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 hover:border-[#B3BAC5] dark:hover:border-slate-600 focus:outline-none focus:border-[#4C9AFF] focus:ring-2 focus:ring-[#4C9AFF] focus:ring-opacity-20 transition-all"
                      placeholder="Ej: 3.5h"
                    />
                  </div>
                </div>

                {/* Descripción - Textarea grande estilo Jira */}
                <div>
                  <label htmlFor="description" className="block text-xs font-semibold text-[#6B778C] dark:text-slate-400 uppercase mb-2">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 py-2.5 text-sm border border-[#DFE1E6] dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 hover:border-[#B3BAC5] dark:hover:border-slate-600 focus:outline-none focus:border-[#4C9AFF] focus:ring-2 focus:ring-[#4C9AFF] focus:ring-opacity-20 transition-all resize-none font-normal"
                    placeholder="Agrega más detalles sobre esta tarea..."
                  />
                </div>

                {/* Comentarios */}
                <div>
                  <label htmlFor="comments" className="block text-xs font-semibold text-[#6B778C] dark:text-slate-400 uppercase mb-2">
                    Comentarios Iniciales
                  </label>
                  <input
                    type="number"
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2.5 text-sm border border-[#DFE1E6] dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 hover:border-[#B3BAC5] dark:hover:border-slate-600 focus:outline-none focus:border-[#4C9AFF] focus:ring-2 focus:ring-[#4C9AFF] focus:ring-opacity-20 transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Footer con botones estilo Jira */}
              <div className="flex items-center justify-end space-x-2 pt-6 mt-6 border-t border-[#DFE1E6] dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-[#42526E] dark:text-slate-300 hover:bg-[#EBECF0] dark:hover:bg-slate-700 rounded transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium bg-[#0052CC] text-white rounded hover:bg-[#0065FF] transition-colors shadow-sm"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
