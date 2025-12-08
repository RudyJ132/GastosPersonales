import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import ToastProvider from './components/ToastProvider';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const { fetchUserProfile, isAuthenticated } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated, fetchUserProfile]);

  return (
    <ToastProvider>
      {isAuthenticated ? (
        <div className="flex h-screen bg-gray-50">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              <div className="container mx-auto px-4 sm:px-6 py-8">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </ToastProvider>
  );
}

export default App;