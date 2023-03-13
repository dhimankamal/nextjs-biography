import { NextPage } from "next";
import Link from "next/link";

interface Props {
  crumbs: { href: string; name: string }[];
}

const Breadcrumb: NextPage<Props> = ({ crumbs }) => {
  return (
    <div className="text-center">
      <div className="p-8 lg:p-20 bg-white rounded-2xl shadow-xl dark:bg-neutral-800">
        <h1
          className="text-2xl lg:text-5xl font-bold text-center mb-4"
          dangerouslySetInnerHTML={{ __html: crumbs.at(-1)?.name || "" }}
        ></h1>
        <div className="flex text-sm md:text-base flex-col gap-2 lg:flex-row justify-center items-center text-center">
          {crumbs.map((val, idx) => {
            return (
              <Link
                key={val.href + idx}
                className="group opacity-50 last:opacity-70 last:font-semibold"
                href={val.href}
              >
                <span
                  dangerouslySetInnerHTML={{ __html: val.name || "" }}
                ></span>{" "}
                <span className="group-last:hidden">/</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
