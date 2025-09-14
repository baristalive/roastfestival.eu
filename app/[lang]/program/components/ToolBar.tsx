import Home from '@/app/icons/home'
import React, { useContext } from 'react'
import Link from 'next/link'
import Dropdown from './Dropdown'
import List from '@/app/icons/list'
import { ScheduleView } from '../contexts'

const ToolBar = () => {
  const {view, setView} = useContext(ScheduleView);

  return (
    <div className="card elevate rounded-b-[2rem] p-2 fixed w-full xl:w-1/2">
      <nav className="flex gap-4 justify-between px-2">
        <Link href='/' className="text-4xl p-2 inline-block flex items-center justify-center"><Home /></Link>
        <div className="flex gap-x-6 justify-end flex-wrap ">
          <Dropdown />
        </div>
        <div className="text-4xl py-2 cursor-pointer" onClick={setView}><List /></div>
      </nav>
    </div>
  )
}

export default ToolBar
