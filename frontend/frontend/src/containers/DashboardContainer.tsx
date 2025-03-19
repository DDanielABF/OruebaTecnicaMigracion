// src/containers/DashboardContainer.tsx
import React, { useEffect, useState, useContext } from 'react';
import DashboardView from '../pages/DashboardPage';
import { AuthContext, AuthContextType } from '../context/AuthContext';
import { getPassportsByUser, Passport } from '../services/dashboard';

interface DashboardData {
  passports: Passport[];
  stats: {
    totalPasaportes: number;
  };
}

const DashboardContainer: React.FC = () => {
  const { user } = useContext<AuthContextType>(AuthContext);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setError('Usuario no encontrado');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('authToken') || '';
        const passports = await getPassportsByUser(user.id, token);
        console.log('data > ')
        console.log(passports)

        setDashboardData({
           
          passports,
          stats: {
            totalPasaportes: passports.length,
          },
        });
      } catch (err: any) {
        setError(err.message || 'Error al obtener los pasaportes');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <DashboardView
      user={user}
      dashboardData={dashboardData!}
    />
  );
};

export default DashboardContainer;
