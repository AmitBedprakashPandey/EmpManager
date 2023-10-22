export default function PunchCountBox() {
    return<>
     <div className="bg-white border-2 border-black  h-24 shadow-lg px-8 m-2 rounded-md flex justify-between items-center">
        <div className="flex flex-col items-center">
            <p className="uppercase">Total Visit</p>
            <strong>10</strong>
        </div>
        <div className="h-14 bg-slate-500 w-1"></div>
        <div className="flex flex-col items-center">
            <p className="uppercase">Month Visit</p>
            <strong>10</strong>
        </div>
     </div>
    </>
}