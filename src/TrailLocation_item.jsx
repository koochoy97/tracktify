export function TrailLocation_item(props) {
  return (
    <div className="flex flex-col cursor-pointer">
      <img
        className="object-cover w-full h-64 rounded-2xl"
        src={props.img_src}
        alt=""
      />
      <p className="text-md">{props.name}</p>
      <p className="text-[12px] text-[#656E5E]">{props.location}</p>
      <p className="text-xs text-[#66964F]">{props.description}</p>
      <div className="flex gap-1 text-[12px] text-[#656E5E]">
        <p className="font-bold">Bajada</p>
        <p className="">{props.dificultad}</p>
      </div>
      <div className="flex gap-1 text-[12px] text-[#656E5E] mt-1">
        <p className="border text-[12px] rounded-sm py-[1px] px-1">Flow</p>
        <p className="border text-[12px] rounded-sm py-[1px] px-1">Curvas</p>
        <p className="border text-[12px] rounded-sm py-[1px] px-1">Saltos</p>
      </div>
    </div>
  );
}
