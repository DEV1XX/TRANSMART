import React from 'react'
import  {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
  } from './dropdown-menu'

const Navbar = () => {
  return (
    <div className='h-[10vh] flex justify-between pr-10 pt-8'>
        <div className='md:text-3xl md:pl-10 pl-4 hover:text-rose-600 hover:scale-110'>TRANSMART</div>
        <div className='mb-10'>
        <DropdownMenu>
            <DropdownMenuTrigger><span className="flex justify-center items-center material-symbols-outlined text-[30px] md:text-[2vw] h-[3vw] w-[3vw] hover:scale-125 hover:text-rose-600 rounded-full">menu</span></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Menu</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
    </DropdownMenu>
        </div>
    </div>
  )
}

export default Navbar