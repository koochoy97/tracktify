import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

type Props = {
  options: any[];
  placeholder: string;
};

export function Dropdown(props: Props) {
  const [option_selected, setOption_selected] = useState(props.placeholder);
  const handleOnClick = (option: string) => {
    setOption_selected(option);
  };
  return (
    <Menu as="div" className="relative inline-block text-left h-full">
      <div>
        <MenuButton className="flex w-full h-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {option_selected}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {props.options.map((option) => (
            <div key={option.id}>
              <MenuItem>
                <div
                  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  onClick={() => handleOnClick(option.nombre)}
                >
                  {option.nombre}
                </div>
              </MenuItem>
            </div>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
