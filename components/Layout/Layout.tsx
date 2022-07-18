import React, { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "../UI/Sidebar";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = props => (
  <div>
    {/* <Header /> */}
    <div className="pt-12 lg:flex">
      <div className="flex flex-col w-full px-4 py-8 overflow-y-auto lg:h-screen lg:w-64">
        <Sidebar userId={props.userId} />
      </div>
      <div className="w-full h-full p-4 m-8 overflow-y-auto">
        <div className="flex items-center justify-center p-16 mr-8">
          {props.children}
        </div>
      </div>
    </div>
  </div>
);

export default Layout;
