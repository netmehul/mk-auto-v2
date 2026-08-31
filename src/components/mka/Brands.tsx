import { useEffect, useState } from "react";
import { RevealGroup, RevealItem } from "./Reveal";
import { MagneticButton } from "./Buttons";

const BRANDS = [
  {
    name: "Dongfeng",
    note: "Passenger & commercial vehicles",
    image: "/brands/dongfeng-lineup.webp",
    logo: "/brands/dongfeng-logo.svg",
    desc: "A global automotive maker offering innovative, reliable passenger and commercial vehicles.",
    href: "https://dongfeng-uae.com/",
  },
  {
    name: "Omoda | Jaecoo",
    note: "Design-led & off-road premium SUVs",
    image: "/brands/oj-lineup.webp",
    logo: "/brands/omoda-jaecoo.svg",
    desc: "Modern crossovers designed for urban lifestyles, blending advanced technology with bold contemporary design.",
    href: "https://omodajaecoo-auh.com/",
  },
  {
    name: "Pre-Owned",
    note: "Quality vehicles, ready for their next journey",
    image: "/brands/preowned-lineup.webp",
    logo: "/brands/certified-pre-owned.svg",
    desc: "Explore quality pre-owned vehicles backed by the expertise and reputation of Mahy Khooray Automotive.",
    href: undefined,
  },
];

export function Brands() {
  const [activeBrand, setActiveBrand] = useState(0);

  // ============================================================
  // AUTOMATIC SLIDER
  // ============================================================

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveBrand((current) => {
        return (current + 1) % BRANDS.length;
      });
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  // ============================================================
  // SELECT BRAND
  // ============================================================

  const handleBrandSelect = (index: number) => {
    setActiveBrand(index);
  };

  const activeBrandData = (BRANDS[activeBrand] ?? BRANDS[0])!;

  return (
    <section
      id="our-brands"
      aria-labelledby="brands-title"
      className="
        relative
        overflow-hidden
        bg-navy-900
        section-y
      "
    >
      <div className="shell relative">

        {/* ======================================================
            INTRO
            ====================================================== */}

        <RevealGroup className="max-w-4xl">

          <RevealItem>
            <h2
              id="brands-title"
              className="h2-display mt-7 uppercase text-off-white"
            >
              Official UAE distributor for three global marques.
            </h2>
          </RevealItem>

          <RevealItem
            as="p"
            className="
              mt-6
              max-w-[60ch]
              text-[17px]
              leading-[1.7]
              text-off-white/70
            "
          >
            Each brand is supported end-to-end by Mahy Khooray
            Automotive sales, aftersales, genuine parts and
            warranty under one accountable group.
          </RevealItem>

        </RevealGroup>

        {/* ======================================================
            BRAND TAB SWITCHER
            ====================================================== */}

        <RevealGroup
          className="
            mt-12
            grid
            gap-px
            border
            border-off-white/12
            bg-off-white/12
            md:grid-cols-3
          "
        >
          {BRANDS.map((brand, index) => {
            const isActive = index === activeBrand;

            return (
              <RevealItem key={brand.name}>

                <div
                  className={`
                    group
                    relative
                    flex
                    h-[158px]
                    w-full
                    flex-col
                    overflow-hidden
                    transition-colors
                    duration-500
                    ${
                      isActive
                        ? "bg-navy-800 border-1"
                        : "bg-navy-900 hover:bg-navy-800"
                    }
                  `}
                >

                  {/* ==================================================
                      LOGO
                      ================================================== */}

                  <button
                    type="button"
                    onClick={() => handleBrandSelect(index)}
                    aria-pressed={isActive}
                    className="
                      flex
                      min-h-0
                      flex-1
                      w-full
                      items-center
                      justify-center
                      px-8
                      pt-4
                    "
                  >
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="
                        block
                        w-[stretch]
                        opacity-90
                        transition-opacity
                        duration-500
                        ease-out
                        group-hover:opacity-100
                      "
                      draggable={false}
                    />
                  </button>


                  {/* ==================================================
                      CTA
                      ================================================== */}

                  <div
                    className={`
                      grid
                      overflow-hidden
                      px-4
                      transition-[grid-template-rows,opacity]
                      duration-600
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${
                        isActive && brand.href
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }
                    `}
                  >

                    <div className="min-h-0 overflow-hidden pb-4">

                      {brand.href && (
                        <a
                          href={brand.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex
                            h-[44px]
                            w-full
                            items-center
                            justify-center
                            bg-white
                            px-5
                            text-center
                            text-xs
                            uppercase
                            tracking-[0.12em]
                            text-black
                            transition-colors
                            duration-300
                            hover:bg-gold
                            hover:text-navy-900
                          "
                        >
                          Explore {brand.name}
                        </a>
                      )}

                    </div>

                  </div>

                </div>

              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* ======================================================
            IMAGE SLIDER
            ====================================================== */}

        <RevealGroup className="mt-10 sm:mt-12">

          <RevealItem>

            <div
              className="
                relative
                aspect-[8/3]
                w-full
                overflow-hidden
                border
                border-off-white/12
                bg-black
              "
            >

              {/* ==================================================
                  SLIDES
                  ================================================== */}

              {BRANDS.map((brand, index) => (

                <div
                  key={brand.name}
                  className={`
                    absolute
                    inset-0
                    transition-opacity
                    duration-700
                    ease-in-out
                    ${
                      index === activeBrand
                        ? "z-10 opacity-100"
                        : "z-0 opacity-0"
                    }
                  `}
                >

                  <img
                    src={brand.image}
                    alt={`${brand.name} lineup`}
                    className="
                      block
                      h-full
                      w-full
                      object-cover
                    "
                    draggable={false}
                  />

                </div>

              ))}


              {/* ==================================================
                  IMAGE GRADIENT
                  ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  z-20
                  h-1/3
                  bg-gradient-to-t
                  from-black/50
                  to-transparent
                "
              />


              {/* ==================================================
                  ACTIVE BRAND NAME
                  ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-5
                  left-5
                  z-30
                  max-w-[70%]
                "
              >

                <span
                  className="
                    text-xs
                    uppercase
                    tracking-[0.16em]
                    text-white/80
                  "
                >
                  {activeBrandData.name}
                </span>

              </div>


              {/* ==================================================
                  SLIDER INDICATORS
                  ================================================== */}

              <div
                className="
                  absolute
                  bottom-5
                  right-5
                  z-30
                  flex
                  items-center
                  gap-2
                "
              >

                {BRANDS.map((brand, index) => (

                  <button
                    key={brand.name}
                    type="button"
                    aria-label={`Show ${brand.name}`}
                    aria-current={
                      index === activeBrand
                        ? "true"
                        : undefined
                    }
                    onClick={() => handleBrandSelect(index)}
                    className="
                      group
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                    "
                  >

                    <span
                      className={`
                        block
                        h-px
                        transition-all
                        duration-300
                        ${
                          index === activeBrand
                            ? "w-8 bg-white"
                            : "w-4 bg-white/40 group-hover:w-6 group-hover:bg-white"
                        }
                      `}
                    />

                  </button>

                ))}

              </div>

            </div>

          </RevealItem>

        </RevealGroup>


        {/* ======================================================
            ACTIVE BRAND CONTENT
            ====================================================== */}

        {/* <RevealGroup
          key={activeBrandData.name}
          className="
            mt-8
            flex
            flex-col
            gap-7
            border-t
            border-off-white/12
            pt-7
            sm:mt-10
            sm:pt-8
            lg:flex-row
            lg:items-end
            lg:justify-between
            lg:gap-12
          "
        >

          <RevealItem
            as="div"
            className="
              max-w-[60ch]
            "
          >

            <p
              className="
                text-[16px]
                leading-[1.75]
                text-off-white/70
                sm:text-[17px]
              "
            >
              {activeBrandData.desc}
            </p>

          </RevealItem>

          {activeBrandData.href && (

            <RevealItem>

              <MagneticButton
                href={activeBrandData.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore {activeBrandData.name}
              </MagneticButton>

            </RevealItem>

          )}

        </RevealGroup> */}


        

      </div>
    </section>
  );
}