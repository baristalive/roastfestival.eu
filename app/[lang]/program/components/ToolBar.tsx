import Home from '@/app/icons/home'
import React from 'react'
import Filter from '@/app/icons/filter'
import Link from 'next/link'
import Dropdown from './Dropdown'
import NavBar from '@/app/components/NavBar'
import List from '@/app/icons/list'

const ToolBar = () => {
  return (
    <div className="card elevate rounded-b-[2rem] p-2 fixed w-full xl:w-1/2">
      <nav className="flex gap-4 justify-between px-2">
        <Link href='/' className="text-4xl p-2 inline-block flex items-center justify-center"><Home /></Link>
        <div className="flex gap-x-6 justify-end flex-wrap ">
          <Dropdown />
        </div>
        <div className='text-4xl w-[calc(1em+1rem)]'></div>
        {/* <div className="text-4xl py-2 hidden xl:block"><List /></div> */}
      </nav>
    </div>
  )
}

export default ToolBar
