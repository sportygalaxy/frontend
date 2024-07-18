import Image from "next/image";
import React from "react";

const Featured = () => {
  const features = [
    {
      id: 1,
      name: "Athletic Apparel",
      image:
        "https://s3-alpha-sig.figma.com/img/f5ea/b322/a2ac50faa1e3604a0ff886baf26beaa6?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RVNgfiKK6aNBq76BuGbMJ4NQXlUdU81yE8yshLpMRIrrNL6MJhGW9j3OuMW6-8cIV85wCq4Vk3PHairBfc09KTerTJA-BIDVhWZIO-dWdN7QxAFnUHniJgegLj5w8IoEPeXAXnVoR1aR2Qybuxqov3Cx8Jx8Xi~HDzrTu6KT9aAN45eDSx3RD~SH-i8Z1E-vxQNNcjIVQKHNC8CKysFcWRhmLAqmTCLacukHHbtAa~B4neRIO5rEilU1RnPFLjEdHXlHURLBqx7ETq06sGtElDyP-XQ73odDR01zjR7xQmtbWlwlAeZ1yolWMcwBnaJgMkxlPHFIJwNNxxl4ZfnVmA__",
    },
    {
      id: 2,
      name: "Fitness Equipment",
      image:
        "https://s3-alpha-sig.figma.com/img/d53f/0a9d/0bbb92348ceac94f94ae3f2a9e21c7c8?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=diKlnWPXPXUNPYWDA5-8c7KztqSuZ-Pu-wP-SZW05dEktoBncaHYCuJdsUdiPxs1WNVoROJiwfo8zogv54dzZN~I698kIxDPVi57yGgI~OvQHadNSkXvpEFRLRbO77Q5RlIOE9vmK~S~QHTV4Cm7LUmRms5rK4DmdGXfv9UNTpFMhKwcUobQ0SDmuXPjqQ~8iJOlHNpt7o288SOBURdZLxNtQhnKcEl55wrgW11UrgjiHrBWN1iS5dQMAIxPokb4fKaMSbvQMunTB69FwIzY9w-Mc4NlIfAo7MOh1oAOiYkkaVPT66ZVYjd6FS9hvJjBARv-eQKeQLMJAloYdpiqkw__",
    },
    {
      id: 3,
      name: "Outdoor Gear",
      image:
        "https://s3-alpha-sig.figma.com/img/198a/79f5/e66ce4a311fc50a1669c30f560b14648?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BKu3lrKXcK7JKJ1noi7sFgOmcdNie5GS2L1hn5bM162z6WimpiBfhZ58X1xc4CLAwd~2C9fuGpOI6gFLljUSyDlS6gzkkDzLP05rnn1hk3hMi1qOveZdgY-8yD-S5deQIe8f7Q9FGint-9Yx8q1GXgn9IYHk4XX--7hoMFq7qLEArya3hu1LoR7Z4QifCgwHcKq0sF-90EMi~idNSqi68E66zhCbWJGM9P6tgf-3YatEBz1~0x3iH5bUDbXa5SYSSKfNv4S~0TY09HNsXSOh0~m5iwqDNr9iOySUruTWPMKror4Mlki6bAEieZ6Nfraa7SwUecSo54gztZVtwln44g__",
    },
    {
      id: 4,
      name: "Team Sport",
      image:
        "https://s3-alpha-sig.figma.com/img/698e/d13a/fe05d34c325baac147d76c4c4f324711?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EEp~gGytwWvhLG6KH6c122~Y0GnkvkNSdyHKNHmc8NWqA2bl46Rpbk-bvtyaFZ2KmgOsesGpOHgrLXeB0ar7UfY7St07JYumUjZlWcg7S7w9RnEUWaCW0MBdUbD3sB-wcdQe~5Pv9QSMWzZF9EYdH6anK-vEmGSKPBSx6cizWIBpunavKgbOLi5SfpHabT7krS~0OgdGcM5WOYZb~iKaSNEYMc7em3mAiDo79n49lJG90Kz-mHRjF-efI9nIplXB~gPcAchq6JM0H9Z8SGuuOkxHmPxm6JsjdTnQ9Z87nEOxWe~gyDKTu8QQ5rt3c2frUEPuRXDJ3Hsaei9zTt-jWg__",
    },
    {
      id: 5,
      name: "Individual Sport",
      image:
        "https://s3-alpha-sig.figma.com/img/fc12/bf66/7f90f684a28773e5c2146be0128df6f0?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AgJQ81gurrnFS7eWN-i45U1TuBvdJc~PN~j85s1z4c2UDtcCoMqkU7BxDQPOmKT4vURHrul0HVc3s7oXwqRmSrLHhl-vFwjXQoFqNgqLE0JkSXJ0ljX0RTYaZofipkM4pwtpVXSAjNFeqk1VhOoROniNhf8Rv3t4KwWyLLprp0emTZ1c~q4Kj5D962~ofT9BRUZy2bJER1PQlrx0skSGzBIw4d5Dw8I2k4aa3XVPGd-HnZAKYvJsNzXSY9kGt~qieLsjewHRTLT8EuQaPUc4YS5TzpbxJW6UCkvATyaxCx-HvYBC6Jfng6EKib~K0tUsr450BCS2AIy8ZBbsYdq2bA__",
    },
    {
      id: 6,
      name: "Accessories",
      image:
        "https://s3-alpha-sig.figma.com/img/8eef/4e85/c9e2604a580d996e05250965f57d4578?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ilsT2iX78O8YfWa~kFUS~QfftFBSHhF~5Pa1vEYzvuk9xk1HLkGvvh0uRkDbCketjjaK3J9i7r2hfN9tFw0pqVKBf4udlHH6-2kv33lhcx5vyXn1uLs77AcsuLJrAjJqdkhT~L1aRAJXNpk8S2Iqy8Vvyj~Vs9dpjA7TxvQ0iwSYZ3Tl7MaUIqPaUIHtGh6P5Ms3C6s9KbG8BfILGSkTu5RRQJPKbKJgcAAYYjZhoEsavJkasuCfPAttDF06ZlNLyTkjZwj-2MiZ-2ZZdKBBbfbRc3rGrto2qfChDg-HvSOk4fG8eBhuncLbOBaw0ysTjRSWkLQziaLkce1ukM3y8A__",
    },
  ];
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-8">
      {features.map((feat) => (
        <div
          key={feat.id}
          className="relative group h-[200px] md:h-[300px] lg:h-[450px] xl:h-[556px] flex items-center justify-center bg-grey-gradient border-light rounded-lg overflow-hidden cursor-pointer"
        >
          <Image
            fill
            sizes="100%"
            style={{
              objectFit: "cover",
              display: "block",
              margin: "0 auto",
            }}
            src={feat.image}
            alt={feat.name}
            className="w-full transition-transform duration-700 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70"></div>
          <span className="absolute bottom-8 left-8 text-primary-foreground transition-colors duration-300 group-hover:underline font-medium text-mobile-3xl md:text-3xl w-24">
            {feat.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Featured;
