import Home from "@/app/icons/home";
import React, { useContext } from "react";
import Link from "next/link";
import Dropdown from "./Dropdown";
import List from "@/app/icons/list";
import { ScheduleView } from "../contexts";

const ToolBar = () => {
  const { setView } = useContext(ScheduleView);

  return (
    <div className="card elevate fixed w-full rounded-b-[2rem] p-2 xl:w-1/2">
      <nav className="flex justify-between gap-4 px-2">
        <Link
          href="/"
          className="flex inline-block items-center justify-center p-2 text-4xl"
        >
          <Home />
        </Link>
        <div className="flex flex-wrap justify-end gap-x-6">
          <Dropdown />
        </div>
        <div className="cursor-pointer py-2 text-4xl" onClick={setView}>
          <List />
        </div>
      </nav>
    </div>
  );
};

export default ToolBar;
