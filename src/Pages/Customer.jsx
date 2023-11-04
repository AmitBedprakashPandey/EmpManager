import { useState } from "react";
import { BiFilter, BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

const FilterCostomer = ({ close }) => {
  return <>'Filter Customer'</>;
};

export default function Customer(params) {
  const [filterOpen, setFilterOpen] = useState(true);
  return (
    <>
      <div className="bg-blue-500 p-3">
        <button className="flex text-white items-center gap-2 text-2xl">
          <BiFilter /> Filter
        </button>
      </div>
      {filterOpen && <FilterCostomer />}

      <Link className="bg-blue-500 w-20 h-20 rounded-full flex justify-center items-center absolute bottom-10 right-10">
        <BiPlus className="text-5xl text-white " />
      </Link>
    </>
  );
}
