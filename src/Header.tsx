export function Header() {
  return (
    <header className="py-4 px-20 flex justify-between w-full border-b">
      <div className="col_1 flex gap-4 items-center">
        <p className="text-lg font-bold ">Tracktify</p>
        <div className="search_container flex gap-1 bg-[#EBF2E8] py-1 px-2 rounded-md">
          <img src="/icons/search.svg" alt="" className="w-[17px]" />
          <input
            type="text"
            placeholder="Search"
            className="bg-[#EBF2E8] text-sm py-2 px-2 focus:outline-none text-[#66964F] w-33 placeholder-[#66964F]"
          />
        </div>
      </div>
    </header>
  );
}
