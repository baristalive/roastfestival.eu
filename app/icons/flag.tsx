const FLAGS = {
  at: (
    <>
      <path
        fill="#d80027"
        d="M0 0h512v167l-23.2 89.7L512 345v167H0V345l29.4-89L0 167z"
      />
      <path fill="#eee" d="M0 167h512v178H0z" />
    </>
  ),
  cz: (
    <>
      <path fill="#eee" d="M0 0h512v256l-265 45.2z" />
      <path fill="#d80027" d="M256 256h302v260H0z" />
      <path fill="#0052b4" d="M0 0v512l256-256L0 0z" />
    </>
  ),
  de: (
    <>
      <path fill="#D80027" d="M0 136h520v240H0z" />
      <path fill="#FFDA44" d="M0 344h520v168H0z" />
      <path fill="#333" d="M0 0h512v168H0z" />
    </>
  ),
  en: (
    <>
      <path fill="var(--flag-palette-blue, #0052b4)" d="M0 0h512v512H0z" />
      <path
        fill="var(--flag-palette-white, #eeeeee)"
        d="M464 512h48v-48L304 256 512 48V0h-48L256 208 48 0H0v48l208 208L0 464v48h48l208-208z"
      />
      <path
        fill="var(--flag-palette-white, #eeeeee)"
        d="M512 320V192H320V0H192v192H0v128h192v192h128V320z"
      />
      <path
        fill="var(--flag-palette-bright-red, #d80027)"
        d="M512 288v-64H288V0h-64v224H0v64h224v224h64V288z"
      />
      <path
        fill="var(--flag-palette-bright-red, #d80027)"
        d="M0 32V0l192 192h-32zm512 448v32L320 320h32zM32 512H0l192-192v32zM480 0h32L320 192v-32z"
      />
    </>
  ),
  es: (
    <>
      <path fill="#FFDA44" d="M512 128v256H0V128z" />
      <path fill="#D80027" d="M512 368v144H0V368zm0-368v144H0V0z" />
      <path fill="#EEE" d="M144 304h-16v-80h16zm128 0h16v-80h-16z" />
      <path
        fill="#D80027"
        d="M122 248a4 4 0 1 0 0 8h172a4 4 0 1 0 0-8zm0 24a4 4 0 1 0 0 8h28a4 4 0 1 0 0-8zm144 0a4 4 0 1 0 0 8h28a4 4 0 1 0 0-8z"
      />
      <path
        fill="#EEE"
        fillRule="evenodd"
        d="M196 168c-7 0-13 5-15 11l-5-1c-9 0-16 7-16 16s7 16 16 16c7 0 13-4 15-11a16 16 0 0 0 17-4 16 16 0 0 0 17 4 16 16 0 1 0 10-20 16 16 0 0 0-27-5q-4.5-6-12-6m0 8c5 0 8 4 8 8 0 5-3 8-8 8-4 0-8-3-8-8 0-4 4-8 8-8m24 0c5 0 8 4 8 8 0 5-3 8-8 8-4 0-8-3-8-8 0-4 4-8 8-8m-44 10 4 1 4 8c0 4-4 7-8 7s-8-3-8-8c0-4 4-8 8-8m64 0c5 0 8 4 8 8 0 5-3 8-8 8-4 0-8-3-8-7l4-8zm-32 142c26.5 0 48-14.3 48-32 0-9.6-6.3-18.1-16.2-24H256v-48h-48v40c-26.5 0-48 14.3-48 32s21.5 32 48 32"
        clipRule="evenodd"
      />
      <path fill="#FF9811" d="M200 160h16v32h-16z" />
      <path
        fill="#D80027"
        fillRule="evenodd"
        d="m248 208-8 8h-64l-8-8c0-13 18-24 40-24s40 11 40 24m-112-16a8 8 0 0 1 8 8v8a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8m144 0a8 8 0 0 1 8 8v8a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8m-72 80v24a24 24 0 0 0 48 0v-24zm0 0h-48v-48h48zm34-30a10 10 0 1 0-20 0v12a10 10 0 1 0 20 0z"
        clipRule="evenodd"
      />
      <path
        fill="#FF9811"
        fillRule="evenodd"
        d="M128 208h16a8 8 0 0 1 0 16h-16a8 8 0 0 1 0-16m144 0h16a8 8 0 0 1 0 16h-16a8 8 0 0 1 0-16m-128 96h-16a8 8 0 0 0 0 16h16a8 8 0 0 0 0-16m128 0h16a8 8 0 0 1 0 16h-16a8 8 0 0 1 0-16m-112-32v24c0 8 4 14 9 19l5-6 5 10q5 1.2 10 0l5-10 5 6c6-5 9-11 9-19v-24h-9l-5 8-5-8h-10l-5 8-5-8zm8-32v-8h32v8h-8v16h8v8h-32v-8h8v-16zm72-24h-64v8h64z"
        clipRule="evenodd"
      />
      <path
        fill="#D80027"
        d="M169 272v43q4.6 3 10 4v-47zm20 0v47q5.4-1 10-4v-43z"
      />
      <path
        fill="#FFDA44"
        fillRule="evenodd"
        d="M186 208a6 6 0 1 0 0-12 6 6 0 0 0 0 12m22 0a6 6 0 1 0 0-12 6 6 0 0 0 0 12m28-6a6 6 0 1 1-12 0 6 6 0 0 1 12 0"
        clipRule="evenodd"
      />
      <path
        fill="#0052B4"
        fillRule="evenodd"
        d="M208 288a16 16 0 1 0 0-32 16 16 0 0 0 0 32m80 32h-16a8 8 0 0 0 0 16h16a8 8 0 0 0 0-16m-160 0h16a8 8 0 0 1 0 16h-16a8 8 0 0 1 0-16"
        clipRule="evenodd"
      />
    </>
  ),
  it: (
    <>
      <path fill="#EEE" d="M136 512V0h240v512z" />
      <path fill="#D80027" d="M344 512V0h168v512z" />
      <path fill="#6DA544" d="M0 512V0h168v512z" />
    </>
  ),
  pl: (
    <>
      <path fill="#d80027" d="m0 256 256.4-44.3L512 256v256H0z" />
      <path fill="#eee" d="M0 0h512v256H0z" />
    </>
  ),
  si: (
    <>
      <path fill="#0052B4" d="M0 136h512v240H0z" />
      <path fill="#D80027" d="M0 344h512v168H0z" />
      <path fill="#EEE" d="M0 0h512v168H0z" />
      <path fill="#0052B4" d="M222.6 202.7V100.2H89v102.5z" />
      <path
        fill="#EEE"
        d="M89 167v22.2c0 51.1 66.8 66.8 66.8 66.8s66.8-15.7 66.8-66.8V167l-22.3 22.2-44.5-33.4-44.5 33.4z"
      />
    </>
  ),
  sk: (
    <>
      <path fill="#0052b4" d="m0 160 260-32 256 32v192l-256 32L0 352z" />
      <path fill="#eee" d="M0 0h512v160H0z" />
      <path fill="#d80027" d="M0 352h512v168H0z" />
      <path
        fill="#eee"
        d="M64 63v217c0 104 144 137 144 137s144-33 144-137V63z"
      />
      <path
        fill="#d80027"
        d="M96 95v185a83 78 0 0 0 9 34h206a83 77 0 0 0 9-34V95z"
      />
      <path
        fill="#eee"
        d="M288 224h-64v-32h32v-32h-32v-32h-32v32h-32v32h32v32h-64v32h64v32h32v-32h64z"
      />
      <path
        fill="#0052b4"
        d="M152 359a247 231 0 0 0 56 24c12-3 34-11 56-24a123 115 0 0 0 47-45 60 56 0 0 0-34-10l-14 2a60 56 0 0 0-110 0 60 56 0 0 0-14-2c-12 0-24 4-34 10a123 115 0 0 0 47 45z"
      />
    </>
  ),
};

const Flag = ({ country }: { country: keyof typeof FLAGS }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 512 512"
  >
    {FLAGS[country]}
  </svg>
);

export default Flag;
