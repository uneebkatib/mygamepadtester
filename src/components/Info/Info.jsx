const HallEffectAnalog = "/images/HallEffectAnalog.webp";
const PotentiometerSensor = "/images/PotentiometerSensor.webp";
const FullAnalog = "/images/FullAnalog.webp";

export function Info() {
  return (
    <div>
      <h2>Buttons Issues</h2>
      <img loading="lazy" decoding="async" src="" alt="img" />
      <article>
        If there are issues with the keys, it is recommended to clean all
        contacts on the motherboard/flex with alcohol or replace the rubber pads
        that press the keys.
      </article>
      <article>
        In PS4/PS5, the L2 and R2 rubber bands need to be replaced when they are
        cut due to use and 100% pressure cannot be achieved.
      </article>
      <article></article>

      <h2>LT/RT Issues</h2>
      <img loading="lazy" decoding="async" src="" alt="img" />
      <article>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, quam!
      </article>

      <h2>Analog issues</h2>
      <img src={FullAnalog} alt="Full Analog img" />
      <img src={PotentiometerSensor} alt="Potentiometer Sensor img" />
      <article>article</article>

      <h2>Hall effect Analog</h2>
      <img src={HallEffectAnalog} alt="Hall Effect Analog img" />
      <article>article</article>

      <h2>Connecting issues</h2>
      <img loading="lazy" decoding="async" src="" alt="img" />
      <article>article</article>

      <h2>miniJack issues</h2>
      <img loading="lazy" decoding="async" src="" alt="img" />
      <article>article</article>
    </div>
  );
}
