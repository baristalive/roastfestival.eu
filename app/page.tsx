import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
} from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { program } from './data';

const Page1 = () => (
  <section className="h-screen flex flex-col p-8">
    <header className="flex grow flex-row gap-2">
      <div className="basis-1/6 font-medium text-2xl">
        16-17/9/2023
        <br />
        Káznice, Brno
      </div>
      <h1 className="grow text-center uppercase font-medium text-3xl">
        The first coffee roasters <br />
        festival in Brno
      </h1>
      <nav className="basis-1/12 text-right font-medium text-2xl">Tickets</nav>
      <nav className="basis-1/12 text-right font-medium text-2xl">
        <div>Contact us</div>
        <div className="flex justify-end gap-4 mt-2">
          <a className="h-10 w-10 text-4xl" href="#">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a className="h-9 w-9 instagram" href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </nav>
    </header>
    <div className="text-2xl text-center mb-12">
      We are still roasting the
      <br />
      festival program for you.
    </div>
    <div className="text-6xl text-center">
      <FontAwesomeIcon icon={faArrowAltCircleDown} />
    </div>
  </section>
);

const About = () => (
  <section className="inverted py-20 text-center">
    <h2 className="uppercase font-medium text-3xl py-20 ">About</h2>
    <div className="space-y-10 mx-auto text-2xl max-w-3xl">
      <p>
        Discover the world of coffee at the first Brno Coffee Roasters Festival,
        where passionate roasters and enthusiasts gather to celebrate the
        artistry, flavors, and community behind this beloved beverage.
      </p>
      <p>
        Immerse yourself in a sensory journey, exploring diverse brews, engaging
        in insightful conversations, and experiencing the vibrant atmosphere
        that awaits you.
      </p>
    </div>
  </section>
);

const Filler = () => (
  <section className="inverted h-screen"/>
)

const Program = () => (
  <section className="text-center">
    <div className="inverted p-20">
      <h2 className="uppercase font-medium text-3xl py-20">Program</h2>
      <div className="max-w-5xl flex mx-auto gap-12">
        <div>
          <h3 className="text-8xl">16/9</h3>
          <small className="text-3xl">Day 1</small>
        </div>
        <dl className="grow divide-y divide-current text-left">
          {program.map((i) => (
            <div
              key={i.time}
              className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
            >
              <dt className="text-xl font-bold">{i.time}</dt>
              <dd className="text-xl sm:col-span-2 sm:mt-0">{i.title}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
    <div className="py-20 mx-auto max-w-5xl flex gap-12">
      <div>
        <h3 className="text-8xl">17/9</h3>
        <small className="text-3xl">Day 2</small>
      </div>
      <dl className="grow divide-y divide-current text-left">
        {program.map((i) => (
          <div
            key={i.time}
            className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
          >
            <dt className="text-xl font-bold">{i.time}</dt>
            <dd className="text-xl sm:col-span-2 sm:mt-0">{i.title}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

const BuyTickets = () => (
  <section className="text-center mx-auto p-20">
    <a
      className="rounded-full py-6 px-12 border  border-current text-2xl font-bold"
      href="#"
    >
      Buy tickets
    </a>
  </section>
);

const Footer = () => (
  <footer className="inverted p-10">
    <ul className="space-y-2 text-lg  max-w-4xl mx-auto text-right">
      <li className="font-semibold">
        &copy; {`${new Date().getFullYear()}`} Barista Live, z. s.
      </li>
      <li>
        <a href="mailto:info@baristalive.cz">info@baristalive.cz</a>
      </li>
    </ul>
  </footer>
);


const Map = () => (
  <section className="inverted h-screen">
  </section>
);


export default function Home() {
  return (
    <div className="overlay">
      <Page1 />
      <About />
      <Filler />
      <Program />
      <BuyTickets />
      <Map />
      <Footer />
    </div>
  );
}
