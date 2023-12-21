export const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-screen relative"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/1GYzDpf/markus-spiske-9w-TPJmi-Xk2-U-unsplash.jpg)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="hero-overlay bg-opacity-90 h-full bg-fixed"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md text-white">
            <h1 className="mb-5 text-5xl font-bold">Priority First</h1>
            <p className="mb-5">
              List down all your works into a priority list, so that you can
              utilize the time effectively.
            </p>
            <button className="btn btn-primary text-white">
              Let’s Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
