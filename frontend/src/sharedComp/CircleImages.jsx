import React from 'react';

const images = [
  { src: 'https://radiussfu.com/wp-content/uploads/2019/02/mobile-circle-logo-png-30.png', label: 'Mobiles' },
  { src: 'https://thumbs.dreamstime.com/z/flat-laptop-circle-icon-vector-illustration-computer-202103605.jpg', label: 'Laptops' },
  { src: 'https://images.herzindagi.info/image/2020/Apr/Electronic.jpg', label: 'Electronic Item' },
  { src: 'https://usercontent1.hubstatic.com/5097656_f520.jpg', label: 'Computer Parts' },
  { src: 'https://images6.alphacoders.com/349/349397.jpg', label: 'Watches' },
  { src: 'https://cpimg.tistatic.com/04822945/b/4/35-Inch-Full-HD-LED-Television.jpg', label: 'Televisions' },
  { src: 'https://yt-shop.de/wp-content/uploads/2017/11/Canon-EOS-200D-SLR-Digitalkamera-Full-HD-60-FPS-YouTube-Kamera-1.jpg', label: 'Cameras' },
  { src: 'https://c4.wallpaperflare.com/wallpaper/853/914/400/clocks-suits-men-time-wallpaper-preview.jpg', label: 'Clocks' },
  { src: 'https://cdn.shopclues.com/images1/detailed/96188/143265786-96188787-1547288501.jpg', label: 'Cabels' }
];

const CircleImages = ({ onCategorySelect }) => {
  return (
    <div className="flex gap-6 flex-wrap justify-center">
      {images.map(({ src, label }, index) => (
        <div key={index} className="text-center">
          <img
            src={src}
            alt={`circle-${index}`}
            className="w-24 h-24 rounded-full cursor-pointer transform transition-transform duration-200 hover:scale-110"
            onClick={() => onCategorySelect(label)}
          />
          <p className="mt-2 text-sm font-medium">{label}</p>
        </div>
      ))}
    </div>
  );
};

export default CircleImages;
