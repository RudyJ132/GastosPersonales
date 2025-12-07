import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { ToastProvider } from './components/ToastProvider';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const { fetchUserProfile, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated, fetchUserProfile]);

  return (
    <ToastProvider>
      <div className="flex h-screen bg-gray-100">
        {isAuthenticated && <Sidebar />}
        <div className="flex-1 flex flex-col overflow-hidden">
          {isAuthenticated && <Navbar />}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;