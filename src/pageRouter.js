import { useNavigate } from 'react-router-dom';

export const pageRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return (
      <Component
        navigate={navigate}
        {...props}
        />
    );
  };

  return Wrapper;
};

export default pageRouter;