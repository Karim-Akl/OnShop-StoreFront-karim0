import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Divider from "@components/ui/divider";
import axios from "axios";
import BannerWithProducts from "@containers/banner-with-products";
import BannerGridBlock from "@containers/banner-grid-block";
import BannerBlockAncient from "@containers/banner-block-ancient";
import CategoryBanner from "@containers/category-banner";
import CategoryBlock from "@containers/category-block";
import CategoryGridBlock from "@containers/category-grid-block";
import ProductsFlashSaleCarousel from "@containers/products-with-flash-sale";
import ProductsBlockCarousel from "@containers/products-block-carousel";
import CategoryBlockIcon from "@containers/category-block-icon";
import { GetStaticProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type PreviewData = {
  sectionName: string;
  content: string;
};

const defaultPreviewData: PreviewData[] = [
  {
    sectionName: "products",
    content: "products1",
  },
  {
    sectionName: "banner",
    content: "banner1",
  },
  {
    sectionName: "category",
    content: "category3",
  },
];

export default function Home({ previewData }: { previewData: PreviewData[] }) {
  const renderSection = (section: PreviewData) => {
    switch (section.sectionName) {
      case "banner":
        switch (section.content) {
          case "banner1":
            return <BannerWithProducts key={section.content} sectionHeading="Banner 1" />;
          case "banner2":
            return <BannerGridBlock key={section.content} />;
          case "banner3":
            return <BannerBlockAncient key={section.content} />;
          default:
            return null;
        }
      
      case "category":
        switch (section.content) {
          case "category1":
            return <CategoryBanner key={section.content} data={undefined} error={undefined} isLoading={undefined} />;
          case "category2":
            return <CategoryBlockIcon key={section.content} sectionHeading="Category 2" />;
          case "category3":
            return <CategoryBlock key={section.content} sectionHeading="Category 3" />;
          case "category4":
            return <CategoryGridBlock key={section.content} sectionHeading="Category 4" />;
          default:
            return null;
        }

      case "products":
        switch (section.content) {
          case "products1":
            return <ProductsFlashSaleCarousel key={section.content} />;
          case "products2":
            return <ProductsBlockCarousel key={section.content} sectionHeading="Products 2" loading={true} />;
          default:
            return null;
        }

      default:
        return null;
    }
  };

  return (
    <>
      <Container>
        {previewData.map((section, index) => (
          <div key={index}>{renderSection(section)}</div>
        ))}
      </Container>
      <Divider className="mb-0" />
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let previewData: PreviewData[] = defaultPreviewData;

  try {
    const response = await axios.get('http://localhost:5001/preview');
    previewData = response.data;
  } catch (error) {
    console.error('Error fetching preview data:', error);
  }

  return {
    props: {
      previewData,
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};






// import Container from "@components/ui/container";
// import Layout from "@components/layout/layout";
// import Divider from "@components/ui/divider";
// import BannerWithProducts from "@containers/banner-with-products";
// import BannerGridBlock from "@containers/banner-grid-block";
// import BannerBlockAncient from "@containers/banner-block-ancient";
// import CategoryBanner from "@containers/category-banner";
// import CategoryBlock from "@containers/category-block";
// import CategoryGridBlock from "@containers/category-grid-block";
// import ProductsFlashSaleCarousel from "@containers/products-with-flash-sale";
// import ProductsBlockCarousel from "@containers/products-block-carousel";
// import CategoryBlockIcon from "@containers/category-block-icon";


// type PreviewData = {
//   sectionName: string;
//   content: string;
// };

// const previewData: PreviewData[] = [
//   {
//     sectionName: "products",
//     content: "products1",
//   },
//   {
//     sectionName: "banner",
//     content: "banner2",
//   },
//   {
//     sectionName: "category",
//     content: "category3",
//   },
// ];

// export default function Home() {
//   const renderSection = (section: PreviewData) => {
//     switch (section.sectionName) {
//       case "banner":
//         switch (section.content) {
//           case "banner1":
//             return <BannerWithProducts key={section.content} sectionHeading="Banner 1" />;
//           case "banner2":
//             return <BannerGridBlock key={section.content} />;
//           case "banner3":
//             return <BannerBlockAncient key={section.content} />;
//           default:
//             return null;
//         }
      
//       case "category":
//         switch (section.content) {
//           case "category1":
//             return <CategoryBanner key={section.content} data={undefined} error={undefined} isLoading={undefined} />;
//           case "category2":
//             return <CategoryBlockIcon key={section.content} sectionHeading="Category 2" />;
//           case "category3":
//             return <CategoryBlock key={section.content} sectionHeading="Category 3" />;
//           case "category4":
//             return <CategoryGridBlock key={section.content} sectionHeading="Category 4" />;
//           default:
//             return null;
//         }

//       case "products":
//         switch (section.content) {
//           case "products1":
//             return <ProductsFlashSaleCarousel key={section.content} />;
//           case "products2":
//             return <ProductsBlockCarousel key={section.content} sectionHeading="Products 2" loading={true} />;
//           default:
//             return null;
//         }

//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <Container>
//         {previewData.map((section, index) => (
//           <div key={index}>{renderSection(section)}</div>
//         ))}
//       </Container>
//       <Divider className="mb-0" />
//     </>
//   );
// }

// Home.Layout = Layout;


