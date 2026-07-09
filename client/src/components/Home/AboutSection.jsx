import React from "react";

export default function AboutSection() {
  return (
    <section className="h-[calc(100vh-88px)] w-full py-20 flex flex-col justify-center items-center gap-20">
      <h2 className="text-4xl">Somos Blume</h2>
      <div className="px-20 flex justify-center items-center gap-20">
        <img src="/Home/about.jpg" className="h-100 " />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quasi
          officiis vitae perferendis id cupiditate consequatur minima
          voluptatibus accusamus, quia eum commodi iste excepturi laboriosam
          dolore voluptate pariatur quibusdam eveniet.
        </p>
      </div>
    </section>
  );
}
