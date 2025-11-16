import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { ProjectsView } from './components/ProjectsView';
import { TasksView } from './components/TasksView';
import { TeamView } from './components/TeamView';
import { InvoicesView } from './components/InvoicesView';

type View = 'dashboard' | 'projects' | 'tasks' | 'team' | 'invoices';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <EmployeeDashboard />;
      case 'projects':
        return <ProjectsView />;
      case 'tasks':
        return <TasksView />;
      case 'team':
        return <TeamView />;
      case 'invoices':
        return <InvoicesView />;
      default:
        return <EmployeeDashboard />;
    }
  };

  const getPageTitle = (): { title: string; description: string } => {
    const titles = {
      dashboard: { title: 'Dashboard', description: 'Tu resumen de tareas y progreso' },
      projects: { title: 'Proyectos', description: 'Gestiona tus proyectos de desarrollo' },
      tasks: { title: 'Tareas', description: 'Organiza y completa tus tareas' },
      team: { title: 'Equipo', description: 'Visualiza el equipo de trabajo' },
      invoices: { title: 'Facturación', description: 'Revisa los registros de facturación' },
    };
    return titles[currentView];
  };

  const pageInfo = getPageTitle();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      <div className="md:ml-64">
        <Header pageTitle={pageInfo.title} pageDescription={pageInfo.description} />

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;
