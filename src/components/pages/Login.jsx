import Lottie from "lottie-react";
import { ToastContainer } from "react-toastify";
import animation from "../../assets/login.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
export const Login = () => {
  const { googleSignIn, GitSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // google login
  const handleGoogle = () => {
    googleSignIn().then((result) => {
      navigate(location?.state ? location.state : "/dashboard");
      const googleEmail = result.email;

      notifySuccess("Login Successfully").catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error signing in with Google!",
        });
      });
    });
    const notifySuccess = (message) => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: message,
      });
    };
  };
  // github login
  const handleGitHub = () => {
    GitSignIn().then((result) => {
      navigate(location?.state ? location.state : "/dashboard");
      const GithubEmail = result.email;
      notifySuccess("Login Successfully").catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error signing in with Google!",
        });
      });
    });
    const notifySuccess = (message) => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: message,
      });
    };
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login Now</h1>
            <Lottie animationData={animation}></Lottie>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <div className="divider divider-vertical">OR</div>

              <div className="flex w-full">
                <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                  <button onClick={handleGoogle}>Google</button>
                </div>
                <div className="divider divider-horizontal">OR</div>
                <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                  <button onClick={handleGitHub}>GitHub</button>
                </div>
              </div>
              <Link to="/signup">
                Dont have account ?{" "}
                <span className="text-blue-500 underline"> Sign Up </span>
              </Link>
            </form>
          </div>
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </div>
  );
};
