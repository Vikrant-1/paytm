export function BalanceComponent({value}) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex shadow w-11/12 mt-4 rounded py-4 text-lg">
        <div className="font-bold pl-10">Your balance</div>
        <div className="font-semibold ml-3">{value}</div>
      </div>
    </div>
  );
}
