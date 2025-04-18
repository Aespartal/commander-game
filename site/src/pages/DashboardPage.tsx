// Página Protegida
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { fetchUserProfile } from '../api/auth.api'; // Importa la llamada protegida

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);


  // Cargar datos protegidos al montar la página
  useEffect(() => {
      const loadProfile = async () => {
          setLoadingProfile(true);
          setProfileError(null);
          try {
              const data = await fetchUserProfile();
              setProfileData(data);
          } catch (error: any) {
              setProfileError(error.message ?? 'Error al cargar el perfil');
          } finally {
              setLoadingProfile(false);
          }
      };
      loadProfile();
  }, [])

  return (
    <div>
      <h1>Dashboard (Protegido)</h1>
      <p>Bienvenido, {user?.email ?? 'Usuario'}</p>

      <h2>Datos del Perfil (API Protegida)</h2>
      {loadingProfile && <p>Cargando perfil...</p>}
      {profileError && <p style={{ color: 'red' }}>{profileError}</p>}
      {profileData && <pre>{JSON.stringify(profileData, null, 2)}</pre>}


      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default DashboardPage;