export const dynamic = 'force-dynamic';

function Ssr() {
  const time = new Date().toLocaleTimeString('fa-IR', {
    timeZone: 'Asia/Tehran',
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">SSR Component</h1>
      <h2 className="text-lg font-bold">{time}</h2>
    </div>
  );
}

export default Ssr;
