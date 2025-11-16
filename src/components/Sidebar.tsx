import { LayoutDashboard, FolderOpen, CheckSquare, Users, FileText, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

type View = 'dashboard' | 'projects' | 'tasks' | 'team' | 'invoices';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onLogout?: () => void;
}

export function Sidebar({ currentView, onViewChange, onLogout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects' as View, label: 'Proyectos', icon: FolderOpen },
    { id: 'tasks' as View, label: 'Tareas', icon: CheckSquare },
    { id: 'team' as View, label: 'Equipo', icon: Users },
    { id: 'invoices' as View, label: 'Facturación', icon: FileText },
  ];

  const handleViewChange = (view: View) => {
    onViewChange(view);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
      >
        {isOpen ? <X className="w-6 h-6 text-slate-800 dark:text-slate-100" /> : <Menu className="w-6 h-6 text-slate-800 dark:text-slate-100" />}
      </button>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-transform duration-300 transform z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 flex items-center space-x-3 border-b border-slate-700">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold">Softimatic</span>
        </div>

        <nav className="flex-1 px-4 py-8">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleViewChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
            <p className="text-xs text-slate-400">Usuario actual</p>
            <p className="text-sm font-semibold text-white mt-1">Juan Pérez</p>
            <p className="text-xs text-slate-400">Lider de Proyecto</p>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar sesión</span>
            </button>
          )}
        </div>
      </div>

      <div className="hidden md:block md:w-64 fixed inset-y-0 left-0"></div>
    </>
  );
}
