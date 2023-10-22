import { BiBell, BiMenu } from "react-icons/bi";
export default function Navbar() {
  return (
    <>
      <div className="bg-blue-700 p-3 flex justify-between">
        <div className="flex gap-6 items-center">
          <button className="text-white text-3xl">
            <BiMenu />
          </button>
          <div className="uppercase text-white">emp manager</div>
        </div>
        <div className="text-white text-3xl">
          <BiBell />
        </div>
      </div>
    </>
  );
}
