import React from "react";
import Carousel from "react-native-snap-carousel";

interface CarouselNotificationProps {
  data: any[];
  renderItem: (item: any) => React.ReactNode;
  ref: any;
  onSnapToItem: (index: number) => void;
  itemHeight: number;
  sliderWidth: number;
  itemWidth: number;
}

const CarouselNotification = React.forwardRef<
  Carousel<any[]>,
  CarouselNotificationProps
>((props, ref) => {
  let carousel: any = null;
  return (
    <Carousel
      ref={ref}
      data={props.data}
      renderItem={props.renderItem}
      sliderWidth={props.sliderWidth}
      itemWidth={props.itemWidth}
      layout={"default"}
      activeSlideAlignment={"start"}
      firstItem={0}
      hasParallaxImages={true}
      onSnapToItem={props.onSnapToItem}
    />
  );
});

export default CarouselNotification;
