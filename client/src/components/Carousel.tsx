import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import "../styles/Carousel.css";

type CarouselProps = {
  activities: Activity[];
  renderActivity: (activity: Activity) => React.ReactNode;
};

function Carousel({ activities, renderActivity }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {activities.map((item, index) => (
            <div
              key={item.id}
              className={`embla__slide ${
                index === selectedIndex ? "is-active" : ""
              }`}
            >
              {renderActivity(item)}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__dots">
        {activities.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={index === selectedIndex ? "active" : ""}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
