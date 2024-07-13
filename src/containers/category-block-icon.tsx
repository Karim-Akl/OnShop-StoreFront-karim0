import { useEffect, useState } from 'react';
import Alert from '@components/ui/alert';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import SectionHeader from '@components/common/section-header';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import { Category } from '@framework/types';
import { ROUTES } from '@utils/routes';
import CardIconLoader from '@components/ui/loaders/card-icon-loader';
import cn from 'classnames';
import IconCard from '@components/common/icon-card'; // Ensure this import is correct

// Define or import breakpoints here if needed
const breakpointsCircle = { /* Define your breakpoints here */ };
const breakpointsList = { /* Define your breakpoints here */ };
const breakpoints = { /* Define your breakpoints here */ };

interface CategoriesProps {
  sectionHeading: string;
  className?: string;
  variant?: 'default' | 'modern' | 'circle' | 'list';
}

const CategoryBlockIcon: React.FC<CategoriesProps> = ({
  className = 'mb-12 md:mb-14 xl:mb-16',
  sectionHeading,
  variant = 'default',
}) => {
  const { data, isLoading, error } = useCategoriesQuery({
    limit: 10,
  });

  // State to track network error
  const [networkError, setNetworkError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setNetworkError(error?.message || 'Unknown error occurred.');
    }
  }, [error]);

  if (networkError) {
    return <Alert message={networkError} />;
  }

  return (
    <div className={cn(className)}>
      <SectionHeader sectionHeading={sectionHeading} />
      <Carousel
        autoplay={{
          delay: 4000,
        }}
        breakpoints={
          variant === 'circle'
            ? breakpointsCircle
            : variant === 'list'
            ? breakpointsList
            : breakpoints
        }
        buttonGroupClassName={variant === 'circle' ? '-mt-4' : '-mt-2'}
      >
        {isLoading && !data
          ? Array.from({ length: 10 }).map((_, idx) => (
              <SwiperSlide key={`card-rounded-${idx}`}>
                {variant === 'circle' ? (
                  <CardIconLoader uniqueKey={`card-circle-${idx}`} />
                ) : (
                  <CardIconLoader uniqueKey={`card-rounded-${idx}`} />
                )}
              </SwiperSlide>
            ))
          : data?.categories?.data?.map((category: Category) => (
              <SwiperSlide key={`category--icon-key-${category.id}`}>
                <IconCard
                  item={category}
                  href={`${ROUTES.CATEGORY}/${category.slug}`}
                  effectActive={true}
                  variant={variant}
                />
              </SwiperSlide>
            ))}
      </Carousel>
    </div>
  );
};

export default CategoryBlockIcon;
