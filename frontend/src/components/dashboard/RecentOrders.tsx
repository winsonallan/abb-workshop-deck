"use client";
import { CheckCircle, Clock, Wrench, XCircle } from "lucide-react";

const orders = [
  {
    id: "#2041",
    type: "Repair",
    vehicle: "Toyota Avanza",
    status: "Repairing",
    revenue: "1.8M",
  },
  {
    id: "#2038",
    type: "Replacement",
    vehicle: "Honda Jazz",
    status: "Finished",
    revenue: "2.1M",
  },
  {
    id: "#2036",
    type: "Repair",
    vehicle: "Nissan X-Trail",
    status: "Rejected",
    revenue: "0M",
  },
  {
    id: "#2033",
    type: "Repair",
    vehicle: "Suzuki Ertiga",
    status: "Repairing",
    revenue: "1.6M",
  },
];

const statusColor = {
  Finished: "text-green-600 bg-green-100",
  Repairing: "text-yellow-700 bg-yellow-100",
  Rejected: "text-red-600 bg-red-100",
};

const statusIcon = {
  Finished: <CheckCircle size={16} />,
  Repairing: <Clock size={16} />,
  Rejected: <XCircle size={16} />,
};

export default function RecentOrders() {
  return (
    <div
      className="p-4 rounded-lg"
      style={{ background: "var(--floral-white)" }}
    >
      <h2
        className="text-lg font-bold mb-3"
        style={{ color: "var(--prussian-blue)" }}
      >
        Recent Orders
      </h2>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-150"
          >
            <div>
              <div className="font-semibold text-sm">{order.vehicle}</div>
              <div className="text-xs text-gray-500">
                {order.id} — {order.type}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${statusColor[order.status]}`}
              >
                {statusIcon[order.status]} {order.status}
              </span>
              <span className="text-sm font-semibold text-gray-700">
                {order.revenue}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
