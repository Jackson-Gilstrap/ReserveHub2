import NavButton from "./components/utility/button";
export default function Home() {
  return (
    <>
      <div className="h-screen">
        <h1 className="text-center text-6xl mt-8 leading-relaxed">
          Volunteer Income & Tax Assistance <br />
          <span className="text-4xl">&#40;VITA&#41;</span>
        </h1>

        <h2 className="text-center text-2xl mt-8">
          Begin Your Reservation Proccess Below
        </h2>
        <NavButton url="booking" text="Start" disabled={false}/>
      </div>
    </>
  );
}
