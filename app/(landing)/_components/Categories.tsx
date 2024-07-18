import Image from "next/image";
import React from "react";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "list product",
      date: "2024, 15 Sept",
      image:
        "https://s3-alpha-sig.figma.com/img/4926/9bf5/d7f4cd6333e6e5cf0733c3db0b17edb5?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eFlwpk3pTfrg4i58df3nKb5d9~YRLVcFVVcTwVxfNlEwWOb43LFJXwBpQJV0YUzUZG8BZAgHnJ0YFDLGh6sgST6qRyOHYfVU3v5UJFHVNjjLzXGg1F6Dba2JDO98qkwLNSoxLMFS6LSYpKpfQi94Bm5reMgUXtvjGSijualL52-mwYdJaBfkKfdLpp1I5kWp3IWUUXeRSSUX6vfoqJrVrf42A2tEPYYd4CQkHWjRjt6cfuX31J9peTni8DnVIAqyKSabZiV~PbcDTGyScssTDwiXMcPqhtUTVcb8Y55YfEH-Qp6xsTO4-hTfmxjzukuhM7m7mOaDLJvY8YD3~g7~jg__",
    },
    {
      id: 2,
      name: "list product",
      date: "2024, 15 Sept",
      image:
        "https://s3-alpha-sig.figma.com/img/a1cc/5947/1829c973a9d9aba1db13fa4c498c5aa7?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PhIgNCbf-vmnmJK42Zn9AlfMUURJ5qoK5DDjmUshvTsoxh7XdV~M-HO2ZJse-4zdG85ho0eDLcFDziz7CEMgPd-yzj-6Z5-3-QK-OzI4oC5lIgTWiGFYQVWnIfNMp-qBoJ1Wf5joQRzj5YgcdbwnJEhA2aSaTrEPlrcq~-AFA~rNY-vHwPS~hgKubeLYKrrvc7eFBYUSXYACJ5LiT8xKjeZ-C~8IG4HemUvp21rZ4tTe7-r83sHUMDdjFQoxONu6844CjHecDGvIxJD56nfHLfDDNgeQEhSFGlbxFmitBJt04oLgOFU~o-UGbkBIp8JwgO9LQa7B6fhmBwxOPlnFWw__",
    },
    {
      id: 3,
      name: "list product",
      date: "2024, 15 Sept",
      image:
        "https://s3-alpha-sig.figma.com/img/4a4d/5846/61965ccb68b2aad29e20c9dcf08dcd56?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AaSIVk2VJNY4Yt92F0mQCmzLBAT8M3Hr3AEHdHGL~VWvwOMNTZqEAMu3Qh6dgaPTJVPB29WlkUyYCPV7ShlbJsvLY6N-IRmDDftWlySFgtziwCLexOn-lwoKp-cSr7C-EJ7ChbPsE12yTyoWRvMzJiRZiGbsDHFMEhl~t-Y9tJVAgdN2YWqbCSZdeMCC4yP7V4kevegElW1sGBF~h~CA1j9aYDcjDFZulqmy1InBzvmu3zrCb4VO~jBJkSGoiYHRzr6FHJsgDjF2UHotAL~w0e41KRO3mnTZEKpovbkdpZzpzxXwr1mY26-naddJXbMkLYS4at1Mia0WWSuM85~HuQ__",
    },
    {
      id: 4,
      name: "list product",
      date: "2024, 15 Sept",
      image:
        "https://s3-alpha-sig.figma.com/img/3fe7/3dd5/88b87b6712fcbc26d02f547dcbf73f06?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SqNd8396klrqwVLLOxiyr3ZVAbAizRICOG1dlcUtsi09~EFL6h0VU-8hsr7A21g8x2r6CL4IpL7xOnTZG05ChbFcT4HgdWUUef3hpvoEiaNqzoDRvGSS8Y7FSASwJLDHVZACcCVmyM45BRxMNuoSVZGuZfz6RUaLv06rMZDaMNCC0EwsoCA2KFrg88U~WC5sD3UHECuPiDQRpLRTlyQw1X6Rk2s0Tc9NacZfmVZVoWp1wuVAqmzLwb7s-M-eNKRhj1lZ2EOrgSG9pm64OQj1fGAx5380-GcWQZqgGyzwzuFY0dHuTXtDWVJ18Z0k3gnclBJsAhpnV9NwZpfnXMliKA__",
    },
    {
      id: 5,
      name: "list product",
      date: "2024, 15 Sept",
      image:
        "https://s3-alpha-sig.figma.com/img/b61b/ca93/780939f29b9031fec78a21a8e5a8bafc?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gFUPh1IoGqFlOzl6oSho-E2plhQQYk6UArs-oHe9SNKArbwELQw3WwVltnPPHb-m0Jgkzz4hWNEVI1cxNCpGTrsyT0tVNOH3TgSIEFFZUL2~ocGDdgLmga8CvWbW48K-KUvxhQGnMQ8qc6ZqEy1nPgD~zHjY~0P-hUHJNtnX922tyRUFS8UWEis-wSpFPar5OWWt2EFUwESFajWMJPoICnpbcJM-lgFC1Rk2wCXLeBIh8D7OSIXQLQR-wQY4rZEtHra72MGnHDUOTCDJ5EfZbnraHXuUobdfU5ujPMIbzmYmGa7PjWUZ4AYUzzI-7iPMkGxUGp7vlCIiA2WP~NWVlw__",
    },
    {
      id: 6,
      name: "list product",
      date: "2024, 15 Sept",
      image:
        "https://s3-alpha-sig.figma.com/img/4954/83e1/27e7896979a43630b9e3233de6078c20?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lBG66Fpbszq-Hyu4QdjCmU-t4rskQ1CB13cH3CyatmyTDhM3Sxkdg2B7cnccgmnQMckAUmzhaBgszawJibaU4YYkD0tLGBv1-OFV0xJP46ezV~zZQJMwOndNR7bDx5efHoCW1XsjMg~jbfZNhybhBJtI8KRUQoPF5XSnU25zYTLIodv-JjiM9QwX414jLnDmuKglYOYSQOIFL0N-BOqNOzVgFUXIIHZt1z0vSQwkVKoWOifAEZrK2q4ztKmVcr3lBXt0nT7LCUYu43~m9~htcoEkVewHsKHp1j4pe8WOMeo5-w~i1-zR1ycXm1edidM9Nh2fXwikKVRXTuZ~pu75wA__",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-end gap-1 w-full">
        <h1 className="min-w-[190px] text-mobile-3xl md:text-4xl font-bold tracking-widest">
          LIST PRODUCT.
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full">
        {categories.map((cart) => (
          <div
            key={cart.id}
            className="h-[100px] xl:h-[150px] flex items-center border border-gray"
          >
            <div className="relative w-[40%] h-[100%]">
              <Image
                fill
                sizes="100%"
                style={{
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto",
                }}
                src={cart.image}
                alt=""
                className="w-full transition-transform duration-700 group-hover:scale-110"
                priority
              />
            </div>
            <div className="bg-secondary-foreground w-[60%] h-full">
              <div className="flex flex-col gap-2 w-full h-full items-start justify-center pl-4 xl:pl-8">
                <p className="text-mobile-2xl xl:text-xl 2xl:text-2xl font-medium tracking-wide xl:tracking-widest uppercase">
                  {cart.name}
                </p>
                <p className="text-mobile-2xl 2xl:text-2xl font-medium text-secondary">
                  {cart.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
