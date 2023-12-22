const WhoCanUse = () => {
  return (
    <div className="text-center">
      <h2 className=" my-14 font-semibold text-4xl">
        Our Diverse Audience Segments
      </h2>
      <p>Discover how different professional groups are benefiting from our</p>
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center">Developers</h2>
            <p>
              Corporate professionals leverage our resources to stay updated on
              industry trends, improve their skills, and expand their
              professional network.
            </p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Corporate Professionals</h2>
            <p>
              Corporate professionals leverage our resources to stay updated on
              industry trends, improve their skills, and expand their
              professional network.
            </p>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Bankers</h2>
            <p>
              Bankers use our platform to gain insights into the financial
              market, understand new banking technologies, and connect with
              industry experts.
            </p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoCanUse;
