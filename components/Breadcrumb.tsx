import { NextPage } from "next";
import Link from "next/link";

interface Props {
  crumbs: { href: string; name: string }[];
}

const Breadcrumb: NextPage<Props> = ({ crumbs }) => {
  return (
    <div className="text-center">
      <div className="p-8 lg:p-20 bg-white rounded-2xl dark:bg-neutral-800">
        <h1
          className="text-2xl lg:text-5xl font-bold text-center mb-4"
          dangerouslySetInnerHTML={{ __html: crumbs.at(-1)?.name || "" }}
        ></h1>
        <ol
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          className="flex text-sm md:text-base flex-col gap-2 lg:flex-row justify-center items-center text-center"
        >
          {crumbs.map((val, idx) => {
            return (
              <li
                key={val.href + idx}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="group opacity-50 last:opacity-70 last:font-semibold"
              >
                <Link href={val.href} itemProp="item">
                  <span
                    itemProp="name"
                    dangerouslySetInnerHTML={{ __html: val.name || "" }}
                  ></span>
                  <meta itemProp="position" content={String(idx + 1)} />
                  <span className="group-last:hidden">/</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Breadcrumb;
