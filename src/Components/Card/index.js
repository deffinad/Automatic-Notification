export const Card = ({children, style}) => {
  return (
    <div className={`${style} shadow-lg rounded-lg`}>
      {children}
    </div>
  );
};
