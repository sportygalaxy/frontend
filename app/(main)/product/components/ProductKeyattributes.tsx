import { DesktopTitle } from "@/common/Title";
import { getKeyValue } from "@/utils/objectUtils";
import { FC } from "react";

interface ProductKeyattributesProps {
  keyattributes: any;
}
const ProductKeyattributes: FC<ProductKeyattributesProps> = ({
  keyattributes,
}) => {
  const keyattributesCount = (keyattributes?.length || 0) >= 1;

  return (
    <section className="space-y-4">
      <DesktopTitle general noLine title="Key attributes" />
      <div className="overflow-x-auto">
        {keyattributesCount ? (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <tbody>
              {keyattributes?.map((attribute: any, index: number) => (
                <tr key={index} className="grid grid-cols-6">
                  <td className="bg-[#F0F0F0] border border-dark p-5 font-normal text-mobile-2xl md:text-2xl font-jost col-span-2">
                    {getKeyValue(attribute)?.key}
                  </td>
                  <td className="border border-dark p-5 font-normal text-mobile-xl md:text-lg font-jost col-span-4">
                    {getKeyValue(attribute)?.value}
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

export default ProductKeyattributes;
