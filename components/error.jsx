 
import { useRouter } from 'next/router';

const Error = ({ response = {} }) => {
  const router = useRouter();

  if (response.error == "disconnect") {
    sessionStorage.clear();
    localStorage.clear();
    return router.push("/")
  }

  return (
    <>
      {response.success && (
        <div className="text-center d-block alert alert-success form-group">
           {response.success} 
        </div>
      )}

      {response.error && (
        <div className="d-block text-center alert alert-danger form-group">
           {response.error}
        </div>
      )}
    </>
  );
};

export default Error;
