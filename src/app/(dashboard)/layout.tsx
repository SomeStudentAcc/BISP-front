import { PropsWithChildren } from "react";

import Header from "@/components/shared/header/Header";
import LayoutContainer from "@/components/shared/sidebar/LayoutContainer";
import Sidebar from "@/components/shared/sidebar/Sidebar";

export default function SiteLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <div className="fixed left-0 z-50 h-[75px] w-full">
          <Header />
        </div>
        <Sidebar />
        <LayoutContainer>{children}</LayoutContainer>
      </div>
    </div>
  );
}
