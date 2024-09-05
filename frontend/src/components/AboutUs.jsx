import { Typography, Button } from "@material-tailwind/react";
import shop from "../assets/shop.png";

function AboutUs() {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-white p-10 rounded-lg shadow-2xl">
          <div className="text-center">
            <Typography variant="h2" className="text-4xl font-bold text-gray-800 mb-6">
              About Us
            </Typography>
            <Typography variant="paragraph" className="text-lg text-gray-600 mb-8">
              Welcome to Kumawat Electronics! We are a team of passionate individuals dedicated to bringing you the best in electronics and technology. 
              Our mission is to provide high-quality products and exceptional customer service.
            </Typography>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <img 
                src={shop} 
                alt="Our Team" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <Typography variant="h4" className="text-2xl font-bold text-gray-800 mb-4">
                Our Mission
              </Typography>
              <Typography variant="paragraph" className="text-lg text-gray-600 mb-4">
                Our mission is to make technology accessible to everyone. We strive to offer the latest innovations 
                at affordable prices while maintaining the highest standards of quality.
              </Typography>
              <Button color="blue" className="w-40 mt-4 p-2">
                Learn More
              </Button>
            </div>
          </div>

          <div className="mb-16">
            <Typography variant="h4" className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Our History
            </Typography>
            <Typography variant="paragraph" className="text-lg text-gray-600 mb-4">
              Kumawat Electronics was founded in 1995 with a vision to revolutionize the electronics market in India. 
              Starting as a small retail store in Jaipur, we quickly grew into one of the most trusted names in the industry. 
              Over the years, we have expanded our product range and entered the online market, 
              making high-quality electronics accessible to customers across the nation.
            </Typography>
            <Typography variant="paragraph" className="text-lg text-gray-600 mb-4">
              Our commitment to innovation and customer satisfaction has been the driving force behind our success. 
              From the early days of offering the latest gadgets to our local community, we have stayed true to our 
              values of quality, integrity, and customer-first approach. Today, Kumawat Electronics is synonymous 
              with trust, reliability, and cutting-edge technology.
            </Typography>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <Typography variant="h5" className="text-xl font-bold text-gray-800 mb-4">
                Our Values
              </Typography>
              <Typography variant="paragraph" className="text-lg text-gray-600">
                Integrity, Innovation, and Customer Commitment are at the core of everything we do.
              </Typography>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <Typography variant="h5" className="text-xl font-bold text-gray-800 mb-4">
                Our Vision
              </Typography>
              <Typography variant="paragraph" className="text-lg text-gray-600">
                To be the most trusted and innovative electronics retailer globally.
              </Typography>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <Typography variant="h5" className="text-xl font-bold text-gray-800 mb-4">
                Our Team
              </Typography>
              <Typography variant="paragraph" className="text-lg text-gray-600">
                A diverse team of experts who are passionate about technology and customer satisfaction.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
