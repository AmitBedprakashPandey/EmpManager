import Select from "react-select";

export default function AddCustomer(params) {
  
  return (
    <div className="p-3 overflow-y-scroll max-h-[700px]">
      <div className="flex">
        <div className="flex flex-col px-3">
          <label className="text-base py-1 capitalize">Salutation</label>
          <select className="p-3 w-28">
            <option selected>Dr.</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col px-3">
        <label className="text-base py-1 capitalize">Customer Name*</label>
        <input placeholder="customer name" className="p-3 uppercase" required />
      </div>
      <div className="flex flex-col px-3">
        <label className="text-base py-1 capitalize">customer number*</label>
        <input
          type="tel"
          placeholder="Customer number"
          className="p-3 placeholder:capitalize"
          required
        />
      </div>
      <div className="flex flex-col px-3">
        <label className="text-base py-1 capitalize">Address*</label>
        <input placeholder="Address 1" className="p-3" required />
        <input placeholder="Address 2" className="p-3 " required />
        <input placeholder="Address 3" className="p-3 " required />
      </div>
      <div className="flex flex-col px-3">
        <label className="text-base py-1 capitalize">State*</label>
        <Select required />
      </div>
      <div className="flex flex-col px-3">
        <label className="text-base py-1 capitalize">City*</label>
        <Select required />
      </div>
      <div className="flex flex-col px-3">
        <label className="text-base py-1 capitalize">pincode*</label>
        <input placeholder="Address 3" className="p-3 " required />
      </div>
      <div className="flex flex-col px-3">
        <label className="text-base py-1 capitalize">Office number</label>
        <input placeholder="Address 3" className="p-3 " />
      </div>
      <div className="flex flex-col px-3">
        <label className="text-base py-1 capitalize"></label>
        <input placeholder="Address 3" className="p-3 " />
      </div>
      <div className="flex flex-col px-3">
        <label className="text-base py-1 capitalize">Phone number</label>
        <input placeholder="Address 3" className="p-3 " />
      </div>
      <div className="flex flex-col px-3">
        <label className="text-base py-1 capitalize"></label>
        <input placeholder="Address 3" className="p-3 " />
      </div>
      <div className="flex flex-col px-3">
        <label className="text-base py-1 capitalize">email</label>
        <input placeholder="Address 3" className="p-3 " />
      </div>
      <div className="flex flex-col px-3">
        <label className="text-base py-1 capitalize">map location</label>
        <input placeholder="Address 3" className="p-3 " />
      </div>
      <div className="flex flex-col px-3">
        <label className="text-base py-1 capitalize">Note</label>
        <input placeholder="Note" className="p-3 " />
      </div>
      <div className="flex justify-center px-3">
        <button className="bg-green-500 w-full my-2 p-3 text-white uppercase">
          Save
        </button>
      </div>
    </div>
  );
}
