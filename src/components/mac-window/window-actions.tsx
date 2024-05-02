export default function WindowActions(props: any) {
  const handleMenuClick: any = props.handleMenuClick;
  return (
    <div className="flex gap-2">
      <span
        onClick={() => handleMenuClick("close")}
        className="block w-3 h-3 bg-red-500 rounded-full"
      ></span>
      <span
        onClick={() => handleMenuClick("minimize")}
        className="block w-3 h-3 bg-yellow-500 rounded-full"
      ></span>
      <span
        onClick={() => handleMenuClick("maximize")}
        className="block w-3 h-3 bg-green-500 rounded-full"
      ></span>
    </div>
  );
}
