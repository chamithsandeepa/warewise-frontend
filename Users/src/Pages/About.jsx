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
        <img className="-full md:max-w-[450px]" src={assets.about} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-800">
          <p>
            WareWise was born from a passion for style and a commitment to
            quality. Since our founding, we have been dedicated to curating
            exceptional fashion pieces that blend contemporary trends with
            timeless elegance. Our journey began with a simple vision: to make
            premium fashion accessible to everyone.
          </p>
          <p>
            We believe that great style should never come at the expense of
            quality or affordability. That's why we work directly with trusted
            manufacturers and designers to bring you carefully selected pieces
            that meet our high standards. Every item in our collection is chosen
            with our customers' diverse needs and preferences in mind.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to empower individuals to express their unique style
            through high-quality, affordable fashion. We strive to create an
            inclusive shopping experience where everyone can find pieces that
            make them feel confident and authentic, while building lasting
            relationships with our customers through exceptional service and
            value.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20 bg-orange-50">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We maintain strict quality standards throughout our entire supply
            chain. Each product undergoes thorough inspection to ensure it meets
            our high expectations for materials, craftsmanship, and durability.
            Our quality assurance team works tirelessly to guarantee that every
            purchase exceeds your expectations.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Shopping with us is designed to be effortless and enjoyable. From
            our user-friendly website and secure checkout process to fast
            shipping and easy returns, we've streamlined every aspect of your
            shopping experience. Browse, shop, and receive your favorites with
            complete peace of mind.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our dedicated customer service team is here to assist you every step
            of the way. Whether you need styling advice, sizing help, or order
            support, we're committed to providing personalized, friendly service
            that makes your shopping experience exceptional. Your satisfaction
            is our top priority.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
