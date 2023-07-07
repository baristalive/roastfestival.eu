import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen h-screen grid text-center grid-cols-1 grid-rows-[minmax(0,_2fr)_minmax(0,_3fr)] md:grid-rows-1 md:grid-cols-[minmax(0,_2fr)_minmax(0,_3fr)] place-content-stretch items-center">
      <div className="inverted h-full p-10 flex flex-col md:justify-center justify-end">
        <h1 className="text-8xl md:text-right">404</h1>
      </div>
      <div className="md:text-left h-full flex flex-col md:justify-center justify-start">
        <h2 className="text-2xl p-10 align-bottom">
          Tato stránka neexistuje. Zkuste se vrátit na{" "}
          <Link
            href="/"
            className="p-2 underline underline-offset-2 decoration-2"
          >
            začátek.
          </Link>
        </h2>
      </div>
    </div>
  );
  }
