import Add from "@/common/Add";
import CardGrid from "@/common/CardGrid";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { FC } from "react";

interface Props {}
const Products: FC<Props> = (props) => {
  const { ...rest } = props;

  const products = [
    {
      id: 1,
      title: "T5x treadmil",
      description: "Yiaoxing",
      price: "$19.99",
      image:
        "https://s3-alpha-sig.figma.com/img/1411/1bb6/d12aeb70c9faaba26ac6b4882ca33ea6?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S0rpPYeUNBQN386Nm~HEiyGdn63GtSwKoM26AW~ZQY9dllND3ZerB8JzGtnD4F9ZrBr6FwNJsx74grR4Z5M80KmcyccbT60TU8nnnA4pLSVYBoLcXCrEHoFs6gDc7x380OzA70Xhxjou9lY9PvimocToi5QVmbk60Ua~1o1FPbifbqKtIwY7T82LBtDLzHx36ZBWHj6caoOOxDMqdAvjPD09rOY8N75FH3xY~WSlaJLJO8ZrYk-LbCohKEEjAcEU5jrUtmncnd9aaX4SaWAPo2094Yy56ZKxeq2PSd3UukTFl0qSSEYfja4ruCRSbv3Tdy6nGFZJ709zDiphIlyU~Q__",
    },
    {
      id: 2,
      title: "T5x treadmil",
      description: "Yiaoxing",
      price: "$19.99",
      image:
        "https://s3-alpha-sig.figma.com/img/ab95/b669/3c92d174a025346acab4eb09f4a0505c?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pQZzfnAm7zWFSJN~WvYAnh-vJ4ppXbdkEgz1bv1uE8pOtPckj9~u6c1dqAkWKZ~iujTjWo7tYVSNp4DKUeAvY1Paz5i~LqM5xLW2kERgQtUy5NJFl8JSOLqzFcI-nb9AN41YNKeIu53STEVDvO~O1sc-UkEyMEr-ho9pNyjhpOFLOe6UrJwtfEVIkRP4JiQ8iwTG5iDDmyx82w4mJPWATaML-c88dRjlH2BLDDU-0zn6EoK5dicL~gRtKZOg~qxU8xlUtLsKThILfDXptiZe1~4M81lBJZ6U7ANrZBijOEBEO6xtfT9IH3i4Wilpo5yqk638xO44ACLIHZu4r7xxBg__",
    },
    {
      id: 3,
      title: "T5x treadmil",
      description: "Yiaoxing",
      price: "$19.99",
      image:
        "https://s3-alpha-sig.figma.com/img/3ab9/7768/661e9054d5caab118d9c74063423a7dd?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Gr0NIVD6rIyPo6uoT9dpmGfTlviHNuiwcpeUiVL4I0syQMCTPtJNIGXPyaxv23lzSI0dZLGPE9VDT~gGqX0PeuFoEHsdoZCxYJR05CILPypUVhU5rJKzSua9UhUy160Iib0F8gJDw1VnigFP1AdkgjR8g--3ma1mBoEB90qD2mYWB9jOTKeTmLnPA2zu7u6OtJdt2Li1yeGbgFPBEoUFhA2DTyfhXZAtR0qv2mNZWXw6egjySJ6bu3kcBVwqpJRslbNZLFBk4rn55wn0~8qETUoj5drEYrMlMxTFwuVinRR87AHIWGIyET43c4V5IvuKM78mtgCvGWDbIv5WgZ3~Uw__",
    },
    {
      id: 4,
      title: "T5x treadmil",
      description: "Yiaoxing",
      price: "$19.99",
      image:
        "https://s3-alpha-sig.figma.com/img/1c42/64ad/734842f44ebed4bad74eb15e58370e16?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KZhwuUyCGa1iAyZiUhgWChXTIjbQeQ4vsz1q3AhrsbUDgtPqI2SPK5FVEAXYcaUKw-bEkpDMsDKC6IhRk0zMMsy~obnPMaxfXkWNHAhQeB-GqUmJ3cBUkObLqQ5gdo2F17XyBrZK6WU2UL7C9Y7-2tEIjok4ngSh0gA-DrUf9xUJDWdH~1dLzz2a5BTFomtQ9~DVzyKdzS~~95Fns38v-eo0mcZ0E805GsLsffMe4nY1eiAuf76t593YUt0LsDSoZh3tp6PZ8ogSbbMToFkGQmp8ILiH98enpEbXo0zJNtSWtuSAikU-5605hEcva9P6CD2FltCwBQm8JiZ3eRnRvg__",
    },
    {
      id: 5,
      title: "T5x treadmil",
      description: "Yiaoxing",
      price: "$29.99",
      image: "https://via.placeholder.com/350",
    },
    {
      id: 6,
      title: "T5x treadmil",
      description: "Yiaoxing",
      price: "$29.99",
      image: "https://via.placeholder.com/350",
    },
    {
      id: 7,
      title: "T5x treadmil",
      description: "Yiaoxing",
      price: "$29.99",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      title: "T5x treadmil",
      description: "Yiaoxing",
      price: "$29.99",
      image: "https://via.placeholder.com/150",
    },
    // Add more products as needed
  ];

  return (
    <CardGrid oneLineScroll>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </CardGrid>
  );
};

export default Products;

const ProductCard = ({ product }: any) => {
  return (
    <Card
      className={`h-[360px] sm:h-[510px] w-full max-w-[244px] sm:max-w-[344px] bg-white px-2 sm:px-6 py-2 sm:py-12 border-none rounded-none shadow-none cursor-pointer group`}
    >
      <CardHeader className="relative w-full h-[65%] bg-[#f5f5f7] overflow-hidden">
        <Image
          fill
          sizes="100%"
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
            display: "block",
            margin: "0 auto",
          }}
          src={product.image}
          alt={product.title}
          className="w-full transition-[transform] duration-1000 hover:scale-110"
          priority
          // blurDataURL="data:..."
          // placeholder="blur"
        />
      </CardHeader>
      <CardContent className="text-left mt-8 p-0">
        <p className="font-medium group-hover:font-bold text-mobile-3xl sm:text-3xl duration-1000 hover:font-semibold">
          {product.title}
        </p>

        <div className="flex items-end justify-between mt-3">
          <div>
            <p className="font-light text-mobile-2xl sm:text-2xl text-primary opacity-50">
              {product.description}
            </p>
            <p className="mt-2 font-medium text-mobile-3xl sm:text-3xl">
              {product.price}
            </p>
          </div>

          <div className="mb-1">
            <Add />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
