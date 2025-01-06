import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

export function MultiSelect(props) {
  const [option_selected, setOption_selected] = useState([props.placeholder]);
  const [options, setOptions] = useState(props.options);

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  const handleOnClick = (option) => {
    let temp_option_selected = [...option_selected];
    let temp_options = [...options];

    if (!temp_option_selected.includes(option)) {
      // Agregar la opción seleccionada
      temp_option_selected.push(option);
      setOption_selected(temp_option_selected);

      // Marcar la opción como seleccionada
      temp_options.find((i) => i.nombre === option).selected = true;
      setOptions(temp_options);
    } else {
      // Descarmar como seleccionada
      temp_options.find((i) => i.nombre === option).selected = false;
      setOptions(temp_options);

      //Quitar la opción seleccionada
      temp_option_selected = temp_option_selected.filter(
        (item_selected) => item_selected !== option
      );
      setOption_selected(temp_option_selected);
    }
  };

  const handle_onClick_item_selected = (e, item) => {
    e.stopPropagation();

    //Quitar opción clickedada de las opciones seleccionadas
    let temp_option_selected = [...option_selected];
    temp_option_selected = temp_option_selected.filter(
      (item_selected) => item_selected !== item
    );
    setOption_selected(temp_option_selected);

    // Marcar la opción como no seleccionada
    let temp_options = [...options];
    temp_options.find((i) => i.nombre === item).selected = false;
    setOptions(temp_options);
  };
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <MenuButton className="flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 gap-2">
          {option_selected.map((item) => (
            <div
              className="flex gap-1 border text-[12px] rounded-sm px-1 bg-[#EBF2E8] items-center"
              onClick={(e) => handle_onClick_item_selected(e, item)}
              key={item}
            >
              <p className="" key={item}>
                {item}
              </p>
              <img className="w-[14px]" src="/icons/X.png" alt="" />
            </div>
          ))}
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
          {options.map((option) => (
            <div key={option.id}>
              <MenuItem>
                <div
                  className="cursor-pointer  px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none flex justify-between items-center"
                  onClick={() => handleOnClick(option.nombre)}
                >
                  {option.nombre}
                  {option.selected ? (
                    <img src="/icons/check.svg" className="w-[23px]" alt="" />
                  ) : (
                    ""
                  )}
                </div>
              </MenuItem>
            </div>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
