import { AnimatedTestimonials } from "./animated-testimonial";


export default function Story() {
  const testimonials = [
    {
      quote: "Berawal dari ide kecil di obrolan senja unfaedah, Seblak99 lahir pada 1945 dengan harapan bisa menopang hidup anak cucu cicit. Kami percaya setiap momen layak dirayakan, dan Seblak99 hadir untuk menghadirkan rasa syukur dalam setiap gigitan lezatnya. Bagi kami, menikmati Seblak99 bukan soal rasa, harga, atau status, tapi bagaimana Anda bersyukur hari ini.",
      name: "Seblak99",
      src: "https://i.pinimg.com/736x/64/be/d9/64bed99842ab412b9edd6f41330922f9.jpg",
    },
    {
      quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam tempore doloribus asperiores assumenda ut, necessitatibus ad sapiente obcaecati quo saepe consequuntur deleniti placeat aspernatur eum exercitationem maxime voluptatem laboriosam alias quisquam provident nesciunt eaque similique enim? Repellendus eveniet iusto exercitationem, distinctio voluptas vel magnam voluptate maiores odio a deleniti alias totam molestiae similique sapiente quasi quisquam. ",
      name: "Seblak99",
      src: "https://i.pinimg.com/1200x/97/6c/1d/976c1dec977f42ddb090450355465c86.jpg",
    },
    {
      quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam tempore doloribus asperiores assumenda ut, necessitatibus ad sapiente obcaecati quo saepe consequuntur deleniti placeat aspernatur eum exercitationem maxime voluptatem laboriosam alias quisquam provident nesciunt eaque similique enim? Repellendus eveniet iusto exercitationem, distinctio voluptas vel magnam voluptate maiores odio a deleniti alias totam molestiae similique sapiente quasi quisquam. ",
      name: "Seblak99",
      src: "https://i.pinimg.com/736x/76/a0/fe/76a0fef147987ae91ba821fa066f5dd0.jpg",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} autoplay />;
}
