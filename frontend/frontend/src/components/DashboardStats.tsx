
// src/components/DashboardStats.tsx
import React from 'react';

interface DashboardStatsProps {
  stats: {
    totalPasaportes: number;
    // Otros campos estadísticos
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <section>
      <h2>Estadísticas</h2>
      <p>Total de Pasaportes: {stats.totalPasaportes}</p>
      {/* Agrega más estadísticas o gráficos */}
    </section>
  );
};

export default DashboardStats;
