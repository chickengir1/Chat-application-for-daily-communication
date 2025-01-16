import Sidebar from "@/components/ui/Sidebar";
import BottomNavigation from "./BottomNavigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <div className="md:m-6">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
      <div className="md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Layout;