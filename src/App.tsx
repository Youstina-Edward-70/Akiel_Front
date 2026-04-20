import './App.css'
import { RouterProvider } from 'react-router-dom';
import { Routes } from './routes/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Routes} />
      <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
  )
}

export default App