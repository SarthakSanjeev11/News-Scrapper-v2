import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="fixed w-full bg-gray-100 shadow-md z-50  ">
        <div className="flex lg:justify-start justify-center items-center py-1 w-[90%] mx-auto   m-2">
          <Link href={"/"}>
            <Image
              src="/assets/TGN.png"
              width={208}
              height={50}
              alt="logo"
              className="object-cover cursor-pointer  "
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
