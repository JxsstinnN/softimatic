import { FileText, Eye, Download } from 'lucide-react';

const invoices = [
  {
    id: 1,
    number: 'INV-001',
    project: 'Sistema E-Commerce',
    client: 'Cliente A',
    tasks: 16,
    amount: 'RD$80,000',
    date: '14/1/2025',
    status: 'Pagada',
    statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
  {
    id: 2,
    number: 'INV-002',
    project: 'App Móvil Delivery',
    client: 'Cliente B',
    tasks: 16,
    amount: 'RD$80,000',
    date: '19/1/2025',
    status: 'Pendiente',
    statusColor: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  {
    id: 3,
    number: 'INV-003',
    project: 'Portal Administrativo',
    client: 'Cliente C',
    tasks: 5,
    amount: 'RD$25,000',
    date: '9/1/2025',
    status: 'Pagada',
    statusColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
];

const stats = [
  {
    id: 1,
    label: 'Total Facturado',
    amount: 'RD$185,000',
    detail: '37 tareas completadas',
    color: 'bg-slate-50 border-slate-200',
  },
  {
    id: 2,
    label: 'Pagadas',
    amount: 'RD$105,000',
    detail: '21 tareas',
    badge: '2',
    badgeColor: 'bg-emerald-600',
    color: 'bg-emerald-50 border-emerald-200',
  },
  {
    id: 3,
    label: 'Pendientes',
    amount: 'RD$80,000',
    detail: '16 tareas',
    badge: '1',
    badgeColor: 'bg-amber-600',
    color: 'bg-amber-50 border-amber-200',
  },
];

export function InvoicesView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`${stat.color} border rounded-xl p-6 transition-shadow hover:shadow-md`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">{stat.label}</span>
              {stat.badge && (
                <span className={`${stat.badgeColor} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                  {stat.badge}
                </span>
              )}
            </div>
            <div className="mb-2">
              <span className="text-3xl font-bold text-slate-800">{stat.amount}</span>
            </div>
            <p className="text-sm text-slate-500">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Factura</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Proyecto</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Cliente</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Tareas</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Monto</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Fecha</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Estado</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-800">{invoice.number}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-slate-800">{invoice.project}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-slate-600">{invoice.client}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-slate-600">{invoice.tasks} tareas</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-semibold text-slate-800">{invoice.amount}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-slate-600">{invoice.date}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${invoice.statusColor}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Ver">
                        <Eye className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Descargar">
                        <Download className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
