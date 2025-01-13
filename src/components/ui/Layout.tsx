import Sidebar from "@/components/ui/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // media query를 이용해서 사이드바 -> 바텀 네비게이션으로 변경 해야함
    <div className="flex h-screen">
      <div className="w-[15%] p-6">
        <Sidebar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
