import Sidebar from "@/components/ui/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex h-screen">
      <div className="w-[15%] p-6">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
};

export default Layout;
