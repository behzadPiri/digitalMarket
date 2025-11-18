import { Loader2 } from 'lucide-react';

function Spinner() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <span className="font-bold text-xl">please wait ...</span>
      <Loader2 size={48} className="animate-spin text-9xl" />
    </div>
  );
}

export default Spinner;
