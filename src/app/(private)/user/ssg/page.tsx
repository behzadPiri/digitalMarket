export const dynamic = 'force-static';
export default function Ssg() {
  const time = new Date().toLocaleTimeString('fa-IR', {
    timeZone: 'Asia/Tehran',
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">SSG Component</h1>
      <h2 className="text-lg font-bold">{time}</h2>
    </div>
  );
}
