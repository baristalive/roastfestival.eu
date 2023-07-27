import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid h-screen w-screen grid-cols-1 grid-rows-[minmax(0,_2fr)_minmax(0,_3fr)] place-content-stretch items-center text-center md:grid-cols-[minmax(0,_2fr)_minmax(0,_3fr)] md:grid-rows-1">
      <div className="inverted flex h-full flex-col justify-end p-10 md:justify-center">
        <h1 className="text-8xl md:text-right">404</h1>
      </div>
      <div className="flex h-full flex-col justify-start md:justify-center md:text-left">
        <h2 className="p-10 align-bottom text-2xl">
          Tato stránka neexistuje. Zkuste se vrátit na{" "}
          <Link
            href="/"
            className="p-2 underline decoration-2 underline-offset-2"
          >
            začátek.
          </Link>
        </h2>
      </div>
    </div>
  );
}
