export const Button = (props) => {
  return (
    <button className={`${props.style} flex transition duration-700 justify-center shadow-lg py-2 my-4 px-3 text-base font-medium rounded-lg`} onClick={props.click}>
      <p className={`${props.textStyle}`}>{props.name}</p>
    </button>
  );
};
