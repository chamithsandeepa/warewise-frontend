import React from "react";
import Title from "../Components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../Components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="-full md:max-w-[450px]" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-800">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consectetur provident inventore cumque possimus blanditiis
            perferendis corrupti debitis doloribus voluptas. Magnam vitae iure
            maiores rerum ab ratione inventore repellat et sapiente.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            sed magnam nihil dolores commodi alias assumenda, expedita placeat
            quo est totam. Sapiente ipsam repudiandae consectetur, consequuntur
            ut possimus nostrum error?
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
            iure assumenda quod non blanditiis tempore! Pariatur, eveniet
            dolores perferendis quibusdam molestias officiis! Ullam, recusandae
            ipsam? Necessitatibus, magnam quo? Commodi, harum?
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
            explicabo eius quas nam consectetur, magnam inventore molestiae est
            aspernatur quia laboriosam neque, fuga incidunt. Accusantium illo
            fugiat ratione porro facilis?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
            explicabo eius quas nam consectetur, magnam inventore molestiae est
            aspernatur quia laboriosam neque, fuga incidunt. Accusantium illo
            fugiat ratione porro facilis?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
            explicabo eius quas nam consectetur, magnam inventore molestiae est
            aspernatur quia laboriosam neque, fuga incidunt. Accusantium illo
            fugiat ratione porro facilis?
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
