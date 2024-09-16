import { DesktopTitle } from "@/common/Title";
import { FC } from "react";

interface ProductSpecificationsProps {
  specifications: any;
}
const ProductSpecifications: FC<ProductSpecificationsProps> = ({
  specifications,
}) => {
  const specificationsCount = (specifications?.length || 0) >= 1;
  return (
    <section className="space-y-4">
      <DesktopTitle general noLine title="Specifications" />
      <div className="overflow-x-auto">
        {specificationsCount ? (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <tbody>
              {specifications?.map((specification: any, index: number) => (
                <tr key={index} className="grid grid-cols-6">
                  <td className="bg-[#F0F0F0] border border-dark p-5 font-normal text-mobile-2xl md:text-2xl font-jost col-span-2">
                    {specification.key}
                  </td>
                  <td className="border border-dark p-5 font-normal text-mobile-xl md:text-lg font-jost col-span-4">
                    {specification.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No record found.</p>
        )}
      </div>
    </section>
  );
};

export default ProductSpecifications;
