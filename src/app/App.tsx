import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center sm:p-4">
      <div className="w-full h-full sm:h-[844px] sm:w-[390px] bg-slate-50 relative overflow-hidden sm:rounded-[40px] sm:shadow-2xl flex flex-col sm:border-[8px] border-slate-800">
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </div>
    </div>
  );
}
