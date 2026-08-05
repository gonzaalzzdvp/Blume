import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function GridAnimation() {
  const gridRef = useRef(null);

  const imagePool = [
    "/GsapImages/1.png",
    "/GsapImages/2.png",
    "/GsapImages/3.png",
    "/GsapImages/4.png",
    "/GsapImages/5.png",
    "/GsapImages/6.png",
    "/GsapImages/7.png",
    "/GsapImages/8.png",
    "/GsapImages/9.png",
    "/GsapImages/10.png",
    "/GsapImages/11.png",
    "/GsapImages/12.png",
    "/GsapImages/13.png",
    "/GsapImages/14.png",
    "/GsapImages/15.png",
    "/GsapImages/16.png",
  ];

  const [images, setImages] = useState(imagePool);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".grid-item");

      // Animación inicial
      gsap.fromTo(
        items,
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: {
            each: 0.08,
            from: "random",
          },
          ease: "back.out(1.7)",
          onComplete: animateSwap,
        },
      );

      let timeout;

      function animateSwap() {
        const total = imagePool.length;

        let first = Math.floor(Math.random() * total);
        let second;

        do {
          second = Math.floor(Math.random() * total);
        } while (second === first);

        const firstItem = items[first];
        const secondItem = items[second];

        gsap
          .timeline({
            onComplete: () => {
              timeout = gsap.delayedCall(
                gsap.utils.random(1.5, 2.5),
                animateSwap,
              );
            },
          })
          // Ambos se encogen
          .to(
            [firstItem, secondItem],
            {
              scale: 0.7,
              duration: 0.25,
              ease: "power2.in",
            },
            0,
          )

          // Intercambio
          .add(() => {
            setImages((prev) => {
              const next = [...prev];

              [next[first], next[second]] = [next[second], next[first]];

              return next;
            });
          })

          // Ambos vuelven a crecer
          .to(
            [firstItem, secondItem],
            {
              scale: 1,
              duration: 0.45,
              ease: "back.out(2)",
            },
            ">",
          );
      }

      return () => {
        if (timeout) timeout.kill();
      };
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={gridRef} className="grid w-100 grid-cols-4 gap-3">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          draggable={false}
          className="grid-item h-25 w-15 rounded-2xl object-cover select-none"
        />
      ))}
    </div>
  );
}
