import Slider from "./components/cardslider";
import Story from "./components/story";

export default function Home() {
  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(to left, rgba(0, 255, 255, 0.5), rgba(0, 0, 0, 0)), url('https://i.pinimg.com/1200x/b8/20/ac/b820ac11d7abd3414ce6f3bb0dbbfaec.jpg')`,
        }}
        className="bg-cover bg-center min-h-screen w-full flex items-center"
      >
        <div className="lg:w-1/2 px-10 text-white absolute bottom-0 w-[70%]">
          <h1 className="lg:text-4xl font-bold text-lg">
            THIS IS{" "}
            <strong className="text-cyan-400">
              SEBLAK99 <br />
              SEBLAKNYA
            </strong>{" "}
            INDONESIA
          </h1>
          <p className="mt-4 lg:text-2xl text-sm font-semibold ">
            Seblak Halal rendah lemak dengan 100% premium beef. <br />
            <strong className="text-cyan-400">Seblak99</strong> sebagai number
            #1 local Seblak company in Indonesia selalu memberikan kualitas
            terbaik, pelayanan terbaik dengan{" "}
            <strong className="text-cyan-400">seblak99 care</strong> yang selalu
            mendengar suara dari Sobat{" "}
            <strong className="text-cyan-400">Seblak99</strong>.
          </p>
          <img
            className="w-1/4 mx-auto hover:scale-110 transition-transform duration-300"
            src="/seblak.png"
            alt=""
          />
        </div>
      </div>

      <div className="overflow-hidden bg-cyan-400 lg:py-4">
        <p className="marquee text-white lg:text-xl font-bold px-4 text-sm">
          <span className="text-2xl">🚗</span>sensasi untuk menikmati kelezatan
          Seblak99 bukan tergantung dari rasa , Harga , selera , gaya hidup ,
          status sosial, maupun level stress anda tapi lebih kepada bagaimana
          anda bersyukur hari ini. 🍜🔥
        </p>
      </div>

      <Slider />

      <div className="bg-cyan-800 py-20">
        <h1 className="mx-auto text-3xl font-bold  text-white bg-cyan-500 w-max px-3 py-1 rounded">Tentang Kami</h1>
        <Story />
      </div>
    </>
  );
}
